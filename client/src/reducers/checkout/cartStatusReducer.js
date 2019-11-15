import { ADD_CART_FAILURE, UPDATE_CART_SUCCESS, RESET_CHECKOUT_STATUS } from '../../actions/actionTypes'

const cartStatusReducer = (state = '', action) => {
    switch (action.type) {
        case UPDATE_CART_SUCCESS: 
            return 'UPDATE_SUCCESS'
        case ADD_CART_FAILURE:
            return action.payload
        case RESET_CHECKOUT_STATUS: 
           return '';
        default: 
            return state
    }
}

export default cartStatusReducer;