import * as type from '../constants/ActionTypes';
export const onLoginUserRequest = (payload) => ({
    type: type.ON_LOGIN_USER_REQUESTED,
    payload,
});

export const onLoginUserSuccess = (payload) => ({
    type: type.ON_LOGIN_USER_SUCCESSED,
    payload,
});

export const onLoginUserFailed = (error) => ({
    type: type.ON_LOGIN_USER_FAILED,
    error,
});




export const onLogoutUserRequest = (payload) => ({
    type: type.ON_LOGOUT_USER_REQUESTED,
    payload,
});
