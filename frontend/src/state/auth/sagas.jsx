import {put, takeLatest, call} from 'redux-saga/effects';
import jsonwebtoken from 'jsonwebtoken'

import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGOUT,
  LOGOUT_SUCCESS,
  REGISTER,
  CHECK_AUTHENTICATION,
  AUTHENTICATION_SUCCESS,
  CLEAR_AUTH
} from './actionsTypes'

import {
  REQUEST_STARTED,
  REQUEST_FINISHED,
  REQUEST_FAILURE,
  REQUEST_SUCCESS
} from '../app/actionsTypes'

import { signinService, signupService } from './services';

import {buildErrorsObj, setToken, removeToken, verifyToken } from 'utils/helpers'

function* signinWorker({ payload }){
	try {
    yield put({ type: REQUEST_STARTED })
    const response = yield call(signinService, payload);
    const _TOKEN_ = response.data.token
    if(_TOKEN_) {
      yield call(setToken, _TOKEN_)
      yield put({ type: LOGIN_SUCCESS, payload : {
        isAuthenticated : true,
        user : jsonwebtoken.decode(_TOKEN_)
        }
      });
      yield put({ type: REQUEST_SUCCESS, payload: `Welcome user` })
    } else {
      yield put({
        type: REQUEST_FAILURE,
        payload: {
          serverErrors: response.data.message,
          statusError: response.status
        }
      })
    }
    yield put({ type: REQUEST_FINISHED })
  } catch (err) {
    yield put({
      type: REQUEST_FAILURE,
      payload: buildErrorsObj(err)
    })
  }
}

function* logoutWorker() {
  const isRemove = yield call(removeToken)
  if (isRemove) {
    yield call(clearReducers);
    yield put({ type: LOGOUT_SUCCESS });
    yield put({ type: REQUEST_SUCCESS, payload: `Logout success` })
  }
}

function* clearReducers(){
  yield put({ type: CLEAR_AUTH });
}

function* checkAuthenticationWorker() {
  try {
    const _TOKEN_ = yield call(verifyToken)
    if(_TOKEN_) {
      yield put({ type: AUTHENTICATION_SUCCESS, payload : {
        isAuthenticated : true,
        user : jsonwebtoken.decode(_TOKEN_)
        }
      });
    } else {
      yield put({ type: LOGOUT })
    }
  } catch(err) {
    console.error(err)
  }
}

// @Watcher
function* requestWatcher() {
  yield takeLatest(LOGIN, signinWorker)
  yield takeLatest(LOGOUT, logoutWorker)
  yield takeLatest(CHECK_AUTHENTICATION, checkAuthenticationWorker)
}

export default {requestWatcher}
