import constants from '../utils/constants';
import Constants from '../utils/app_constants';
import axios from 'axios';
import { from, throwError as observableThrowError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../shared/models/user.model';
import RestClient from './restclient'
import { store } from '../redux/store';

export class UserService {
    static getUserByDomain(domain: string) {
        return RestClient.get(constants.apiUrl.userByDomain + domain)
    }

    static signUp(user: User) {
        return RestClient.post(constants.apiUrl.signup, user);
    }

    static signIn(userId: string, username: string, password: string) {
        return RestClient.post(constants.apiUrl.consumerLogin.replace('{userId}', userId), {
            username: username,
            password: password
        });
    }

    static forgotPassword(userId: string, email: string) {
        return RestClient.get(constants.apiUrl.sendForgot.replace('{email}', email).replace('{parentId}', userId));
    }

    static loadUserInfo() {
        return RestClient.get(constants.apiUrl.getUserById)
    }

    static sendSupportMessage(body: any) {
        return RestClient.post(constants.apiUrl.sendSupportMessage.replace("{userId}", store.getState().authReducer.loggedInContact.id), body)
    }
}
