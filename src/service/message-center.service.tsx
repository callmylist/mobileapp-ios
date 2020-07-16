import constants from '../utils/constants';
import Constants from '../utils/app_constants';
import axios from 'axios';
import {from, throwError as observableThrowError, Observable} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import RestClient from './restclient';
import {store} from '../redux/store';
import {RectButton} from 'react-native-gesture-handler';

export class MessageCenterService {
    static GetAllContacts(options: string) {
        return RestClient.get(
            constants.apiUrl.getContactListMC
                .replace('{number}', '1')
                .replace('{limit}', '100000')
                .replace('{status}', options),
        );
    }

    static GetAllContactsSearch(value: any, PageLimit: any, pageNumber: any) {
        var url = constants.apiUrl.getContactListSe
            .replace('{number}', pageNumber)
            .replace('{limit}', PageLimit)
            .replace('{search}', value);

        return RestClient.get(url);
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

    static MarkUnmarkFavourite(ID: any, flag: any) {
        const url = constants.apiUrl.MarkUnmarkFav.replace(
            '{contactID}',
            ID,
        ).replace('{status}', flag);

        return RestClient.get(url);
    }

    static saveMessageSettings(data: any) {
        return RestClient.post(constants.apiUrl.saveMessageSettings, {
            schedule: data,
        });
    }

    static saveContact(data: any) {
        return RestClient.post(constants.apiUrl.saveContact, data);
    }

    static markfollowup(contactID: any, flag: number) {
        let url = constants.apiUrl.makFollowUp.replace(
            '{contactID}',
            contactID,
        );
        url = url.replace('{status}', flag + '');

        return RestClient.get(url);
    }

    static onDelete(userId: string) {
        let url = constants.apiUrl.deleteContact.replace('{userID}', userId);

        return RestClient.delete(url);
    }

    static updateContact(data: any, contactID: string) {
        var url = constants.apiUrl.updateContact.replace(
            '{conatctID}',
            contactID,
        );

        console.log(url);

        return RestClient.put(url, data);
    }
}
