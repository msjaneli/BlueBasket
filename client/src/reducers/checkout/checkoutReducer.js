// Reducers
import cart from './cartReducer'
import cartStatus from './cartStatusReducer'
import checkoutStatus from './checkoutStatus'
import createLoadingWithNamedType from '../isLoadingReducer'

// Tools
import { combineReducers } from 'redux'

const checkoutReducer = combineReducers({
    cart,
    cartStatus,
    checkoutStatus,
    isLoading: createLoadingWithNamedType('CHECKOUT')
})

export default checkoutReducer;