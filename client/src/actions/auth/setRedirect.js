import { SET_AUTH_REDIRECT } from '../actionTypes';

export const setAuthRedirect = redirectUrl => dispatch => {
    dispatch({
        type: SET_AUTH_REDIRECT,
        redirectUrl
    })
}