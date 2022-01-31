// @Vendors
import axios from 'axios';
import { BASE_API } from "constants/index";

export function signinService(payload){
	return axios.post(`${BASE_API}/app/login`, payload);
}

export function signupService(payload) {
	return axios.post(`${BASE_API}/register`, { params: payload });
}

export function recoverService(payload) {
	return axios.post(`${BASE_API}/recoverpassword`, { params: payload });
}

export function updatePasswordService(data) {
	return axios.post(`${BASE_API}/updatepassword`, { params: data }, {
		headers: {
			'Authorization' : data.token
		}
	})
}

export function activateAccountService(data) {
  return axios.post(`${BASE_API}/activateuser`, { params: data })
}
