import React from 'react';
import { Route} from 'react-router';
import './App.css';

// Pages
import Home from '../src/pages/Home';
import LoginScreen from './pages/Authentication/LoginScreen';
import Donate from '../src/pages/Donate/Donate'
import Meals from '../src/pages/Meals/Meals'
import NavBar from '../src/components/NavBar';
import Profile from './pages/Profile';
import TestProtected from './pages/TestProtected'

// Private routes
import PrivateRouteUser from './private_routes/PrivateRouteUser';

// Tools
import { connect } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router'
import { history } from './store';

const mapStateToProps = (state) => ({
  checked: state.session.checked,
  authenticated: state.session.authenticated,
  type: state.type
})

const App = ({ authenticated, checked, type }) => {
  return (
    <div>
      <NavBar />
      <ConnectedRouter history = { history }>
        { checked && 
          <div className="App">
            <Route exact path = '/' component = { Home } />
            <Route exact path = '/login' component = { LoginScreen } />
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
