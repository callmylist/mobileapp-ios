import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAILED, LOAD_ASSETS_REQUEST, LOAD_ASSETS_SUCCESS } from '../actionTypes/app'

import Utils from '../../utils'
import Constant from '../../utils/app_constants'
import ExConstants from '../../utils/constants'
import { UserService } from '../../service/user.service'
import { CommonService } from '../../service/common.service'
import { forkJoin } from 'rxjs'
import { dispatch } from 'rxjs/internal/observable/pairs'
import JwtDecode from 'jwt-decode'
import { LoginUser } from '../../shared/models/loginuser.model'
export const loadAssets = () => {
    return (dispatch: any, getStore: any) => {
        dispatch({
            type: LOAD_ASSETS_REQUEST,
            payload: null,
        })

        forkJoin(UserService.getUserByDomain(Constant.HOST_NAME), CommonService.getAssetpath()).subscribe((res) => {
            const user = res[0];
            const assetPath = res[1];
            dispatch({
                type: LOAD_ASSETS_SUCCESS,
                payload: {
                    domainUser: user.data,
                    assetsPath: assetPath.data.name
                }
            })
        })
    }
}

export const signIn = (params: any) => {
    return (dispatch: any, getStore: any) => {
        dispatch({
            type: USER_LOGIN_REQUEST,
            payload: null
        })

        UserService.signIn(
            params.userId,
            params.username,
            params.password
        ).subscribe((response: any) => {

            if (response.success) {
                const decodedToken: any = JwtDecode(response.token)

                const loginUser = new LoginUser(
                    decodedToken.id,
                    decodedToken.version,
                    decodedToken.firstName,
                    decodedToken.lastName,
                    response.data.companyName,
                    decodedToken.email,
                    response.data.phone,
                    decodedToken.exp,
                    response.token,
                    (response.data.gmailId) ? true : false,
                    response.data.role,
                    {},
                    response.data.telephonicId,
                    response.data.telephonicCode,
                    response.data.parentid,
                    response.data.customize
                );

                dispatch({
                    type: USER_LOGIN_SUCCESS,
                    payload: {
                        loggedInContact: loginUser
                    }
                })
            }
            else {
                dispatch({
                    type: USER_LOGIN_FAILED,
                    payload: {
                        error: response.submessage
                    }
                })
            }
        })
    }
}