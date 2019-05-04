import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../../actions/accountsActions';

import styles from './styles';

class DetailsClient extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return(
            <h2>Detalles de Titular</h2>
        );
    }
}

DetailsClient.propTypes = {

};

const mapStateToProps = state => ({details: state.clientsState.details});
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DetailsClient);
