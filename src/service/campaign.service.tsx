import constants from '../utils/constants';
import Constants from '../utils/app_constants';
import axios from 'axios';
import { from, throwError as observableThrowError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../shared/models/user.model';
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

    static getCampaignDetail(campaignId: string) {
        return RestClient.get(
            constants.apiUrl.getCampaignDetail.replace('{userId}', store.getState().authReducer.loggedInContact.id).replace('{campaignId}', campaignId)
        )
    }


    static performCampaignAction(campaignId: string, action: string) {
        const url = constants.apiUrl.performCampaignAction
            .replace("{userId}", store.getState().authReducer.loggedInContact.userId)
            .replace("{campaignId}", campaignId)
            .replace("{action}", action);
        return RestClient.get(url)
    }

    static sendTestCall(payload: any) {
        return RestClient.post(
            constants.apiUrl.testYourCall.replace("{userId}", store.getState().authReducer.loggedInContact.id),
            payload
        )
    }

    static deleteCampaign(campaignId: string) {
        return RestClient.delete(
            constants.apiUrl.deleteCampaign.replace("{userId}", store.getState().authReducer.loggedInContact.id).replace("{campaignId}", campaignId)
        )
    }
}
