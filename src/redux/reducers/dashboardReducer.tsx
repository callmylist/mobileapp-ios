import {
    LOAD_USER_INFO_SUCCESS,
    LOAD_CAMPAIGN_LIST_SUCCESS,
    SCREEN_INDEX_SET,
    REFRESH_VALUE
} from '../actionTypes/dashboard';
import {defaultIfEmpty} from 'rxjs/operators';
import {LoginUser} from '../../shared/models/loginuser.model';

const initialState = {
    account: null,
    campaignList: [],
    screenIndex: 1,
    refreshValue: 0,
    contactId: ''
};

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case LOAD_USER_INFO_SUCCESS: {
            return {
                ...state,
                account: action.payload,
            };
        }

        case LOAD_CAMPAIGN_LIST_SUCCESS: {
            return {
                ...state,
                campaignList: action.payload,
            };
        }

        case SCREEN_INDEX_SET: {
            return {
                ...state,
                screenIndex: action.payload.screenIndex,
            };
        }

        case REFRESH_VALUE: {
            return {
                ...state,
                refreshValue: Math.random(),
                contactId: action.payload.contactId
            };
        }

        default: {
            return state;
        }
    }
};

export default reducer;
