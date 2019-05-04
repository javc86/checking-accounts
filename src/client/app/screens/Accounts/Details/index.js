import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../../actions/accountsActions';

import styles from './styles';

class DetailsAccount extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return(
            <h2>Detalles de Cuenta</h2>
        );
    }
}

DetailsAccount.propTypes = {

};

const mapStateToProps = state => ({details: state.accountsState.details});
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DetailsAccount);
