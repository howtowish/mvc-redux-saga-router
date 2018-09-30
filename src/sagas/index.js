import { takeLatest } from 'redux-saga'
import { call, fork, put } from 'redux-saga/effects'
import bootstrap from './bootstrap'
import watchFetchData from './fetch-data.saga'
import watchsignupUser from './signupUser.saga'
import watchloginUser from './login.saga'
export default function* watchMany() {
  yield [
    fork(watchFetchData),
    fork(watchsignupUser),
    fork(watchloginUser),
    fork(bootstrap),
    
  ]
}
