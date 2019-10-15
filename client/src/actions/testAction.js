import { TEST_ACTION } from './actionTypes';

export const testAction = payload => dispatch => {
    return dispatch({
        type: TEST_ACTION,
        payload
    })
}