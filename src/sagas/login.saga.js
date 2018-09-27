
import * as constants from 'constants';
import api from './api'
import { onLoginUserSuccess, onLoginUserFailed } from '../actions'
import { call, put } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga'
console.log("Saga111");
function* loginUser(action) {
  console.log("SagaLoginAction",action);
  try {
    const data = yield call(
      api, 
      '/users/login', 
      { 
        method: 'POST', 
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username:action.payload.username,password:action.payload.pws }) 
      }
    )
  //history.push('/home/1')
  // action.payload.history.push("/home/1")
   // const { _id: id, text } = todo
   if(data.error==true){
    console.log("SagaLogin User error",data)
   }
   else{
     localStorage.removeItem("jwtToken")
      console.log("SagaLogin User",data)
      localStorage.setItem('jwtToken', JSON.stringify(data.token));
      action.payload.history.push(constants.HOME_DIR_SCENE)
   }
      // let user = localStorage.getItem('myData');
      // console.log("ac",JSON.parse(user))
      yield put(onLoginUserSuccess(data));
    } catch (e) {
      yield put(onLoginUserFailed(e))
    }
  }
  
//Khi action addTodo được client gọi (tương ứng ADD_TODO_REQUESTED) thì function addTodo trong saga chạy
//  Nếu thêm thành công thì bên saga sẽ gửi data đã fetch từ server đến action có Actiontypes ADD_TODO_SUCCEEDED chạy trong reducer
export default function* watchloginUser() {
  yield* takeLatest(constants.ON_LOGIN_USER_REQUESTED, loginUser)
}
