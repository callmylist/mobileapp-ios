import constants from '../utils/constants';
import Constants from '../utils/app_constants';
import axios from 'axios';
import { from, throwError as observableThrowError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from 'src/shared/models/user.model';

export class UserService {
    static getUserByDomain(domain: string) {
        return from(
            axios.get(Constants.API_URL + constants.apiUrl.userByDomain + domain),
        ).pipe(
            map((response: any) => response.data),
            catchError((error: any) => {
                return observableThrowError(error);
            }),
        );
    }

    static signUp(user: User) {
        return from(
            axios.post(Constants.API_URL + constants.apiUrl.signup, user),
        ).pipe(
            map((response: any) => {
                return { ...response.data, success: true }
            }),
            catchError((error: any) => {
                return [{ ...error.response.data, success: false }]
            }),
        );
    }

    static signIn(userId: string, username: string, password: string) {
        return from(
            axios.post(Constants.API_URL + constants.apiUrl.consumerLogin.replace('{userId}', userId), {
                username: username,
                password: password
            })
        ).pipe(
            map((response: any) => {
                return { ...response.data, token: response.headers.x_auth_token, success: true }
            }),
            catchError((error: any) => {
                return [{ ...error.response.data, success: false }]
            })
        )
    }

    static forgotPassword(userId: string, email: string) {
        return from(
            axios.get(Constants.API_URL + constants.apiUrl.sendForgot.replace('{email}', email).replace('{parentId}', userId))
        ).pipe(
            map((response: any) => {
                return { ...response.data, success: true }
            }),
            catchError((error: any) => {
                return [{ ...error.response.data, success: false }]
            })
        )
    }
}
