import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILED,
    LOAD_ASSETS_SUCCESS,
    UPDATE_TOKEN,
    RESET_TOKEN,
    UPDATE_PROFILE,
    CLEAR_PROFILE,
    SAVE_CREDENTIAL,
} from '../actionTypes/auth';
import {defaultIfEmpty} from 'rxjs/operators';
import {LoginUser} from '../../shared/models/loginuser.model';

const initialState = {
    loading: false,
    error: null,
    assets: {
        domainUser: null,
        assetsPath: null,
    },
    loggedInContact: null,
    authToken: null,
    username: null,
    password: null,
};

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST: {
            return {
                ...state,
                loading: true,
                error: null,
            };
        }
        case USER_LOGIN_SUCCESS: {
            return {
                ...state,
                loading: false,
                loggedInContact: action.payload.loggedInContact,
                username: action.payload.username,
                password: action.payload.password,
                error: null,
            };
        }
        case USER_LOGIN_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };
        }
        case LOAD_ASSETS_SUCCESS: {
            return {
                ...state,
                assets: {
                    ...state.assets,
                    domainUser: action.payload.domainUser,
                    assetsPath: action.payload.assetsPath,
                },
                error: null,
            };
        }
        case UPDATE_TOKEN: {
            return {
                ...state,
                loggedInContact: action.payload.loggedInContact,
            };
        }
        case RESET_TOKEN: {
            return {
                ...state,
                loggedInContact: null,
            };
        }
        case UPDATE_PROFILE: {
            return {
                ...state,
                loggedInContact: action.payload.loggedInContact,
            };
        }
        case CLEAR_PROFILE: {
            return {
                ...state,
                loggedInContact: null,
                username: '',
                password: ''
            };
        }
        case SAVE_CREDENTIAL: {
            return {
                ...state,
                username: action.payload.username,
                password: action.payload.password,
            };
        }
        default: {
            return state;
        }
    }
};

export default reducer;
