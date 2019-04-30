import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {Router, Route, browserHistory} from 'react-router';

import Home from './screens/Home';

import configureStore from './store/configureStore';

const store = configureStore({});

export default () => (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={Home}/>
        </Router>
    </Provider>
);
