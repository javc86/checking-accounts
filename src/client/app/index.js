import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {Route, Switch} from 'react-router';
import {ConnectedRouter} from 'connected-react-router';

import Clients from './screens/Clients';

import configureStore, {history} from './store/configureStore';

const store = configureStore({});

export default () => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <>
                <Switch>
                    <Route path="/" component={Clients}/>
                </Switch>
            </>
        </ConnectedRouter>
    </Provider>
);
