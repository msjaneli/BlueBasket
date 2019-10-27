import { SIGNUP_FAILURE, SIGNUP_SUCCESS, RESET_AUTH_STATUS } from '../actions/actionTypes';

const signUpStatusReducer = (state = '', action) => {
    switch (action.type) {
        case SIGNUP_FAILURE:
            return action.payload
        case SIGNUP_SUCCESS:
            return 'SIGNUP_SUCCESS'
        case RESET_AUTH_STATUS:
            return ''
        default:
            return state
    }
}

export default signUpStatusReducer;