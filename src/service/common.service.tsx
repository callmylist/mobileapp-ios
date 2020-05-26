import constants from '../utils/constants'
import Constants from '../utils/app_constants'
import axios from 'axios';
import { from, throwError as observableThrowError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators'

export class CommonService {
    static getAssetpath() {
        return from(axios.get(Constants.API_URL + constants.apiUrl.getAssetPath))
            .pipe(map((response: any) => response.data),
                catchError((error: any) => {
                    return observableThrowError(error);
                }));
    }
}