import { LOGIN_USER_FAILURE, RESET_AUTH_STATUS } from '../actions/actionTypes';

const loginStatusReducer = (state = '', action) => {
    switch (action.type) {
        case LOGIN_USER_FAILURE:
            return action.payload
        case RESET_AUTH_STATUS:
            return ''
        default: 
            return state;
    }
}

export default loginStatusReducer;