// Reducers
import auth from './auth/authReducer';
import checkout from './checkout/checkoutReducer';
import { combineReducers } from 'redux';

// Tools
import { connectRouter } from 'connected-react-router';
import { sessionReducer as session } from 'redux-react-session';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootPersistConfig = {
    key: 'root',
    storage: storage,
    blacklist: ['router', 'auth', 'checkout']
}

const authPersistConfig = {
    key: 'auth',
    storage: storage,
    whitelist: [],
}

const checkoutPersistConfig = {
    key: 'checkout',
    storage: storage,
    whitelist: ['cart']
}

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    session,
    auth: persistReducer(authPersistConfig, auth),
    checkout: persistReducer(checkoutPersistConfig, checkout)
})

const createPersistedRootReducer = (history) => persistReducer(rootPersistConfig, createRootReducer(history))

export default createPersistedRootReducer;

