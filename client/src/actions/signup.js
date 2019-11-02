import { SIGNUP_FAILURE, SIGNUP_SUCCESS, RESET_AUTH_STATUS, START_LOADING, END_LOADING } from './actionTypes';
import axios from 'axios';

export const signup = (payload) => async dispatch => {
    dispatch({
        type: RESET_AUTH_STATUS
    })

    dispatch({
        type: START_LOADING
    })

    await signUpPromise(payload, dispatch)

    dispatch({
        type: END_LOADING
    })

    dispatch({
        type: SIGNUP_SUCCESS
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
                dispatch({
                    type: END_LOADING
                })

                return dispatch({
                    type: SIGNUP_FAILURE,
                    payload: err.response.data.error
                })
            }

        }, 750);
    })
}