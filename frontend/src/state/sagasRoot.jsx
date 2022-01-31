// @Vendors
import { all, fork } from "redux-saga/effects";

// @Sagas
import auth from './auth/sagas'

export default function* () {
	yield all([...Object.values(auth)].map(fork));
}
