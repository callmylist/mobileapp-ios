import constants from '../utils/constants';
import Constants from '../utils/app_constants';
import axios from 'axios';
import {from, throwError as observableThrowError, Observable} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import RestClient from './restclient';
import {store} from '../redux/store';

export class MessageCenterService {
    static GetAllContacts(options: string) {
        return RestClient.get(
            constants.apiUrl.getContactListMC
                .replace('{number}', '1')
                .replace('{limit}', '100000')
                .replace('{status}', options),
        );
    }

    static getMessageList(contactID: any) {
        return RestClient.get(
            constants.apiUrl.getMessageList.replace('{contactID}', contactID),
        );
    }

    static sendNewMessage(message: string, id: string) {
        return RestClient.post(
            constants.apiUrl.sendNewMessage.replace('{contactID}', id),
            {
                body: message,
            },
        );
    }

    static getMessageInfo() {
        return RestClient.get(constants.apiUrl.getMessageInfo);
    }

    static savePhoneNumber(options: any) {
        return RestClient.post(constants.apiUrl.savePhoneNumber, options);
    }
}
