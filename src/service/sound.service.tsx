import constants from '../utils/constants';
import Constants from '../utils/app_constants';
import axios from 'axios';
import { from, throwError as observableThrowError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../shared/models/user.model';
import RestClient from './restclient'
import { store } from '../redux/store'

export class SoundService {
    static getSoundList(options?: any) {
        let url = constants.apiUrl.getSoundList.replace("{userId}", store.getState().authReducer.loggedInContact.id)

        if (options) {
            url += "?page=" + options.currentPage + "&limit=" + options.pageSize;
        }

        return RestClient.get(url)
    }
}
