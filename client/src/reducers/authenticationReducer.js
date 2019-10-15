import { LOGIN_USER, LOGOUT_USER, LOGIN_RESTAURANT, LOGOUT_RESTAURANT } from '../actions/actionTypes';

const authenticationReducer = (state = 'NONE', action) => {
    switch (action.type) {
        default: 
            return state;
    }
}

export default authenticationReducer;