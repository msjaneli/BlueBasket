// Reducers
import createPersistedRootReducer from './reducers/index';

// Tools
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { composeWithDevTools } from 'redux-devtools-extension';
import { sessionService } from 'redux-react-session';
import { persistStore } from 'redux-persist'

const initialState = {
    session: {},
    auth: {
        authRedirect: '',
        signupStatus: '',
        loginStatus: '',
    }
}

export const history = createBrowserHistory()

export const store = createStore(
    createPersistedRootReducer(history),
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