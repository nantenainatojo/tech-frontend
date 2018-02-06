import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import ListComponent from './survey-list/list-component.js';
import DetailComponent from './survey-details/details-component.js';

class App extends Component {
  render() {
    return (
        <Switch>
          <Route exact path="/" component={ListComponent}/>
          <Route path="/details/:id/:name" component={DetailComponent}/>
        </Switch>
    );
  }
}

export default App;
