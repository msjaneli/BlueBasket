import { START_LOADING, END_LOADING, REMOVE_FROM_CART, RESET_CHECKOUT_STATUS, UPDATE_CART_SUCCESS } from '../actionTypes'
import axios from 'axios'

export default (payload) => async dispatch => {
    dispatch({
        type: RESET_CHECKOUT_STATUS
    })

    dispatch({
        type: START_LOADING + "_CHECKOUT"
    })

    setTimeout(async () => {
        
        await axios.put('/listing/' + payload.lid + '/update', {
            quantityChange: payload.quantityChangeForListing
        })
        

        dispatch({
            type: REMOVE_FROM_CART,
            payload: {
                cartId: payload.cartId,
            }
        })
    
        dispatch({
            type: END_LOADING + "_CHECKOUT"
        })

        dispatch({
            type: UPDATE_CART_SUCCESS
        })
        
    }, 500)
}