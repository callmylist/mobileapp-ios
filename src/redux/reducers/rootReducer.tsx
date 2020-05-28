import { combineReducers } from 'redux'

import authReducer from './authReducer'
import dashboardReducer from './dashboardReducer'

export default combineReducers({
    authReducer,
    dashboardReducer
})