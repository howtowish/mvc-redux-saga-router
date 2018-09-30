import * as ActionTypes from '../constants/ActionTypes'
import api from './api'
import { fetchDataSuccess,fetchDataFailed } from 'actions'
import { call, put } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga'
import { CALL_API } from '../middlewares/api'
function* fetchAllData(action) {
  console.log(localStorage.jwtToken)
  try {
    const data = yield call(
      api, 
      '/fetch-data', 
      { 
        method: 'POST', 
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({token:JSON.parse(localStorage.jwtToken)})
        
      }
    )
      console.log("SAGA_FETCH_DATA_SUCCEEDED",data)
    yield put(fetchDataSuccess(data));
  } catch (e) {
    yield put(fetchDataFailed(e))
  }
}

export default function* watchFetchData() {
  yield* takeLatest(ActionTypes.ON_FETCH_DATA_REQUESTED, fetchAllData)
}
