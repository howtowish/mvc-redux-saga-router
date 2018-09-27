import * as ActionTypes from '../constants/ActionTypes'
const initialState = {
    dataTest: 'haha',
};

export default function test(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.ON_CHANGE_DATA_TEST_SUCCESS:
    console.log("=====data check listchildren=====")
    console.log(action)
      return {
        dataTest: action.payload
      };
    default:
      return state;
  }
}