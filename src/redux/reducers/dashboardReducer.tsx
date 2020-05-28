import { LOAD_USER_INFO_SUCCESS, LOAD_CAMPAIGN_LIST_SUCCESS } from '../actionTypes/dashboard'
import { defaultIfEmpty } from 'rxjs/operators'
import { LoginUser } from '../../shared/models/loginuser.model'

const initialState = {
    account: null,
    campaignList: []
}

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case LOAD_USER_INFO_SUCCESS: {
            return {
                ...state,
                account: action.payload
            }
        }

        case LOAD_CAMPAIGN_LIST_SUCCESS: {
            return {
                ...state,
                campaignList: action.payload
            }
        }

        default: {
            return state
        }
    }
}

export default reducer