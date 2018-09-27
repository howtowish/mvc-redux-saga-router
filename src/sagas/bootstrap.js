import { put } from 'redux-saga/effects'
import { fetchDataRequest } from '../actions'
//fetch data từ server
export default function* bootstrap() {
  console.log("Serer.js ->/app/router.js->index.html từ webpack.config.js chuyển hướng vào index.js của reactjs ");
  console.log("từ index.js ->selectors->reducer->saga ( bootstrap.js trong saga gọi action fetchTodos để fetch dữ liệu ban đâu từ server -> reducer-> App.js");
  console.log("SAGA_FETCH_DATA")
 // yield put(fetchDataRequest())
}
