/* 
*  Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. 
*  See LICENSE in the source repository root for complete license information. 
*/

import { Client } from 'msgraph-sdk-javascript';
import async from 'async';

export default class GraphSdkHelper {
  constructor(props) {

    // Initialize the Graph SDK.
    this.client = Client.init({
      debugLogging: true,
      authProvider: (done) => {
        done(null, window.hello('aad').getAuthResponse().access_token);
      }
    });

    this._handleError = this._handleError.bind(this);
    this.props = props;
  }

  // GET me
  getMe(callback) {
    this.client 
      .api('/me')
      .select('displayName')
      .get((err, res) => {
        if (!err) {
          callback(null, res);
        }
        else this._handleError(err);
      });
  }

  // GET me/people
  getPeople(callback) {
    this.client 
      .api('/me/people')
      .version('beta')
      .filter(`personType eq 'Person'`)
      .select('displayName,givenName,surname,emailAddresses,userPrincipalName')
      .top(20)
      .get((err, res) => {
        if (err) {
          this._handleError(err);
        }
        callback(err, (res) ? res.value : []);
      });
  }

  // GET user/id/photo/$value for each person
  getProfilePics(personas, callback) {
    const pic = (p, done) => {
      this.client
        .api(`users/${p.props.id}/photo/$value`)
        .header('Cache-Control', 'no-cache')      
        .responseType('blob')
        .get((err, res, rawResponse) => {
          if (err) {
            done(err);
          } 
          else {
            p.imageUrl = window.URL.createObjectURL(rawResponse.xhr.response);
            p.initialsColor = null;
            done();
          }
        });
    };
    async.each(personas, pic, (err) => {
      callback(err);
    });
  }   

  // GET users?$filter=displayName startswith('{searchText}')
  searchForPeople(searchText, callback) {
    this.client 
      .api('/users')
      .filter(`startswith(displayName,'${searchText}')`)
      .select('displayName,givenName,surname,mail,userPrincipalName,id')
      .top(20)
      .get((err, res) => {
        if (err) {
          this._handleError(err);
        }
        callback(err, (res) ? res.value : []);
      });
  }

  // POST me/sendMail
  sendMail(recipients, callback) {
    const email = {
      Subject: 'Email from the Microsoft Graph Sample with Office UI Fabric',
      Body: {
        ContentType: 'HTML',
        Content: `<p>Thanks for trying out Office UI Fabric!</p>
          <p>See what else you can do with <a href="http://dev.office.com/fabric#/components">
          Fabric React components</a>.</p>`
      },
      ToRecipients: recipients
    };
    this.client
      .api('/me/sendMail')
      .post({ 'message': email, 'saveToSentItems': true }, (err, res, rawResponse) => {
        if (err) {
          this._handleError(err);
        }
        callback(err, rawResponse.req._data.message.ToRecipients);
      });
  }

  // GET drive/root/children
  getFiles(nextLink, callback) {
    let request;
    if (nextLink) {
      request = this.client
        .api(nextLink)
    }
    else {
      request = this.client
        .api('/me/drive/root/children') 
        .select('name,createdBy,createdDateTime,lastModifiedBy,lastModifiedDateTime,webUrl,file')
        .top(100) // default result set is 200
    }
    request.get((err, res) => {
      if (err) {
        this._handleError(err);
      }
      callback(err, res);
    });
  }
  
  _handleError(err) {
    console.log(err.code + ' - ' + err.message);

    // This sample just redirects to the login function when the token is expired.
    // Production apps should implement more robust token management.
    if (err.statusCode === 401 && err.message === 'Access token has expired.') {
      this.props.login();
    }
  }
}