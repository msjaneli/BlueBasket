import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import signupStatus from './signupStatusReducer'
import loginStatus from './loginStatusReducer'
import type from './typeReducer';
import authRedirect from './authRedirectReducer';
import { sessionReducer as session } from 'redux-react-session';

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    authRedirect,
    signupStatus,
    loginStatus,
    session,
    type,
})


export default createRootReducer;

