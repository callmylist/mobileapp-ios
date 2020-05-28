import { LOAD_USER_INFO_REQUEST, LOAD_USER_INFO_FAIL, LOAD_USER_INFO_SUCCESS, LOAD_CAMPAIGN_LIST_SUCCESS } from '../actionTypes/dashboard'

import Utils from '../../utils'
import Constant from '../../utils/app_constants'
import ExConstants from '../../utils/constants'
import { UserService } from '../../service/user.service'
import { CampaignService } from '../../service/campaign.service'
import { CommonService } from '../../service/common.service'
import { forkJoin } from 'rxjs'
import JwtDecode from 'jwt-decode'
import { LoginUser } from '../../shared/models/loginuser.model'
import { LOAD_ASSETS_REQUEST } from '../actionTypes/auth'

export const loadUserInfo = () => {
    return (dispatch: any, getStore: any) => {
        dispatch({
            type: LOAD_ASSETS_REQUEST,
            payload: null,
        })

        UserService.loadUserInfo().subscribe((response: any) => {
            if (response.success)
                dispatch({
                    type: LOAD_USER_INFO_SUCCESS,
                    payload: response.data
                })
        })
    }
}

export const loadCampaignList = () => {
    return (dispatch: any, getStore: any) => {
        dispatch({
            type: LOAD_ASSETS_REQUEST,
            payload: null,
        })

        CampaignService.getCampaignList(1, 10).subscribe((response: any) => {
            if (response.success)
                dispatch({
                    type: LOAD_CAMPAIGN_LIST_SUCCESS,
                    payload: response.data
                })
        })
    }
}
