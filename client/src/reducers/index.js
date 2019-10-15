import { combineReducers } from 'redux';
import test from './testReducer';
import authentication from './authenticationReducer';

const rootReducer = combineReducers({
    test,
    authentication,
})

export default rootReducer;

