// Reducers
import cart from './cartReducer'
import cartStatus from './addCartStatusReducer'
import createLoadingWithNamedType from '../isLoadingReducer'

// Tools
import { combineReducers } from 'redux'

const checkoutReducer = combineReducers({
    cart,
    cartStatus,
    isLoading: createLoadingWithNamedType('CHECKOUT')
})

export default checkoutReducer;