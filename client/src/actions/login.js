import { LOGIN_FAILURE, LOGIN_SUCCESS, RESET_AUTH_STATUS } from './actionTypes';
import axios from 'axios';
import { sessionService } from 'redux-react-session';
import { push } from 'connected-react-router'

export const loginUser = (payload, redirectUrl) => async dispatch => {

    dispatch({
        type: RESET_AUTH_STATUS
    })

    setTimeout(async () => {
        var email = payload.email;
        var password = payload.password;

        var resultData = {};

        try {
            resultData = await axios.post('/user/login', {
                email: email,
                password: password
            })
        } catch (err) {
            return dispatch({
                type: LOGIN_FAILURE,
                payload: err.response.data.error
            })
        }

        var token = resultData.data.token;
        var userData = resultData.data.userData;

        await sessionService.saveSession(token);
        await sessionService.saveUser(userData);

        dispatch({
            type: LOGIN_SUCCESS
        })
        dispatch(push(redirectUrl))

    }, 500);
}

export const loginRestaurant = (payload, redirectUrl) => async dispatch => {
    dispatch({
        type: RESET_AUTH_STATUS
    })

    setTimeout(async () => {
        var email = payload.email;
        var password = payload.password;

        var resultData = {};

        try {
            resultData = await axios.post('/user/login', {
                email: email,
                password: password
            })
        } catch (err) {
            return dispatch({
                type: LOGIN_FAILURE,
                payload: err.response.data.error
            })
        }

        var token = resultData.data.token;
        var userData = resultData.data.userData;

        await sessionService.saveSession(token);
        await sessionService.saveUser(userData);

        dispatch({
            type: LOGIN_SUCCESS
        })
        dispatch(push(redirectUrl))

    }, 500);
}

export const loginUserFacebook = (payload, redirectUrl) => async dispatch => {

    await sessionService.saveSession(payload.token);
    await sessionService.saveUser(payload.userData)

    dispatch({
        type: RESET_AUTH_STATUS
    })
    dispatch({
        type: LOGIN_SUCCESS
    })
    dispatch(push(redirectUrl))
}  