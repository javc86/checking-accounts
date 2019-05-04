import React, {Component} from 'react';
import {Route, Switch} from 'react-router';
import {history} from 'connected-react-router';
import { withRouter } from "react-router-dom";

import Header from './components/Header';
import SideBar from './components/SideBar';
import Clients from './screens/Clients';
import NewEditClient from './screens/Clients/NewEdit';
import Accounts from './screens/Accounts';
import NewEditAccount from './screens/Accounts/NewEdit';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            openSideBar: false
        }

        this.setSideBarOpen = this.setSideBarOpen.bind(this);
    }

    setSideBarOpen(event, openSideBar) {
        this.setState({openSideBar});
    }

    setTitleHeader(pathname) {
        const titles = {
            '/': 'Lista de Titulares',
            '/clients/new': 'Nuevo Cliente',
            '/accounts': 'Lista de Cuentas',
            '/accounts/new': 'Nueva Cuenta'
        };

        return titles[pathname];
    }

    render() {
        const {openSideBar} = this.state;
        const {location} = this.props;

        return (
            <div style={{paddingTop: 80}}>
                <Header title={this.setTitleHeader(location.pathname)} setSideBarOpen={this.setSideBarOpen}/>
                <Switch>
                    <Route exact path="/" component={Clients}/>
                    <Route path="/clients/new" component={NewEditClient}/>
                    <Route path="/accounts" component={Accounts}/>
                    <Route path="/accounts/new" component={NewEditAccount}/>
                </Switch>
                <SideBar openSideBar={openSideBar} setSideBarOpen={this.setSideBarOpen}/>
            </div>
        );
    }
}

export default withRouter(App);
