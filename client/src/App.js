import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';

// Pages
import Test from '../src/pages/Test';

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path = '/test' component = {Test} />
      </div>
    </Router>

  );
}

export default App;
