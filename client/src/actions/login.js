import { LOGIN_FAILURE, LOGIN_SUCCESS, RESET_AUTH_STATUS, START_LOADING, END_LOADING } from './actionTypes';
import axios from 'axios';
import { sessionService } from 'redux-react-session';
import { push } from 'connected-react-router'

export const loginUser = (payload, redirectUrl) => async dispatch => {

    dispatch({
        type: RESET_AUTH_STATUS
    })

    dispatch({
        type: START_LOADING
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
            dispatch({
                type: END_LOADING
            })

            return dispatch({
                type: LOGIN_FAILURE,
                payload: err.response.data.error
            })
        }

        var token = resultData.data.token;
        var userData = resultData.data.userData;

        await sessionService.saveUser(userData);
        await sessionService.saveSession(token);

        dispatch({
            type: END_LOADING
        })

        dispatch({
            type: LOGIN_SUCCESS
        })
        dispatch(push(redirectUrl))

    }, 750);
}

export const loginRestaurant = (payload, redirectUrl) => async dispatch => {
    dispatch({
        type: RESET_AUTH_STATUS
    })

    dispatch({
        type: START_LOADING
    })

    setTimeout(async () => {
        var email = payload.email;
        var password = payload.password;

        var resultData = {};

        try {
            resultData = await axios.post('/restaurant/login', {
                email: email,
                password: password
            })
        } catch (err) {
            dispatch({
                type: END_LOADING
            })

            return dispatch({
                type: LOGIN_FAILURE,
                payload: err.response.data.error
            })
        }

        var token = resultData.data.token;
        var restaurantData = resultData.data.restaurantData;

        await sessionService.saveUser(restaurantData);
        await sessionService.saveSession(token);

        dispatch({
            type: END_LOADING
        })

        dispatch({
            type: LOGIN_SUCCESS
        })
        dispatch(push(redirectUrl))

    }, 750);
}

export const loginUserFacebook = (payload, redirectUrl) => async dispatch => {

    dispatch({
        type: RESET_AUTH_STATUS
    })

    await sessionService.saveUser(payload.userData);
    await sessionService.saveSession(payload.token);

    dispatch({
        type: LOGIN_SUCCESS
    })
    dispatch(push(redirectUrl))
}  