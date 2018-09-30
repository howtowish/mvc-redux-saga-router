import * as type from '../constants/ActionTypes';
export const onSignupUserRequest = (payload) => ({
    type: type.ON_SIGN_UP_USER_REQUESTED,
    payload
});

export const onSignupUserSuccess = (payload) => ({
    type: type.ON_SIGN_UP_USER_SUCCESSED,
    payload,
});

export const onSignupUserFailed = (error) => ({
    type: type.ON_SIGN_UP_USER_FAILED,
    error,
}); 