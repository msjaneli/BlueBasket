import { LOGIN_USER_SUCCESS, LOGIN_RESTAURANT_SUCCESS, LOGOUT } from '../actions/actionTypes';

const typeReducer = (state = '', action) => {
    switch (action.type) {
        case LOGIN_USER_SUCCESS: 
            return 'USER'
        case LOGIN_RESTAURANT_SUCCESS:
            return 'RESTAURANT'
        case LOGOUT: 
            return '';
        default: 
            return state
    }
}

export default typeReducer;