import React, { Component } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import OnRoute from './OnRoute';
//pages
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Task } from './pages/Task';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <OnRoute exact={true} path={'/'} component={Login} />
          <OnRoute path="/dashboard" component={Dashboard} />
          <OnRoute path="/task/:id" component={Task} />
        </Switch>
      </Router>
    )
  }
}

export default App;
