import React, {Component} from 'react';
import {Route, Switch} from 'react-router';
import {history} from 'connected-react-router';
import {withRouter} from "react-router-dom";

import Header from './components/Header';
import SideBar from './components/SideBar';
import Clients from './screens/Clients';
import NewEditClient from './screens/Clients/NewEdit';
import Accounts from './screens/Accounts';
import NewEditAccount from './screens/Accounts/NewEdit';
import DetailsClient from './screens/Clients/Details';
import DetailsAccount from './screens/Accounts/Details';

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
            '/clients/new': 'Nuevo Titular',
            '/clients/edit': 'Editar Titular',
            '/clients/details': 'Información de Titular',
            '/accounts': 'Lista de Cuentas',
            '/cuentas/new': 'Nueva Cuenta',
            '/cuentas/details': 'Detalles de Cuenta',
        };

        let newPath = pathname;
        const arrayPath = pathname.split('/')
        if(arrayPath.length > 3 && (pathname.indexOf('edit') > -1 || pathname.indexOf('details') > -1)) {
            arrayPath.splice(arrayPath.length - 1);
            newPath = arrayPath.join('/');
        }

        return titles[newPath];
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
                    <Route path="/clients/edit/:id" component={NewEditClient}/>
                    <Route path="/clients/details/:id" component={DetailsClient}/>
                    <Route path="/accounts" component={Accounts}/>
                    <Route path="/cuentas/new" component={NewEditAccount}/>
                    <Route path="/cuentas/details/:id" component={DetailsAccount}/>
                </Switch>
                <SideBar openSideBar={openSideBar} setSideBarOpen={this.setSideBarOpen}/>
            </div>
        );
    }
}

export default withRouter(App);
