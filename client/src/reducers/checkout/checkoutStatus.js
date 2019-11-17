import { SUBMIT_ORDER_SUCCESS, SUBMIT_ORDER_FAILURE, RESET_CHECKOUT_STATUS } from '../../actions/actionTypes'

const checkoutStatusReducer = (state = '', action) => {
    switch(action.type) {
        case SUBMIT_ORDER_SUCCESS: 
            return "CHECKOUT_SUCCESS"
        case SUBMIT_ORDER_FAILURE: 
            return action.payload
        case RESET_CHECKOUT_STATUS: 
            return ''
        default:
            return state
    }
}

export default checkoutStatusReducer;