/* 
*  Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. 
*  See LICENSE in the source repository root for complete license information. 
*/

import React, { Component } from 'react';
import { NormalPeoplePicker } from 'office-ui-fabric-react/lib/Pickers';
import { Persona, PersonaPresence } from 'office-ui-fabric-react/lib/Persona';
import { Button } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';

export default class PeoplePickerExample extends Component {
  constructor() {
    super();

    // Set the initial state for the picker data source.
    this._peopleList = [];
    this._searchResults = [];

    // Helper that uses the JavaScript SDK to communicate with Microsoft Graph.
    this.sdkHelper = window.sdkHelper;

    this._showError = this._showError.bind(this);
    this.state = {
      selectedPeople: [],
      isLoadingPeople: true,
      isLoadingPics: true
    };
  }

  // Populate the people list.
  componentWillMount() {
    this.sdkHelper.getPeople((err, people) => {
      if (!err) {
        this._peopleList = this._mapUsersToPersonas(people, false);
        this._getPics(this._peopleList);
      }
      else this._showError(err);
    });
  }

  _getPics(personas) {
    
    // Make suggestions available before retrieving profile pics.
    this.setState({
      isLoadingPeople: false
    });
    
    this.sdkHelper.getProfilePics(personas, (err) => {
      this.setState({
        isLoadingPics: false
      });
    });
  }

  // Map user properties to persona properties.
  _mapUsersToPersonas(users, useMailProp) {
    return users.map((p) => { 

      // The email property is returned differently from the /users and /people endpoints. 
      let email = (useMailProp) ? p.mail : p.emailAddresses[0].address;
      let persona = new Persona();

      persona.primaryText = p.displayName;
      persona.secondaryText = email || p.userPrincipalName;
      persona.presence = PersonaPresence.none; // Presence isn't supported in Microsoft Graph yet
      persona.imageInitials = (!!p.givenName && !!p.surname) ? 
        p.givenName.substring(0,1) + p.surname.substring(0,1) : p.displayName.substring(0,1);
      persona.initialsColor = Math.floor(Math.random() * 15) + 0;
      persona.props = { id: p.id };

      return persona;
    });
  }

  // Build and send the email to the selected people.
  _sendMailToSelectedPeople() {
    const recipients = this.state.selectedPeople.map((r) => {
      return {
        EmailAddress: {
          Address: r.secondaryText
        }
      }
    });
    this.sdkHelper.sendMail(recipients, (err, toRecipients) => {
      if (!err) {
        this.setState({
          result: {
            type: MessageBarType.success,
            text: `Mail sent to ${toRecipients.length} recipient(s).`
          }
        });
      }
      else this._showError(err);
    });
  }

  // Handler for when text is entered into the picker control.
  _onFilterChanged(filterText, items) {
    return filterText ? this._peopleList.concat(this._searchResults)
      .filter(item => item.primaryText.toLowerCase().indexOf(filterText.toLowerCase()) === 0)
      .filter(item => !this._listContainsPersona(item, items)) : [];
  }

  // Remove currently selected people from the suggestions list.
  _listContainsPersona(persona, items) {
    if (!items || !items.length || items.length === 0) {
      return false;
    }
    return items.filter(item => item.primaryText === persona.primaryText).length > 0;
  }

  // Handler for when the Search button is clicked.
  // This sample returns the first 20 matches as suggestions.
  _onGetMoreResults(searchText) {
    this.setState({
      isLoadingPeople: true,
      isLoadingPics: true
    });
    return new Promise((resolve) => {
      this.sdkHelper.searchForPeople(searchText.toLowerCase(), (err, people) => {
        if (!err) {
          this._searchResults = this._mapUsersToPersonas(people, true);
          this.setState({
            isLoadingPeople: false
          });          
          this._getPics(this._searchResults);
          resolve(this._searchResults);
        }
      });
    });
  }
  
  // Handler for when the selection changes in the picker control.
  // This sample updates the list of selected people and clears any messages.
  _onSelectionChanged(items) { 
    this.setState({
      result: null,
      selectedPeople: items
    });
  }

  // Renders the people picker using the NormalPeoplePicker template.
  render() {
    return (
      <div>
        <h3>People Picker example</h3>
        <p>This example uses the preview <a href='https://graph.microsoft.io/en-us/docs/api-reference/beta/api/user_list_people' target='_blank'><i>/me/people</i></a> endpoint,
         which returns people who are relevant to the current user.</p>
        <p>Hint: <b><a onClick={ this._showPeopleResults.bind(this) }>Click here</a></b> to see all the people returned from <i>/me/people</i></p>
        <br />

        <Label>
          Start typing a name in the People Picker. If you don't see who you're looking for, click <b>Search</b>.
        </Label>

        <NormalPeoplePicker
          onResolveSuggestions={ this._onFilterChanged.bind(this) }
          pickerSuggestionsProps={ {
            suggestionsHeaderText: 'Suggested People',
            noResultsFoundText: 'No results found',
            searchForMoreText: 'Search',
            loadingText: 'Loading...' ,
            isLoading: this.state.isLoadingPics
           } }
          getTextFromItem={ (persona) => persona.primaryText }
          onChange={ this._onSelectionChanged.bind(this) }
          onGetMoreResults={ this._onGetMoreResults.bind(this) }
          className='ms-PeoplePicker'
          key='normal-people-picker' />
        <br />

        <Button
          buttonType={ 0 }
          onClick={ this._sendMailToSelectedPeople.bind(this) }
          disabled={ (!this.state.selectedPeople.length > 0) }>
          Send mail
        </Button>
        <br />
        <br />
        
        {
          this.state.result &&
            <MessageBar
              messageBarType={ this.state.result.type }>
              { this.state.result.text }
            </MessageBar> 
        }
      </div>
    );
  }

  // Show the results of the `/me/people` query.
  // For sample purposes only.
  _showPeopleResults() {
    let message = 'Query loading. Please try again.';
    if (!this.state.isLoadingPeople) {
      const people = this._peopleList.map((p) => {
        return `\n${p.primaryText}`;
      });
      message = people.toString();
    }
    alert(message)
  }

  // Configure the error message.
  _showError(err) {
    this.setState({
      result: {
        type: MessageBarType.error,
        text: `Error ${err.statusCode}: ${err.code} - ${err.message}`
      }
    });
  }
}
