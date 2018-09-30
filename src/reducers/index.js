import { combineReducers } from 'redux'
import test from "./test.reducer";
import fetchDataaa from "./fetchData.reducer";
import signupUser from './signupUser.reducer';
// import loginUser from './loginUser.reducer'
const todoApp = combineReducers({
  test,
  fetchDataaa,
  signupUser,
  // loginUser,
})

export default todoApp
