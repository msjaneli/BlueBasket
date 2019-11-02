import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';

// Components
import Navbar from './components/Navbar/Navbar'

// Pages
import Home from '../src/pages/Home';
import LoginUser from './pages/Authentication/LoginUser';
import LoginRestaurant from './pages/Authentication/LoginRestaurant'
import Donate from '../src/pages/Donate/Donate'
import ThankYou from '../src/pages/Donate/ThankYou'
import Meals from '../src/pages/Meals/Meals'
import UserProfile from './pages/Profiles/UserProfile';
import RestaurantProfile from './pages/Profiles/RestaurantProfile';
import TestProtected from './pages/TestProtected'
import NotFound from './pages/NotFound'

// Private routes
import PrivateRouteUser from './private_routes/PrivateRouteUser';
import PrivateRouteRestaurant from './private_routes/PrivateRouteRestaurant';

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
            <Navbar/>
            <Switch>
              <Route exact path = '/' component = { Home } />
              <Route exact path = '/login/user' component = { LoginUser } />
              <Route exact path = '/login/restaurant' component = { LoginRestaurant }/>
              <Route exact path = '/donate' component = { Donate } />
              <Route exact path = '/meals' component = { Meals } />
              <Route exact path = '/thankyou' component = { ThankYou } />
              <PrivateRouteUser exact path = '/profile/user' component = { UserProfile } authenticated = { authenticated } type = { type }/>
              <PrivateRouteUser exact path = '/protected/user' component = { TestProtected } authenticated = { authenticated } type = { type } />
              <PrivateRouteRestaurant exact path = '/profile/restaurant' component = { RestaurantProfile } authenticated = { authenticated } type = { type }/>
              <PrivateRouteRestaurant exact path = '/protected/restaurant' component = { TestProtected } authenticated = { authenticated } type = { type } />
              <Route component = {NotFound} />
            </Switch>
          </div>
        }
      </ConnectedRouter>
    </div>

  );
}

export default connect(mapStateToProps)(App);
