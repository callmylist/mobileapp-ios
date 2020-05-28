import constants from '../utils/constants';
import Constants from '../utils/app_constants';
import axios from 'axios';
import { from, throwError as observableThrowError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from 'src/shared/models/user.model';
import RestClient from './restclient'
import { store } from '../redux/store'

export class CampaignService {

    static getCampaignList(page: number, limit: number) {
        return RestClient.get(
            constants.apiUrl.getCampaignList
                .replace("{userId}", store.getState().authReducer.loggedInContact.id)
                .replace("{page}", "" + page)
                .replace("{limit}", "" + limit)
        )
    }

}
