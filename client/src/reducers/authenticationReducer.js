import { LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE } from '../actions/actionTypes';

const authenticationReducer = (state = 'NONE', action) => {
    switch (action.type) {
        case LOGIN_USER_SUCCESS:
            return "USER"
        case LOGIN_USER_FAILURE:
            return "FAILURE"
        default: 
            return state;
    }
}

export default authenticationReducer;