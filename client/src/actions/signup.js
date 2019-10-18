import { SIGNUP_USER_FAILURE, SIGNUP_USER_SUCCESS, RESET_AUTH_STATUS } from './actionTypes';
import axios from 'axios';
import { push } from 'connected-react-router';

export const signup = (payload) => async dispatch => {
    dispatch({
        type: RESET_AUTH_STATUS
    })

    await signUpPromise(payload, dispatch)

    dispatch({
        type: SIGNUP_USER_SUCCESS
    })

}

const signUpPromise = (payload, dispatch) => {
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            var name = payload.name
            var email = payload.email
            var password = payload.password

            try {
                await axios.post('/user/register', {
                    name: name,
                    email: email,
                    password: password
                })    
                resolve("success");
            } catch (err) {
                return dispatch({
                    type: SIGNUP_USER_FAILURE,
                    payload: err.response.data.error
                })
            }

        }, 500);
    })
}