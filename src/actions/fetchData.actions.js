import * as type from '../constants/ActionTypes';
export const fetchDataRequest = () => ({
    type: type.ON_FETCH_DATA_REQUESTED,
});

export const fetchDataSuccess = (payload) => ({
    type: type.ON_FETCH_DATA_SUCCESSED,
    payload,
});

export const fetchDataFailed = (error) => ({
    type: type.ON_FETCH_DATA_FAILED,
    error,
});