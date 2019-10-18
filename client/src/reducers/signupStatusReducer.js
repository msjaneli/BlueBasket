import { SIGNUP_USER_FAILURE, SIGNUP_USER_SUCCESS, RESET_AUTH_STATUS } from '../actions/actionTypes';

const signUpStatusReducer = (state = '', action) => {
    switch (action.type) {
        case SIGNUP_USER_FAILURE:
            return action.payload
        case SIGNUP_USER_SUCCESS:
            return 'SIGNUP_SUCCESS'
        case RESET_AUTH_STATUS:
            return ''
        default:
            return state
    }
}

export default signUpStatusReducer;