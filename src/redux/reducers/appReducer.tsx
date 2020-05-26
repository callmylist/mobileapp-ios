import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAILED, LOAD_ASSETS_SUCCESS, LOAD_ASSETS_REQUEST } from '../actionTypes/app'
import { defaultIfEmpty } from 'rxjs/operators'
import { LoginUser } from '../../shared/models/loginuser.model'

const initialState = {
    loading: false,
    error: null,
    assets: {
        domainUser: null,
        assetsPath: null
    },
    loggedInContact: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST: {
            return {
                ...state,
                loading: true,
                error: null
            }
        }
        case USER_LOGIN_SUCCESS: {
            return {
                ...state,
                loading: false,
                loggedInContact: action.payload.loggedInContact,
                error: null
            }
        }
        case USER_LOGIN_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        }
        case LOAD_ASSETS_SUCCESS: {
            return {
                ...state,
                assets: {
                    ...state.assets,
                    domainUser: action.payload.domainUser,
                    assetsPath: action.payload.assetsPath
                },
                error: null
            }
        }
        default: {
            return initialState
        }
    }
}

export default reducer