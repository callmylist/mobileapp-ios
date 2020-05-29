import constants from '../utils/constants';
import Constants from '../utils/app_constants';
import axios from 'axios';
import { from, throwError as observableThrowError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from 'src/shared/models/user.model';
import RestClient from './restclient'
import { store } from '../redux/store'

export class ContactService {

    static getContactInfo(contactListId: string) {
        return RestClient.get(
            constants.apiUrl.contactList.replace('{userId}', store.getState().authReducer.loggedInContact.userId).replace('{contactListId}', contactListId)
        )
    }

}
