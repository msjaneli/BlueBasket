import { RESET_CHECKOUT_STATUS } from '../actionTypes'

export default () => dispatch => {
    dispatch({
        type: RESET_CHECKOUT_STATUS
    })
}