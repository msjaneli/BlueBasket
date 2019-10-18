import { RESET_AUTH_STATUS } from "./actionTypes"

export const resetAuthStatus = () => dispatch => {
    dispatch({
        type: RESET_AUTH_STATUS
    })
}

