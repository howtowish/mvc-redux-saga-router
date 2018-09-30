import * as constants from 'constants';
const initialState = {
  data: [],
};

export default function data(state = initialState, action) {
  switch (action.type) {
    case constants.ON_FETCH_DATA_SUCCESSED:
      console.log("reducer fetchData", action)
      return {
        data: action.payload
      };
    case constants.ON_LOGIN_USER_SUCCESSED:
      console.log("reducer Login Success", action)
      return {
        data: action.payload
      };
    case constants.ON_LOGOUT_USER_REQUESTED:
      localStorage.removeItem('jwtToken');
      if (action.payload.history) {
        action.payload.history.push(constants.LOGIN_DIR_SCENE)
      }
      console.log("logout success", action)
      return {
        data: []
      };
    default:
      return state;
  }
}