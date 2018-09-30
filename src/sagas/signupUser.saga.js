import * as ActionTypes from '../constants/ActionTypes'
import api from './api'
import { onSignupUserFailed, onSignupUserSuccess } from '../actions'
import { call, put } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga'

console.log("Saga111");
function* signupUser(action) {
  console.log("SagaSignupAction",action);
  try {
    const data = yield call(
      api, 
      '/users/signup', 
      { 
        method: 'POST', 
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username:action.payload.username,password:action.payload.pws,configpws:action.payload.configpws,fullname:action.payload.fullname,email:action.payload.email,phone:action.payload.phone,roles:action.payload.roles }) 
      }
    )

   // const { _id: id, text } = todo
      console.log("SagaSignup User",data)
      yield put(onSignupUserSuccess(data));
    } catch (e) {
      yield put(onSignupUserFailed(e))
    }
  }
  
//Khi action addTodo được client gọi (tương ứng ADD_TODO_REQUESTED) thì function addTodo trong saga chạy
//  Nếu thêm thành công thì bên saga sẽ gửi data đã fetch từ server đến action có Actiontypes ADD_TODO_SUCCEEDED chạy trong reducer
export default function* watchsignupUser() {
  yield* takeLatest(ActionTypes.ON_SIGN_UP_USER_REQUESTED, signupUser)
}
