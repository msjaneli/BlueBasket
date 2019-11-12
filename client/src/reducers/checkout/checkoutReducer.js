// Reducers
import cart from './cartReducer'
import createLoadingWithNamedType from '../isLoadingReducer'

// Tools
import { combineReducers } from 'redux'

const checkoutReducer = combineReducers({
    cart,
    isLoading: createLoadingWithNamedType('CHECKOUT')
})

export default checkoutReducer;