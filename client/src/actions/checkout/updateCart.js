import {START_LOADING, END_LOADING, UPDATE_CART, UPDATE_CART_SUCCESS, ADD_CART_FAILURE, RESET_CHECKOUT_STATUS} from '../actionTypes'
import axios from 'axios'

export default (payload) => async dispatch => {
    dispatch({
        type: RESET_CHECKOUT_STATUS
    })

    dispatch({
        type: START_LOADING + "_CHECKOUT"
    })

    setTimeout(async () => {
        try {
            // When user adds to cart, we want to decrsease the listing quantity
            await axios.put('/listing/' + payload.lid + '/update', {
                quantityChange: payload.quantityChangeForListing
            })
        } catch (err) {
            dispatch({
                type: END_LOADING + "_CHECKOUT"
            })
    
            return dispatch({
                type: ADD_CART_FAILURE,
                payload: '(' + payload.name + ')  ' + err.response.data.error
            })
        }

        dispatch({
            type: UPDATE_CART,
            payload: {
                cartId: payload.cartId,
                rid: payload.rid,
                index: payload.index,
                quantityChangeForCart: payload.quantityChangeForCart
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