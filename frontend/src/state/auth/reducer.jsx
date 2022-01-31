import { LOGIN_SUCCESS, LOGOUT_SUCCESS, AUTHENTICATION_SUCCESS, CLEAR_AUTH } from './actionsTypes';

const initialState = {
	isAuthenticated: false,
	user: null,
};

const authReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case LOGIN_SUCCESS: case AUTHENTICATION_SUCCESS:
		return {
			...state,
			isAuthenticated: payload.isAuthenticated,
			user: payload.user
		}
		case LOGOUT_SUCCESS: case CLEAR_AUTH:
		return {
			...state,
			isAuthenticated : false,
			user : null
		}
		default:
		return state;
	}
};

export default authReducer
