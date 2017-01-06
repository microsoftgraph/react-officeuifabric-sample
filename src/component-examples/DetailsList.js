/* 
*  Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. 
*  See LICENSE in the source repository root for complete license information. 
*/

import React, { Component } from 'react';
import { DetailsList, Selection } from 'office-ui-fabric-react/lib/DetailsList';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';

export default class DetailsListExample extends Component {
  constructor() {
    super();

    // The items array for the DetailsList, and the selection for the MarqueeSelection.
    this._items = [];
    this._selection = new Selection();
    this._selection._onSelectionChanged = () => this.setState({ 
      selectionDetails: this._getSelectionDetails() 
    });

    // Helper that uses the JavaScript SDK to communicate with Microsoft Graph.
    this.sdkHelper = window.sdkHelper;
    this.state = {
      items: this._items,
      selectionDetails: this._getSelectionDetails(),
      isLoading: false,
      nextPageToken: null
    };
    this._showError = this._showError.bind(this);
  }
  
  // Get the files for the details list data source.
  componentWillMount() {
    this.sdkHelper.getFiles(null, (err, res) => {
      this._processItems(err, res);
    });
  }
  
  // Map file metadata to list items.
  _processItems(err, res) { 
      if (!err) {
        const files = res.value;
        let nextLink = null;
          
        const items = files.map((f) => {
          return {
            Name: f.name,
            Type: (f.file) ? 'File' : 'Folder',
            CreatedBy: f.createdBy.user.displayName,
            Created: new Date(f.createdDateTime).toLocaleDateString(),
            LastModifiedBy: f.lastModifiedBy.user.displayName,
            LastModified: new Date(f.lastModifiedDateTime).toLocaleString(),
            WebUrl: f.webUrl
          }
        });

        // If the result set is paged, add a null item to trigger DetailsList.onRenderMissingItem.
        if (!!res['@odata.nextLink']) {
          nextLink = res['@odata.nextLink'];
          items.push(null);
        }
        this._items = this._items.filter((f) => { 
          return f !== null; 
        }).concat(items);
        this.setState({
          items: this._items,
          isLoading: !!nextLink,
          nextPageToken: nextLink
        });
      }
      else this._showError(err);
    }

  // Build the details list.
  _onRenderItemColumn(item, index, column) {
    if (column.key === 'WebUrl') {
      return <Link data-selection-invoke={ true }>{ item[column.key] }</Link>;
    }
    return item[column.key];
  }

  // Get data to display for the items selected in the details list.
  _getSelectionDetails() {
    let selectionCount = this._selection.getSelectedCount();
    switch (selectionCount) {
      case 0:
        return 'No items selected';
      case 1:
        return '1 item selected: ' + (this._selection.getSelection()[0]).Name;
      default:
        return `${selectionCount} items selected`;
    }
  }

  // Handler for when text is entered into the details list.
  // This sample filters for case-insensitive, exact match, and simply clears th current selection.
  _onFilterChanged(filterText) {
    this._selection.setItems([], true);
    this.setState({ 
      items: filterText ? this._items.filter(i => i.Name.toLowerCase().indexOf(filterText.toLowerCase()) > -1) : this._items 
    });
  }

  // Get paged results.
  _onLoadNextPage() {
    const pageLink = this.state.nextPageToken;
    this.sdkHelper.getFiles(pageLink, (err, res) => {
      this._processItems(err, res);
    });
  }

  render() {
    return (
      <div>
        <h3>Details List example</h3>
        <p>This example uses the <a href='https://graph.microsoft.io/en-us/docs/api-reference/v1.0/api/item_list_children' target='_blank'><i>/me/drive/root/children</i></a> endpoint,
         which returns the files and folders in the user's root drive. Results are paged when the number of drive items is greater than 100.</p> 
        <br />

        <Label>
          Current selection:
        </Label>
        <p><i>{ this.state.selectionDetails }</i></p>
        <br />

        <TextField
          label='Filter by name:'
          onChanged={ this._onFilterChanged.bind(this) } />

        <MarqueeSelection selection={ this._selection }>
          <DetailsList
            items={ this.state.items }
            setKey='set'
            selection={ this._selection }
            onItemInvoked={ (item) => window.open(item.WebUrl) }
            onRenderItemColumn={ this._onRenderItemColumn.bind(this) }
            onRenderMissingItem={ () => this._onLoadNextPage() } />
          { 
            this.state.isLoading &&
              <div>
                <br />
                <Spinner className='loadingSpinner' label='Loading...' />                
                <br />
              </div>
          }
        </MarqueeSelection>
        <br />

        {
          this.state.error &&
            <MessageBar
              messageBarType={ this.state.error.type }>
              { this.state.error.text }
            </MessageBar> 
        }
      </div> 
    );
  }
  
  // Configure the error message.
  _showError(err) {
    this.setState({
      error: {
        type: MessageBarType.error,
        text: `Error ${err.statusCode}: ${err.code} - ${err.message}`
      }
    });
  }
}