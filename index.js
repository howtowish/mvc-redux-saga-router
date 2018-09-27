import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './src/components/App'
import configureStore from './src/store/configureStore'
import 'todomvc-app-css/index.css'
import Routers from './src/router/router'
import setAuthToken from './src/utils/setAuthToken';
import * as actions from './src/actions'
const store = configureStore()
// if (localStorage.jwtToken) {
//   // Set auth token header auth
//   setAuthToken(false);
//   // Decode token and get user info and exp
//   //  const decoded = jwt_decode(localStorage.jwtToken);
//   // Set user and isAuthenticated
//   //store.dispatch(setCurrentUser(decoded));
//   console.log("jwttoken", localStorage.jwtToken);
//   // if (window.location.pathname == "/login") {
//   //   window.location.reload()
//   // }
//   console.log(window.location)
//   // Check for expired token
//   const currentTime = Date.now() / 1000;
//   // if (decoded.exp < currentTime) {
//   //   // Logout user
//   //  // store.dispatch(logoutUser());
//   // console.log(store)
//   store.dispatch(actions.onLogoutUserRequest({data:"aa"}))
//   //   // Clear current Profile
//   // //  store.dispatch(clearCurrentProfile());
//   //   // Redirect to login
//   // window.location.href = '/login';
//   // }
// }
// else {
//   //  setTimeout(function(){window.location.href = '/login'},500);
//   if (window.location.pathname != "/login") {
//     window.location.href = '/login'
//   }
//   // window.location.href = '/login'
// }z
render(
  // <Provider store={store}>
  //   <Routers />
  // </Provider>,
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
