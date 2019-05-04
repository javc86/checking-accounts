import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../../actions/accountsActions';

import styles from './styles';

class Accounts extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return(
            <h2>Lista de Cuentas</h2>
        );
    }
}

Accounts.propTypes = {

};

const mapStateToProps = state => ({accounts: state.accountsState.list});
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Accounts);
