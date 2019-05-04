import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../../../actions/clientsActions';

import styles from './styles';

class NewEditClient extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return(
            <h2>Nuevo Titular</h2>
        );
    }
}

NewEditClient.propTypes = {

};

const mapStateToProps = state => ({saved: state.clientsState.saved});
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NewEditClient);
