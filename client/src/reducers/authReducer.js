// Reducers
import authRedirect from './authRedirectReducer';
import loginStatus from './loginStatusReducer';
import signupStatus from './signupStatusReducer';

// Tools
import { combineReducers } from 'redux';

const authReducer = combineReducers({
    authRedirect,
    signupStatus,
    loginStatus,
})

export default authReducer
