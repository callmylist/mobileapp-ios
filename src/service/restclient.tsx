import constants from '../utils/constants';

import {store} from '../redux/store';
import Constants from '../utils/app_constants';
import axios from 'axios';
import {from, throwError as observableThrowError, Observable} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {UPDATE_TOKEN, RESET_TOKEN} from '../redux/actionTypes/auth';
import Utils from '../utils';
import {UserService} from '../service/user.service';
import JwtDecode from 'jwt-decode';
import {LoginUser} from '../shared/models/loginuser.model';
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILED,
    LOAD_ASSETS_REQUEST,
    LOAD_ASSETS_SUCCESS,
    SAVE_CREDENTIAL,
} from '../redux/actionTypes/auth';

class RestClient {
    static navigator = null;

    static get(url: string) {
        var headers = {};
        var loggedInContact = store.getState().authReducer.loggedInContact;
        if (loggedInContact != null) {
            headers = {
                Authorization: 'Bearer ' + loggedInContact.token,
            };
        }
        return from(
            axios.get(Constants.API_URL + url, {
                headers: headers,
            }),
        ).pipe(
            map((response: any) => {
                if (
                    loggedInContact != null &&
                    response.headers.x_auth_token != undefined
                ) {
                    loggedInContact.token = response.headers.x_auth_token;
                    store.dispatch({
                        type: UPDATE_TOKEN,
                        payload: {
                            loggedInContact: loggedInContact,
                        },
                    });
                }
                return {...response.data, success: true};
            }),
            catchError( async (error: any) => {
                if (error.response.status == 401) {
                    store.dispatch({
                        type: RESET_TOKEN,
                        payload: null,
                    });

                    let loginResult = await axios.post(Constants.API_URL + constants.apiUrl.consumerLogin.replace('{userId}', store.getState().authReducer.assets.domainUser.id), {
                        username: store.getState().authReducer.username,
                        password: store.getState().authReducer.password,
                    }, {});

                    console.log("login Result", loginResult);

                    if(loginResult.status === 201) {
                        const decodedToken: any = JwtDecode(loginResult.headers.x_auth_token);
            
                        const loginUser = new LoginUser(
                            decodedToken.id,
                            decodedToken.version,
                            decodedToken.firstName,
                            decodedToken.lastName,
                            loginResult.data.data.companyName,
                            decodedToken.email,
                            loginResult.data.data.phone,
                            decodedToken.exp,
                            loginResult.headers.x_auth_token,
                            loginResult.data.data.gmailId ? true : false,
                            loginResult.data.data.role,
                            {},
                            loginResult.data.data.telephonicId,
                            loginResult.data.data.telephonicCode,
                            loginResult.data.data.parentid,
                            loginResult.data.data.customize,
                        );            

                        store.dispatch({
                            type: USER_LOGIN_SUCCESS,
                            payload: {
                                loggedInContact: loginUser,
                            },
                        });

                        var headers = {};
                        var loggedInContact = store.getState().authReducer.loggedInContact;
                        if (loggedInContact != null) {
                            headers = {
                                Authorization: 'Bearer ' + loggedInContact.token,
                            };
                        }

                        let result = await axios.get(Constants.API_URL + url, {
                            headers: headers,
                        });

                        loggedInContact.token = result.headers.x_auth_token;
                        store.dispatch({
                            type: UPDATE_TOKEN,
                            payload: {
                                loggedInContact: loggedInContact,
                            },
                        });

                        return {...result.data, success: true};     
                    }
                    else {
                        store.dispatch({
                            type: SAVE_CREDENTIAL,
                            payload: {
                                username: null,
                                password: null,
                            },
                        });
                        Utils.presentToast('Session expired. Please login again.');
                        if (RestClient.navigator != null)
                            RestClient.navigator.navigate('AuthNavigator');
                    }           
                }
                else {
                    return [{...error.response.data, success: false}];
                }
            }),
        );
    }

    static delete(url: string) {
        var headers = {};
        var loggedInContact = store.getState().authReducer.loggedInContact;
        if (loggedInContact != null) {
            headers = {
                Authorization: 'Bearer ' + loggedInContact.token,
            };
        }
        return from(
            axios.delete(Constants.API_URL + url, {
                headers: headers,
            }),
        ).pipe(
            map((response: any) => {
                if (
                    loggedInContact != null &&
                    response.headers.x_auth_token != undefined
                ) {
                    loggedInContact.token = response.headers.x_auth_token;
                    store.dispatch({
                        type: UPDATE_TOKEN,
                        payload: {
                            loggedInContact: loggedInContact,
                        },
                    });
                }
                return {...response.data, success: true};
            }),
            catchError( async (error: any) => {
                if (error.response.status == 401) {
                    store.dispatch({
                        type: RESET_TOKEN,
                        payload: null,
                    });

                    let loginResult = await axios.post(Constants.API_URL + constants.apiUrl.consumerLogin.replace('{userId}', store.getState().authReducer.assets.domainUser.id), {
                        username: store.getState().authReducer.username,
                        password: store.getState().authReducer.password,
                    }, {});

                    console.log("login Result", loginResult);

                    if(loginResult.status === 201) {
                        const decodedToken: any = JwtDecode(loginResult.headers.x_auth_token);
            
                        const loginUser = new LoginUser(
                            decodedToken.id,
                            decodedToken.version,
                            decodedToken.firstName,
                            decodedToken.lastName,
                            loginResult.data.data.companyName,
                            decodedToken.email,
                            loginResult.data.data.phone,
                            decodedToken.exp,
                            loginResult.headers.x_auth_token,
                            loginResult.data.data.gmailId ? true : false,
                            loginResult.data.data.role,
                            {},
                            loginResult.data.data.telephonicId,
                            loginResult.data.data.telephonicCode,
                            loginResult.data.data.parentid,
                            loginResult.data.data.customize,
                            loginResult.data.data.messageSubscription
                        );            

                        store.dispatch({
                            type: USER_LOGIN_SUCCESS,
                            payload: {
                                loggedInContact: loginUser,
                            },
                        });

                        var headers = {};
                        var loggedInContact = store.getState().authReducer.loggedInContact;
                        if (loggedInContact != null) {
                            headers = {
                                Authorization: 'Bearer ' + loggedInContact.token,
                            };
                        }

                        let result = await axios.delete(Constants.API_URL + url, {
                            headers: headers,
                        });

                        loggedInContact.token = result.headers.x_auth_token;
                        store.dispatch({
                            type: UPDATE_TOKEN,
                            payload: {
                                loggedInContact: loggedInContact,
                            },
                        });

                        return {...result.data, success: true};     
                    }
                    else {
                        store.dispatch({
                            type: SAVE_CREDENTIAL,
                            payload: {
                                username: null,
                                password: null,
                            },
                        });
                        Utils.presentToast('Session expired. Please login again.');
                        if (RestClient.navigator != null)
                            RestClient.navigator.navigate('AuthNavigator');
                    }           
                }
                else {
                    return [{...error.response.data, success: false}];
                }
            }),
        );
    }

    static post(url: string, data: any) {
        var headers = {};
        var loggedInContact = store.getState().authReducer.loggedInContact;
        if (loggedInContact != null) {
            headers = {
                Authorization: 'Bearer ' + loggedInContact.token,
            };
        }
        return from(
            axios.post(Constants.API_URL + url, data, {
                headers: headers,
            }),
        ).pipe(
            map((response: any) => {
                if (
                    loggedInContact != null &&
                    response.headers.x_auth_token != undefined
                ) {
                    loggedInContact.token = response.headers.x_auth_token;
                    store.dispatch({
                        type: UPDATE_TOKEN,
                        payload: {
                            loggedInContact: loggedInContact,
                        },
                    });
                }
                return {
                    ...response.data,
                    token: response.headers.x_auth_token,
                    success: true,
                };
            }),
            catchError( async (error: any) => {
                console.log(error)
                if (error.response.status == 401) {
                    store.dispatch({
                        type: RESET_TOKEN,
                        payload: null,
                    });

                    let loginResult = await axios.post(Constants.API_URL + constants.apiUrl.consumerLogin.replace('{userId}', store.getState().authReducer.assets.domainUser.id), {
                        username: store.getState().authReducer.username,
                        password: store.getState().authReducer.password,
                    }, {});

                    console.log("login Result", loginResult);

                    if(loginResult.status === 201) {
                        const decodedToken: any = JwtDecode(loginResult.headers.x_auth_token);
            
                        const loginUser = new LoginUser(
                            decodedToken.id,
                            decodedToken.version,
                            decodedToken.firstName,
                            decodedToken.lastName,
                            loginResult.data.data.companyName,
                            decodedToken.email,
                            loginResult.data.data.phone,
                            decodedToken.exp,
                            loginResult.headers.x_auth_token,
                            loginResult.data.data.gmailId ? true : false,
                            loginResult.data.data.role,
                            {},
                            loginResult.data.data.telephonicId,
                            loginResult.data.data.telephonicCode,
                            loginResult.data.data.parentid,
                            loginResult.data.data.customize,
                            loginResult.data.data.messageSubscription
                        );            

                        store.dispatch({
                            type: USER_LOGIN_SUCCESS,
                            payload: {
                                loggedInContact: loginUser,
                            },
                        });

                        var headers = {};
                        var loggedInContact = store.getState().authReducer.loggedInContact;
                        if (loggedInContact != null) {
                            headers = {
                                Authorization: 'Bearer ' + loggedInContact.token,
                            };
                        }

                        let result = await axios.post(Constants.API_URL + url, data, {
                            headers: headers,
                        });

                        loggedInContact.token = result.headers.x_auth_token;
                        store.dispatch({
                            type: UPDATE_TOKEN,
                            payload: {
                                loggedInContact: loggedInContact,
                            },
                        });

                        return {...result.data, success: true};     
                    }
                    else {
                        store.dispatch({
                            type: SAVE_CREDENTIAL,
                            payload: {
                                username: null,
                                password: null,
                            },
                        });
                        Utils.presentToast('Session expired. Please login again.');
                        if (RestClient.navigator != null)
                            RestClient.navigator.navigate('AuthNavigator');
                    }           
                }
                else {
                    return [{...error.response.data, success: false}];
                }
            }),
        );
    }

    static patch(url: string, data: any) {
        var headers = {};
        var loggedInContact = store.getState().authReducer.loggedInContact;
        if (loggedInContact != null) {
            headers = {
                Authorization: 'Bearer ' + loggedInContact.token,
            };
        }
        return from(
            axios.patch(Constants.API_URL + url, data, {
                headers: headers,
            }),
        ).pipe(
            map((response: any) => {
                if (
                    loggedInContact != null &&
                    response.headers.x_auth_token != undefined
                ) {
                    loggedInContact.token = response.headers.x_auth_token;
                    store.dispatch({
                        type: UPDATE_TOKEN,
                        payload: {
                            loggedInContact: loggedInContact,
                        },
                    });
                }
                return {
                    ...response.data,
                    token: response.headers.x_auth_token,
                    success: true,
                };
            }),
            catchError( async (error: any) => {
                if (error.response.status == 401) {
                    store.dispatch({
                        type: RESET_TOKEN,
                        payload: null,
                    });

                    let loginResult = await axios.post(Constants.API_URL + constants.apiUrl.consumerLogin.replace('{userId}', store.getState().authReducer.assets.domainUser.id), {
                        username: store.getState().authReducer.username,
                        password: store.getState().authReducer.password,
                    }, {});

                    console.log("login Result", loginResult);

                    if(loginResult.status === 201) {
                        const decodedToken: any = JwtDecode(loginResult.headers.x_auth_token);
            
                        const loginUser = new LoginUser(
                            decodedToken.id,
                            decodedToken.version,
                            decodedToken.firstName,
                            decodedToken.lastName,
                            loginResult.data.data.companyName,
                            decodedToken.email,
                            loginResult.data.data.phone,
                            decodedToken.exp,
                            loginResult.headers.x_auth_token,
                            loginResult.data.data.gmailId ? true : false,
                            loginResult.data.data.role,
                            {},
                            loginResult.data.data.telephonicId,
                            loginResult.data.data.telephonicCode,
                            loginResult.data.data.parentid,
                            loginResult.data.data.customize,
                            loginResult.data.data.messageSubscription
                        );            

                        store.dispatch({
                            type: USER_LOGIN_SUCCESS,
                            payload: {
                                loggedInContact: loginUser,
                            },
                        });

                        var headers = {};
                        var loggedInContact = store.getState().authReducer.loggedInContact;
                        if (loggedInContact != null) {
                            headers = {
                                Authorization: 'Bearer ' + loggedInContact.token,
                            };
                        }

                        let result = await axios.patch(Constants.API_URL + url, data, {
                            headers: headers,
                        });

                        loggedInContact.token = result.headers.x_auth_token;
                        store.dispatch({
                            type: UPDATE_TOKEN,
                            payload: {
                                loggedInContact: loggedInContact,
                            },
                        });

                        return {...result.data, success: true};     
                    }
                    else {
                        store.dispatch({
                            type: SAVE_CREDENTIAL,
                            payload: {
                                username: null,
                                password: null,
                            },
                        });
                        Utils.presentToast('Session expired. Please login again.');
                        if (RestClient.navigator != null)
                            RestClient.navigator.navigate('AuthNavigator');
                    }           
                }
                else {
                    return [{...error.response.data, success: false}];
                }
            }),
        );
    }

    static put(url: string, data: any) {
        var headers = {};
        var loggedInContact = store.getState().authReducer.loggedInContact;
        if (loggedInContact != null) {
            headers = {
                Authorization: 'Bearer ' + loggedInContact.token,
            };
        }
        return from(
            axios.put(Constants.API_URL + url, data, {
                headers: headers,
            }),
        ).pipe(
            map((response: any) => {
                if (
                    loggedInContact != null &&
                    response.headers.x_auth_token != undefined
                ) {
                    loggedInContact.token = response.headers.x_auth_token;
                    store.dispatch({
                        type: UPDATE_TOKEN,
                        payload: {
                            loggedInContact: loggedInContact,
                        },
                    });
                }
                return {
                    ...response.data,
                    token: response.headers.x_auth_token,
                    success: true,
                };
            }),
            catchError( async (error: any) => {
                if (error.response.status == 401) {
                    store.dispatch({
                        type: RESET_TOKEN,
                        payload: null,
                    });

                    let loginResult = await axios.post(Constants.API_URL + constants.apiUrl.consumerLogin.replace('{userId}', store.getState().authReducer.assets.domainUser.id), {
                        username: store.getState().authReducer.username,
                        password: store.getState().authReducer.password,
                    }, {});

                    console.log("login Result", loginResult);

                    if(loginResult.status === 201) {
                        const decodedToken: any = JwtDecode(loginResult.headers.x_auth_token);
            
                        const loginUser = new LoginUser(
                            decodedToken.id,
                            decodedToken.version,
                            decodedToken.firstName,
                            decodedToken.lastName,
                            loginResult.data.data.companyName,
                            decodedToken.email,
                            loginResult.data.data.phone,
                            decodedToken.exp,
                            loginResult.headers.x_auth_token,
                            loginResult.data.data.gmailId ? true : false,
                            loginResult.data.data.role,
                            {},
                            loginResult.data.data.telephonicId,
                            loginResult.data.data.telephonicCode,
                            loginResult.data.data.parentid,
                            loginResult.data.data.customize,
                            loginResult.data.data.messageSubscription
                        );            

                        store.dispatch({
                            type: USER_LOGIN_SUCCESS,
                            payload: {
                                loggedInContact: loginUser,
                            },
                        });

                        var headers = {};
                        var loggedInContact = store.getState().authReducer.loggedInContact;
                        if (loggedInContact != null) {
                            headers = {
                                Authorization: 'Bearer ' + loggedInContact.token,
                            };
                        }

                        let result = await axios.put(Constants.API_URL + url, data, {
                            headers: headers,
                        });

                        loggedInContact.token = result.headers.x_auth_token;
                        store.dispatch({
                            type: UPDATE_TOKEN,
                            payload: {
                                loggedInContact: loggedInContact,
                            },
                        });

                        return {...result.data, success: true};     
                    }
                    else {
                        store.dispatch({
                            type: SAVE_CREDENTIAL,
                            payload: {
                                username: null,
                                password: null,
                            },
                        });
                        Utils.presentToast('Session expired. Please login again.');
                        if (RestClient.navigator != null)
                            RestClient.navigator.navigate('AuthNavigator');
                    }           
                }
                else {
                    return [{...error.response.data, success: false}];
                }
            }),
        );
    }
}

export default RestClient;
