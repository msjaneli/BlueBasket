import { RESET_CHECKOUT_STATUS } from '../actionTypes'

export const resetCheckoutStatus = () => dispatch => {
    dispatch({
        type: RESET_CHECKOUT_STATUS
    })
}