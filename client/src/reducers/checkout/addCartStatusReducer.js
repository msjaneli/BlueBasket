import { ADD_CART_FAILURE, RESET_CHECKOUT_STATUS } from '../../actions/actionTypes'

const addCartStatusReducer = (state = '', action) => {
    switch (action.type) {
        case ADD_CART_FAILURE:
            return action.payload
        case RESET_CHECKOUT_STATUS: 
            return ''
        default: 
            return state
    }
}

export default addCartStatusReducer;