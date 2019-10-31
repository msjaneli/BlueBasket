// Reducers
import auth from './authReducer';
import { combineReducers } from 'redux';

// Tools
import { connectRouter } from 'connected-react-router';
import { sessionReducer as session } from 'redux-react-session';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootPersistConfig = {
    key: 'root',
    storage: storage,
    blacklist: ['router', 'auth']
}

const authPersistConfig = {
    key: 'auth',
    storage: storage,
    blacklist: ['signupStatus', 'loginStatus', 'authRedirect', 'isLoading']

}

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    session,
    auth: persistReducer(authPersistConfig, auth),
})

const createPersistedRootReducer = (history) => persistReducer(rootPersistConfig, createRootReducer(history))

export default createPersistedRootReducer;

