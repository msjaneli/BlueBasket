import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';

// Components
import Navbar from './components/Navbar/Navbar'

// Pages
import Home from '../src/pages/Home';
import LoginUser from './pages/Authentication/LoginUser';
import LoginRestaurant from './pages/Authentication/LoginRestaurant'
import LoginShelter from './pages/Authentication/LoginShelter';
import Donate from '../src/pages/Donate/Donate'
import DonateThankYou from '../src/pages/Donate/ThankYou'
import Meals from '../src/pages/Meals/Meals'
import UserCheckout from '../src/pages/Checkout/UserCheckout'
import ShelterCheckout from '../src/pages/Checkout/ShelterCheckout'
import CheckoutThankYou from '../src/pages/Checkout/ThankYou'
import ListingPage from './pages/Meals/ListingPage';
import UserProfile from './pages/Profiles/UserProfile';
import RestaurantProfile from './pages/Profiles/RestaurantProfile';
import ShelterProfile from './pages/Profiles/ShelterProfile';
import UserOrder from './pages/Orders/UserOrder';
import ShelterOrder from './pages/Orders/ShelterOrder'
import RestaurantOrder from './pages/Orders/RestaurantOrder';
import TestProtected from './pages/TestProtected'
import NotFound from './pages/NotFound'

// Private routes
import PrivateRouteUser from './private_routes/PrivateRouteUser';
import PrivateRouteRestaurant from './private_routes/PrivateRouteRestaurant';
import PrivateRouteShelter from './private_routes/PrivateRouteShelter';

// Tools
import { connect } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router'
import { history } from './store';

// Selectors
import * as sessionSelectors from './selectors/sessionSelectors'
import Cart from './pages/Checkout/Cart';

const mapStateToProps = (state) => ({
  checked: sessionSelectors.isChecked(state),
  authenticated: sessionSelectors.isAuthenticated(state),
  user: sessionSelectors.getUser(state)
})

const App = ({ authenticated, checked, user }) => {
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
              <Route exact path = '/login/shelter' component = { LoginShelter }/>
              <Route exact path = '/donate' component = { Donate } />
              <Route exact path = '/meals' component = { Meals } />
              <Route exact path = '/meals/:rid' component = {ListingPage} />
              <Route exact path = '/donate/thankyou' component = { DonateThankYou } />
              <Route exact path = '/checkout/thankyou' component = {CheckoutThankYou} />
              <Route exact path = '/cart' component = { Cart } />
              <PrivateRouteUser exact path = '/profile/user' component = { UserProfile } authenticated = { authenticated } type = { user.type }/>
              <PrivateRouteUser exact path = '/orders/user' component = { UserOrder } authenticated = { authenticated } type = { user.type }/>
              <PrivateRouteUser exact path = '/protected/user' component = { TestProtected } authenticated = { authenticated } type = { user.type } />
              <PrivateRouteUser exact path = '/checkout/user' component = { UserCheckout } authenticated = { authenticated } type = {user.type} />
              <PrivateRouteRestaurant exact path = '/profile/restaurant' component = { RestaurantProfile } authenticated = { authenticated } type = { user.type }/>
              <PrivateRouteRestaurant exact path = '/orders/restaurant' component = { RestaurantOrder } authenticated = { authenticated } type = { user.type } />
              <PrivateRouteRestaurant exact path = '/protected/restaurant' component = { TestProtected } authenticated = { authenticated } type = { user.type } />
              <PrivateRouteShelter exact path = '/profile/shelter' component = { ShelterProfile } authenticated = { authenticated } type = { user.type } />
              <PrivateRouteShelter exact path = '/orders/shelter' component = { ShelterOrder } authenticated = { authenticated } type = { user.type }/>
              <PrivateRouteShelter exact path = '/protected/shelter' component = { TestProtected } authenticated = { authenticated } type = { user.type } />
              <PrivateRouteShelter exact path = '/checkout/shelter' component = { ShelterCheckout } authenticated = { authenticated } type = { user.type } />

              {/* <PrivateRouteRestaurant exact path = '/meals/restaurant' component={ Meals } authenticated = { authenticated } type = { type } /> */}

              <Route component = {NotFound} />
            </Switch>
          </div>
        }
      </ConnectedRouter>
    </div>

  );
}

export default connect(mapStateToProps)(App);
