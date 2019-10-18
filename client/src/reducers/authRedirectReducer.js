import { SET_AUTH_REDIRECT, LOGIN_USER_SUCCESS, LOGOUT } from '../actions/actionTypes'

const authRedirectReducer = (state = '/', action) => {
    switch (action.type) {
        case SET_AUTH_REDIRECT:
            return action.redirectUrl
        case LOGIN_USER_SUCCESS:
            return '/'
        default:
            return state

    }
}

export default authRedirectReducer;