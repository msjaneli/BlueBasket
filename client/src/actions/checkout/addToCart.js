import { START_LOADING, END_LOADING, ADD_TO_CART, ADD_CART_FAILURE, RESET_CHECKOUT_STATUS } from '../actionTypes';
import axios from 'axios';
import { push } from 'connected-react-router';

export const addToCart = (payload) => async dispatch => {

    dispatch({
        type: RESET_CHECKOUT_STATUS
    })

    dispatch({
        type: START_LOADING + "_CHECKOUT"
    })

    try {
        // When user adds to cart, we want to decrsease the listing quantity
        axios.post('/listing/' + payload.lid + '/update', {
            quantityChange: payload.quantityChange
        })
    } catch (err) {
        dispatch({
            type: END_LOADING + "_CHECKOUT"
        })

        return dispatch({
            type: ADD_CART_FAILURE,
            payload: err.response.data.err
        })
    }

    dispatch({
        type: ADD_TO_CART
    })

    dispatch({
        type: STOP_LOADING + "_CHECKOUT"
    })
}
