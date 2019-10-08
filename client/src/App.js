import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

// Pages
import Home from '../src/pages/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path = '/' component = {Home} />
      </div>
    </Router>

  );
}

export default App;
