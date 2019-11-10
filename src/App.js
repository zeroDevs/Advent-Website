import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navigation from './components/navigation/navigation.component';
import './App.css';

// pages
import About from './pages/About';
import Solutions from './pages/Solutions';
import FourZeroFour from './pages/FourZeroFour';

function App() {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route exact path='/about' component={About} />
        <Route exact path='/solutions' component={Solutions} />
        <Route path='*' component={FourZeroFour} />
      </Switch>
    </Router>
  );
}

export default App;
