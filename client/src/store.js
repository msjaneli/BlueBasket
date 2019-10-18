import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import createRootReducer from './reducers/index';
import { composeWithDevTools } from 'redux-devtools-extension';
import { sessionService } from 'redux-react-session';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const initialState = {
    authRedirect: '/',
    signupStatus: '',
    loginStatus: '',
    session: {},
    type: '',
}

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['signupStatus', 'loginStatus', 'router', 'authRedirect']
}

export const history = createBrowserHistory()

const persistedReducer = persistReducer(persistConfig, createRootReducer(history))

export const store = createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(
        applyMiddleware(
            thunk, // thunk ability
            routerMiddleware(history) // to dispatch history actions
        ),
    )
);

export const persistor = persistStore(store);

// Initiate session service
sessionService.initSessionService(store);