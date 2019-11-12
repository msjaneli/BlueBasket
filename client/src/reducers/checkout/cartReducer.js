import { START_LOADING, END_LOADING, ADD_TO_CART, REMOVE_FROM_CART } from '../../actions/actionTypes'

const cartReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_TO_CART: 
            return [...state, action.payload]
        default: 
            return state
    }
}

export default cartReducer;