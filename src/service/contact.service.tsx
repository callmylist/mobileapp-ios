import constants from '../utils/constants';
import Constants from '../utils/app_constants';
import axios from 'axios';
import {from, throwError as observableThrowError, Observable} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {User} from '../shared/models/user.model';
import RestClient from './restclient';
import {store} from '../redux/store';
import RNFS from 'react-native-fs';
import {UPDATE_TOKEN, RESET_TOKEN} from '../redux/actionTypes/auth';

export class ContactService {
    static getContactInfo(contactListId: string) {
        return RestClient.get(
            constants.apiUrl.contactList
                .replace(
                    '{userId}',
                    store.getState().authReducer.loggedInContact.userId,
                )
                .replace('{contactListId}', contactListId),
        );
    }

    static getContactList(options: any) {
        console.log(
            constants.apiUrl.getContactList
                .replace('{isDoNotContactList}', 'false')
                .replace('{number}', options.currentPage)
                .replace('{limit}', options.pageSize),
        );
        return RestClient.get(
            constants.apiUrl.getContactList
                .replace('{isDoNotContactList}', 'false')
                .replace('{number}', options.currentPage)
                .replace('{limit}', options.pageSize),
        );
    }

    static deleteContactList(contactListId: string) {
        return RestClient.delete(
            constants.apiUrl.contactList
                .replace(
                    '{userId}',
                    store.getState().authReducer.loggedInContact.userId,
                )
                .replace('{contactListId}', contactListId),
        );
    }

    static uploadContactList(
        fileInfo: any,
        hasHeader: boolean,
        numberColumn: string,
        callback: any,
    ) {
        const split = fileInfo.uri.split('/');
        const name = split.pop();
        const inbox = split.pop();
        const realPath = `${RNFS.TemporaryDirectoryPath}${inbox}/${name}`;
        var headers = {};
        var loggedInContact = store.getState().authReducer.loggedInContact;
        if (loggedInContact != null) {
            headers = {
                Authorization: 'Bearer ' + loggedInContact.token,
            };
        }

        RNFS.uploadFiles({
            toUrl: Constants.API_URL + '/contactlist',
            files: [
                {
                    name: 'file',
                    filename: fileInfo.name,
                    filepath: realPath,
                    filetype: 'text/csv',
                },
            ],
            method: 'POST',
            fields: {
                numberColumn: numberColumn,
                headPresent: hasHeader ? 'true' : 'false',
            },
            headers: headers,
        }).promise.then((response: any) => {
            let parsedBody = JSON.parse(response.body);
            if (response.statusCode == 201) {
                loggedInContact.token = response.headers.x_auth_token;
                store.dispatch({
                    type: UPDATE_TOKEN,
                    payload: {
                        loggedInContact: loggedInContact,
                    },
                });
                callback({success: true});
            } else {
                callback({
                    message: parsedBody.message + '.' + parsedBody.submessage,
                    success: false,
                });
            }
        });
    }
}
