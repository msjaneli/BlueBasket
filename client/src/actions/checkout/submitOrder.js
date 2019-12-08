import {START_LOADING, END_LOADING, SUBMIT_ORDER_FAILURE, SUBMIT_ORDER_SUCCESS, RESET_CHECKOUT_STATUS} from '../actionTypes'
import axios from 'axios'

export default (payload) => async dispatch => {
    dispatch({
        type: RESET_CHECKOUT_STATUS
    })

    dispatch({
        type: START_LOADING + "_CHECKOUT"
    })

    const data = await submitOrderPromise(payload, dispatch)

    dispatch({
        type: END_LOADING + "_CHECKOUT"
    })

    dispatch({
        type: SUBMIT_ORDER_SUCCESS,
        payload: data.success
    })
}

const submitOrderPromise = (payload, dispatch) => {
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            try {
                const { data } = await axios.post('/order/user/' + payload.uid + '/submit', {
                    name: payload.name,
                    email: payload.email,
                    tokenGenResults: payload.tokenGenResults,
                    error: payload.error,
                    orders: payload.orders
                })
                resolve(data)
            } catch (err) {
                dispatch({
                    type: END_LOADING + "_CHECKOUT"
                })
        
                return dispatch({
                    type: SUBMIT_ORDER_FAILURE,
                    payload: err.response.data.error
                })
            }
        }, 500)
    })
}
