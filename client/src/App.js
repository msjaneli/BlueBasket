import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';

// Pages
import Test from '../src/pages/Test';
import Home from '../src/pages/Home';
import LoginScreen from '../src/pages/LoginScreen';
import Donate from '../src/pages/Donate/Donate'
import Meals from '../src/pages/Meals/Meals'
import NavBar from '../src/components/NavBar';

function App() {
  return (
    <div>
      <NavBar />
      <Router>
        <div className="App">
          <Route exact path = '/test' component = {Test} />
          <Route exact path = '/' component = { Home } />
          <Route exact path = '/login' component = { LoginScreen } />
          <Route exact path = '/donate' component = { Donate } />
          <Route exact path = '/meals' component = { Meals } />
        </div>
      </Router>
    </div>

  );
}

export default App;
