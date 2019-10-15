import { LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE } from './actionTypes';
import axios from 'axios';

export const loginActionUser = payload => async dispatch => {
    var email = payload.email;
    var password = payload.password;
    
    const loginSuccess = await axios.post('/user/login', {
        email: email,
        password: password,
    })

    if(loginSuccess.data) {
        return dispatch({
            type: LOGIN_USER_SUCCESS,
        })
    } else {
        return dispatch({
            type: LOGIN_USER_FAILURE,
        })
    }

}