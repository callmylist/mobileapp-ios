import {USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAILED, LOAD_ASSETS_SUCCESS, LOAD_ASSETS_REQUEST} from '../actionTypes/app'
import { defaultIfEmpty } from 'rxjs/operators'

const initialState = {
    user: null,
    loading: false,
    error: null,
    assets: {

    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case USER_LOGIN_REQUEST: {
            return {
                ...state,
                loading: true,
            }
        }
        case USER_LOGIN_SUCCESS: {
            return {
                ...state,
                loading: false,
                user: action.payload
            }
        }
        case USER_LOGIN_FAILED: {
            return {
                ...state,
                loading: false,
                user: null,
                error: action.payload
            }
        }
        case LOAD_ASSETS_SUCCESS: {
            // console.log('payload: ', payload)
            return {
                ...state,
                assets: {
                    ...state.assets,
                    domainUser: action.payload.domainUser,
                    assetsPath: action.payload.assetsPath
                }
            }
        }
        default: {
            return initialState
        }
    }
}

export default reducer