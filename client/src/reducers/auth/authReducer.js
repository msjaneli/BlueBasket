// Reducers
import authRedirect from './authRedirectReducer';
import loginStatus from './loginStatusReducer';
import signupStatus from './signupStatusReducer';
import createLoadingWithNamedType from '../isLoadingReducer';

// Tools
import { combineReducers } from 'redux';

const authReducer = combineReducers({
    authRedirect,
    signupStatus,
    loginStatus,
    isLoading: createLoadingWithNamedType('AUTH'),
})

export default authReducer
