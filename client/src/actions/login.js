import { LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS, RESET_AUTH_STATUS } from './actionTypes';
import axios from 'axios';
import { sessionService } from 'redux-react-session';
import { push } from 'connected-react-router'

export const loginUser = (payload, redirectUrl) => async dispatch => {
    var email = payload.email;
    var password = payload.password;

    var resultData = {};

    dispatch({
        type: RESET_AUTH_STATUS
    })

    setTimeout( async () => {
        try {
            resultData = await axios.post('/user/login', {
                email: email,
                password: password
            })
        } catch (err) {
            return dispatch({
                type: LOGIN_USER_FAILURE,
                payload: err.response.data.error
            })
        }
        
        var token = resultData.data.token;
        var data = resultData.data.data;

        await sessionService.saveSession(token);
        await sessionService.saveUser(data)
        dispatch({
            type: LOGIN_USER_SUCCESS
        })
        dispatch(push(redirectUrl))
    }, 500);


}

export const loginUserFacebook = (payload, redirectUrl) => async dispatch => {

    await sessionService.saveSession(payload.token);
    await sessionService.saveUser(payload.data)

    dispatch({
        type: RESET_AUTH_STATUS
    })
    dispatch({
        type: LOGIN_USER_SUCCESS
    })
    dispatch(push(redirectUrl))
}  

export const loginRestaurant = () => {

}