import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import DataTable from '../../components/DataTable';
import Alert from '../../components/Alert';
import * as actions from '../../actions/accountsActions';

import styles from './styles';

class Accounts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showAlert: false
        };

        this.deleteAccount = this.deleteAccount.bind(this);
        this.closeAlert = this.closeAlert.bind(this);
    }

    componentDidMount() {
        const {getAccounts} = this.props;
        getAccounts();
    }

    getListFields() {
        return [
            {name: 'id', desc: 'ID'},
            {name: 'client', desc: 'TITULAR'},
            {name: 'number', desc: 'NÚMERO DE CUENTA'},
            {name: 'currency', desc: 'MONEDA'},
            {name: 'balance', desc: 'SALDO'}
        ];
    }

    closeAlert() {
        const {getAccounts} = this.props;
        this.setState({showAlert: false});
        getAccounts();
    }

    deleteAccount(event, id) {
        const {getDeleteAccount} = this.props;
        getDeleteAccount(id, () => {
            this.setState({showAlert: true});
        });
    }

    render(){
        const {showAlert} = this.state;
        const {accounts, history, deleted} = this.props;

        return(
            <div>
                <Button variant="contained" style={styles.btn} onClick={() => history.push('/cuentas/new')}>
                    <AddIcon style={styles.icon}/>
                    Crear Cuenta
                </Button>
                <Divider/>
                <DataTable
                    fields={this.getListFields()}
                    rows={accounts !== null ? accounts : []}
                    deleteData={this.deleteAccount}
                    module="cuentas"
                    actions={{'view': true, 'delete': true}}
                />
                {showAlert && deleted !== null && (
                    <Alert
                        text={deleted.error ? deleted.error : 'Cuenta eliminada con EXITO!!'}
                        type={deleted.error ? 'error' : 'success'}
                        close={this.closeAlert}
                    />
                )}
            </div>
        );
    }
}

Accounts.propTypes = {
    getAccounts: PropTypes.func.isRequired,
    getDeleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    accounts: state.accountsState.list,
    deleted: state.accountsState.deleted
});
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Accounts);
