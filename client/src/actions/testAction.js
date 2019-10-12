import { TEST_ACTION } from './actionTypes';

export const testAction = () => (dispatch) => {
    dispatch({
        type: TEST_ACTION,
        payload: 'result_of_test_action'
    })
}