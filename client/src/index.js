import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {store, persistor} from './store';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { PersistGate } from 'redux-persist/integration/react'
import { StripeProvider } from 'react-stripe-elements'
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading = {null} persistor = {persistor}>
            <StripeProvider apiKey="pk_test_XFEM1iO76F4WkZhGnCjyDGzO00Qj8s9fUC">
                <App />
            </StripeProvider>
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
