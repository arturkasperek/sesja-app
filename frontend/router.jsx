import React from 'react';
import { Router, Route, Redirect, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux'
import Login from './components/login.jsx';
import Dashboard from './components/dashboard.jsx';
import reducers from './redux';

export default () => {
    const store = createStore(reducers, {}, window.devToolsExtension && window.devToolsExtension());
    const history = syncHistoryWithStore(browserHistory, store);
    return (
        <Provider store={store}>
            <Router history={history}>
                <Route path="/login" component={Login} />
                <Route path="/dashboard" component={Dashboard} />
                <Redirect from="/" to="/login" />
            </Router>
        </Provider>
    );
}
