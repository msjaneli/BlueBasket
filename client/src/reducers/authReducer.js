// Reducers
import authRedirect from './authRedirectReducer';
import loginStatus from './loginStatusReducer';
import signupStatus from './signupStatusReducer';
import isLoading from './isLoadingReducer';

// Tools
import { combineReducers } from 'redux';

const authReducer = combineReducers({
    authRedirect,
    signupStatus,
    loginStatus,
    isLoading,
})

export default authReducer
