import Constant from '../utils/app_constants'
import { store } from '../redux/store';
import Constants from '../utils/app_constants';
import axios from 'axios';
import { from, throwError as observableThrowError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UPDATE_TOKEN, RESET_TOKEN } from '../redux/actionTypes/auth'
import Utils from '../utils';

class RestClient {
    static navigator = null;

    static get(url: string) {
        var headers = {}
        var loggedInContact = store.getState().authReducer.loggedInContact
        if (loggedInContact != null) {
            headers = {
                Authorization: 'Bearer ' + loggedInContact.token
            }
        }
        return from(
            axios.get(Constants.API_URL + url, {
                headers: headers
            }),
        ).pipe(
            map((response: any) => {
                if (loggedInContact != null && response.headers.x_auth_token != undefined) {
                    loggedInContact.token = response.headers.x_auth_token
                    store.dispatch({
                        type: UPDATE_TOKEN,
                        payload: {
                            loggedInContact: loggedInContact
                        }
                    })
                }
                return { ...response.data, success: true }
            }),
            catchError((error: any) => {
                console.log("error : url -> ", url)
                console.log(error.response.data)

                if (error.response.status == 401) {
                    console.log(headers)
                    store.dispatch({
                        type: RESET_TOKEN,
                        payload: null
                    })

                    Utils.presentToast("Session expired. Please login again.")
                    if (RestClient.navigator != null)
                        RestClient.navigator.navigate('AuthNavigator')
                }
                return [{ ...error.response.data, success: false }]
            }),
        );
    }

    static delete(url: string) {
        var headers = {}
        var loggedInContact = store.getState().authReducer.loggedInContact
        if (loggedInContact != null) {
            headers = {
                Authorization: 'Bearer ' + loggedInContact.token
            }
        }
        return from(
            axios.delete(Constants.API_URL + url, {
                headers: headers
            }),
        ).pipe(
            map((response: any) => {
                if (loggedInContact != null && response.headers.x_auth_token != undefined) {
                    loggedInContact.token = response.headers.x_auth_token
                    store.dispatch({
                        type: UPDATE_TOKEN,
                        payload: {
                            loggedInContact: loggedInContact
                        }
                    })
                }
                return { ...response.data, success: true }
            }),
            catchError((error: any) => {
                console.log("error : url -> ", url)
                console.log(error.response.data)

                if (error.response.status == 401) {
                    console.log(headers)
                    store.dispatch({
                        type: RESET_TOKEN,
                        payload: null
                    })

                    Utils.presentToast("Session expired. Please login again.")
                    if (RestClient.navigator != null)
                        RestClient.navigator.navigate('AuthNavigator')
                }
                return [{ ...error.response.data, success: false }]
            }),
        );
    }

    static post(url: string, data: any) {
        var headers = {}
        var loggedInContact = store.getState().authReducer.loggedInContact
        if (loggedInContact != null) {
            headers = {
                Authorization: 'Bearer ' + loggedInContact.token
            }
        }
        return from(
            axios.post(Constants.API_URL + url, data, {
                headers: headers
            }),
        ).pipe(
            map((response: any) => {
                if (loggedInContact != null && response.headers.x_auth_token != undefined) {
                    loggedInContact.token = response.headers.x_auth_token
                    store.dispatch({
                        type: UPDATE_TOKEN,
                        payload: {
                            loggedInContact: loggedInContact
                        }
                    })
                }
                return { ...response.data, token: response.headers.x_auth_token, success: true }
            }),
            catchError((error: any) => {
                console.log("error : url -> ", url)
                console.log(error.response.data)
                if (error.response.status == 401) {
                    console.log(headers)
                    store.dispatch({
                        type: RESET_TOKEN,
                        payload: null
                    })

                    Utils.presentToast("Session expired. Please login again.")
                    if (RestClient.navigator != null)
                        RestClient.navigator.navigate('AuthNavigator')
                }
                return [{ ...error.response.data, success: false }]
            }),
        );
    }
}

export default RestClient;