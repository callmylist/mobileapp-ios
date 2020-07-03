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

export class SoundService {
    static getSoundList(options?: any) {
        let url = constants.apiUrl.getSoundList.replace(
            '{userId}',
            store.getState().authReducer.loggedInContact.id,
        );

        if (options) {
            url +=
                '?page=' + options.currentPage + '&limit=' + options.pageSize;
        }

        return RestClient.get(url);
    }

    static deleteSound(soundFileId: string) {
        return RestClient.delete(
            constants.apiUrl.soundFile
                .replace(
                    '{userId}',
                    store.getState().authReducer.loggedInContact.userId,
                )
                .replace('{soundFileId}', soundFileId),
        );
    }

    static textToSpeech(payload: any) {
        return RestClient.post(
            constants.apiUrl.textToSpeach.replace(
                '{userId}',
                store.getState().authReducer.loggedInContact.userId,
            ),
            payload,
        );
    }

    static uploadSound(fileInfo: any, callback: any) {
        // const name = fileInfo.name;
        // const realPath = fileInfo.uri;

        const split = fileInfo.uri.split('/');
        const name = split.pop();
        const inbox = split.pop();
        const realPath = `${RNFS.TemporaryDirectoryPath}${inbox}/${name}`;
        console.log(realPath);
        var headers = {};
        var loggedInContact = store.getState().authReducer.loggedInContact;
        if (loggedInContact != null) {
            headers = {
                Authorization: 'Bearer ' + loggedInContact.token,
            };
        }

        RNFS.uploadFiles({
            toUrl: Constants.API_URL + '/soundfile',
            files: [
                {
                    name: 'file',
                    filename: fileInfo.name,
                    filepath: realPath,
                    filetype: 'audio/wav',
                },
            ],
            method: 'POST',
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

    static getDefaultSound() {
        const url = constants.apiUrl.getDefaultSound.replace(
            '{userId}',
            store.getState().authReducer.loggedInContact.userId,
        );

        return RestClient.get(url);
    }
}
