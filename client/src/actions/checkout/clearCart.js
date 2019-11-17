import { CLEAR_CART } from '../actionTypes'

export default () => async dispatch => {
    dispatch({
        type: CLEAR_CART
    })
}