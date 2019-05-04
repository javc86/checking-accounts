import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../../../actions/accountsActions';

import styles from './styles';

class NewEditAccount extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return(
            <h2>Nueva Cuenta</h2>
        );
    }
}

NewEditAccount.propTypes = {

};

const mapStateToProps = state => ({saved: state.accountsState.saved});
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NewEditAccount);
