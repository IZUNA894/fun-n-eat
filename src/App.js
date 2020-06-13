import React from 'react';
import './App.css';
import {
  Switch,
  Route
} from "react-router-dom";

import Navbar from './navbar.js'
import Home from './home';
import Create from './create'
function App() {
  return (
    <div className="App container">
      <Navbar/>
      
      <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/create">
            <Create />
          </Route>
        </Switch>
    </div>
  );
}

export default App;
