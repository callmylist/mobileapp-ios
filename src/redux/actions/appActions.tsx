import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAILED, LOAD_ASSETS_REQUEST, LOAD_ASSETS_SUCCESS } from '../actionTypes/app'

import Utils from '../../utils'
import Constant from '../../utils/app_constants'
import ExConstants from '../../utils/constants'
import { UserService } from '../../service/user.service'
import { CommonService } from '../../service/common.service'
import { forkJoin } from 'rxjs'

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
                    domainUser: JSON.stringify(user.data),
                    assetsPath: assetPath.data.name
                }
            })
        })
    }
}
