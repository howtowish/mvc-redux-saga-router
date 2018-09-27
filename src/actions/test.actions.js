import * as type from '../constants/ActionTypes';
export const fetchListChildrenRequest = (payload) => ({
    type: type.FETCH_LIST_CHILDREN_DATA_REQUEST,
    payload,
});

export const onchangeDataSuccess = (payload) => ({
    type: type.ON_CHANGE_DATA_TEST_SUCCESS,
    payload,
});

export const fetchListChildrenFailed = (error) => ({
    type: type.FETCH_LIST_CHILDREN_DATA_FAILED,
    error,
});