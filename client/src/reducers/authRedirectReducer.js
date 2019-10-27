import { SET_AUTH_REDIRECT, LOGIN_SUCCESS } from '../actions/actionTypes'

const authRedirectReducer = (state = '/profile', action) => {
    switch (action.type) {
        case SET_AUTH_REDIRECT:
            return action.redirectUrl
        case LOGIN_SUCCESS:
            return '/profile'
        default:
            return state

    }
}

export default authRedirectReducer;