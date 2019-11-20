import { ADD_TO_CART, UPDATE_CART, REMOVE_FROM_CART, CLEAR_CART } from '../../actions/actionTypes'

const cartReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_TO_CART: 
            return [...state, action.payload]
        case UPDATE_CART: 
            return state.map(cartItem => 
                action.payload.cartId === cartItem.cartId ? {...cartItem, quantity: action.payload.quantityChangeForCart + cartItem.quantity} : cartItem
            )
        case REMOVE_FROM_CART: 
            return state.filter((cartItem) => (
                action.payload.cartId !== cartItem.cartId
            ))
        case CLEAR_CART: 
            return []
        default: 
            return state
    }
}

export default cartReducer;