import React from 'react';
import { Router, Route, Redirect, hashHistory } from 'react-router';
import Login from './components/login.jsx';
import Dashboard from './components/dashboard.jsx';

export default () => {
    return (
      <Router history={hashHistory}>
          <Route path="/login" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Redirect from="/" to="/login" />
      </Router>
    );
}
