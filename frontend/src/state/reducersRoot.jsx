// @Vendors
import { combineReducers } from 'redux'

// @Reducers
import appReducer from './app/reducer'
import authReducer from './auth/reducer'

export default combineReducers({
	appReducer,
	authReducer
})
