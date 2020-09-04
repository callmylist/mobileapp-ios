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

export class UserService {
    static getUserByDomain(domain: string) {
        return RestClient.get(constants.apiUrl.userByDomain + domain);
    }

    static signUp(user: User) {
        return RestClient.post(constants.apiUrl.signup, user);
    }

    static signIn(userId: string, username: string, password: string) {
        return RestClient.post(
            constants.apiUrl.consumerLogin.replace('{userId}', userId),
            {
                username: username,
                password: password,
            },
        );
    }

    static forgotPassword(userId: string, email: string) {
        return RestClient.get(
            constants.apiUrl.sendForgot
                .replace('{email}', email)
                .replace('{parentId}', userId),
        );
    }

    static loadUserInfo() {
        return RestClient.get(constants.apiUrl.getUserById);
    }

    static sendSupportMessage(body: any) {
        return RestClient.post(
            constants.apiUrl.sendSupportMessage.replace(
                '{userId}',
                store.getState().authReducer.loggedInContact.id,
            ),
            body,
        );
    }

    static saveAccountUpdate(data: any) {
        return RestClient.put(constants.apiUrl.updateUserAccount, data);
    }

    static updatePassword(data: any) {
        return RestClient.patch(
            constants.apiUrl.updatePassword.replace(
                '{userId}',
                store.getState().authReducer.loggedInContact.userId,
            ),
            data,
        );
    }

    static deleteAccountLogo() {
        return RestClient.delete(
            constants.apiUrl.deleteAccountLogo.replace(
                '{userId}',
                store.getState().authReducer.loggedInContact.userId,
            ),
        );
    }

    static updateLogo(fileInfo: any, callback: any) {
        var headers = {};
        var loggedInContact = store.getState().authReducer.loggedInContact;
        if (loggedInContact != null) {
            headers = {
                Authorization: 'Bearer ' + loggedInContact.token,
            };
        }

        RNFS.uploadFiles({
            toUrl: Constants.API_URL + '/logo',
            // toUrl: "http://192.168.1.101:8888/uploadtest.php",
            files: [
                {
                    name: 'image',
                    filename: 'image.jpg',
                    filepath: fileInfo.uri.replace('file://', ''),
                    filetype: 'image/jpg',
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
                callback({...parsedBody, success: true});
            } else {
                callback({
                    message: parsedBody.message + '.' + parsedBody.submessage,
                    success: false,
                });
            }
        });
    }

    static getUserById() {
        const url = constants.apiUrl.getUserById;

        return RestClient.get(url);
    }

    static getParentBillingInfoByUserId() {
        const url = constants.apiUrl.getParentBillingInfo.replace(
            '{userId}',
            store.getState().authReducer.loggedInContact.id,
        );

        return RestClient.get(url);
    }

    static getCurrentFundsByUserId() {
        const url = constants.apiUrl.getCurrentFunds.replace(
            '{userId}',
            store.getState().authReducer.loggedInContact.id,
        );

        return RestClient.get(url);
    }

    static getBillingDetailsByUserId() {
        const url = constants.apiUrl.getBillingDetails.replace(
            '{userId}',
            store.getState().authReducer.loggedInContact.id,
        );

        return RestClient.get(url);
    }

    static chargeCardByStripe(body: any) {
        return RestClient.post(constants.apiUrl.stripeCharge, body);
    }
}
