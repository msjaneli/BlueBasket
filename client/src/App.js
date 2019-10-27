import React from 'react';
import { Route} from 'react-router';
import './App.css';

// Pages
import Home from '../src/pages/Home';
import LoginUser from './pages/Authentication/LoginUser';
import LoginRestaurant from './pages/Authentication/LoginRestaurant'
import Donate from '../src/pages/Donate/Donate'
import Meals from '../src/pages/Meals/Meals'
import Profile from './pages/Profile';
import TestProtected from './pages/TestProtected'

// Private routes
import PrivateRouteUser from './private_routes/PrivateRouteUser';

// Tools
import { connect } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router'
import { history } from './store';

// Selectors
import * as sessionSelectors from './selectors/sessionSelectors'

const mapStateToProps = (state) => ({
  checked: sessionSelectors.isChecked(state),
  authenticated: sessionSelectors.isAuthenticated(state),
  type: sessionSelectors.getType(state)
})

const App = ({ authenticated, checked, type }) => {
  return (
    <div>
      <ConnectedRouter history = { history }>
        { checked && 
          <div className="App">
            <Route exact path = '/' component = { Home } />
            <Route exact path = '/login/user' component = { LoginUser } />
            <Route exact path = '/login/restaurant' component = { LoginRestaurant }/>
            <Route exact path = '/donate' component = { Donate } />
            <Route exact path = '/meals' component = { Meals } />
            <PrivateRouteUser exact path = '/profile' component = { Profile } authenticated = { authenticated } type = { type }/>
            <PrivateRouteUser exact path = '/protected' component = { TestProtected } authenticated = { authenticated } type = { type } />
          </div>
        }
      </ConnectedRouter>
    </div>

  );
}

export default connect(mapStateToProps)(App);
