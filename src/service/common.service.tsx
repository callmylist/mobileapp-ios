import constants from '../utils/constants'
import Constants from '../utils/app_constants'
import axios from 'axios';
import { from, throwError as observableThrowError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators'
import RestClient from './restclient'
import { store } from '../redux/store';

export class CommonService {
    static getAssetpath() {
        return from(axios.get(Constants.API_URL + constants.apiUrl.getAssetPath))
            .pipe(map((response: any) => response.data),
                catchError((error: any) => {
                    return observableThrowError(error);
                }));
    }

    static postChildAccount(data: any) {
        return RestClient.post(constants.apiUrl.childAccount, data)
    }

    static getChildAccount() {
        return RestClient.get(constants.apiUrl.childAccount)
    }

    static lockChildAccount(userID: string) {
        return RestClient.get(constants.apiUrl.lockChild.replace('{userID}', userID))
    }

    static deleteChildAccount(userID: string) {
        return RestClient.get(constants.apiUrl.deleteChild.replace('{userID}', userID))
    }
}