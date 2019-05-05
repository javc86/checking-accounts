import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import * as actions from '../../../actions/accountsActions';
import styles from './styles';

class DetailsAccount extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {history} = this.props;
        const arrayPathName = history.location.pathname.split('/');
        const id = arrayPathName[arrayPathName.length - 1];

        const {getDetailAccount} = this.props;
        getDetailAccount(id);
    }

    back() {
        const {history} = this.props;
        history.push('/accounts');
    }

    render() {
        const {details} = this.props;
        if(details !== null) console.log('details', details);
        return(
            <div style={styles.container}>
                <Typography variant="h5" style={styles.title}>
                    Detalle del Titular
                </Typography>
                <Divider/>
                <div style={styles.details}>
                    <div style={styles.detailsContainer}>
                        <div style={styles.row}>
                            <Typography variant="h6" style={styles.th}>
                                ID:
                            </Typography>
                            <Typography variant="h6" style={styles.td}>
                                {details !== null && details.account.id}
                            </Typography>
                        </div>
                        <Divider/>
                        <div style={styles.row}>
                            <Typography variant="h6" style={styles.th}>
                                DNI/CUIT:
                            </Typography>
                            <Typography variant="h6" style={styles.td}>
                                {details !== null && details.account.dniCuit}
                            </Typography>
                        </div>
                        <Divider/>
                        <div style={styles.row}>
                            <Typography variant="h6" style={styles.th}>
                                Titular:
                            </Typography>
                            <Typography variant="h6" style={styles.td}>
                                {details !== null && details.account.desc}
                            </Typography>
                        </div>
                        <Divider/>
                        <div style={styles.row}>
                            <Typography variant="h6" style={styles.th}>
                                N° Cuenta:
                            </Typography>
                            <Typography variant="h6" style={styles.td}>
                                {details !== null && details.account.number}
                            </Typography>
                        </div>
                        <Divider/>
                        <div style={styles.row}>
                            <Typography variant="h6" style={styles.th}>
                                Moneda:
                            </Typography>
                            <Typography variant="h6" style={styles.td}>
                                {details !== null && details.account.currency}
                            </Typography>
                        </div>
                        <Divider/>
                        <div style={styles.row}>
                            <Typography variant="h6" style={styles.th}>
                                Saldo:
                            </Typography>
                            <Typography variant="h6" style={styles.td}>
                                {details !== null && details.account.balance}
                            </Typography>
                        </div>
                    </div>
                </div>
                <Divider/>
                <div style={styles.btnForm}>
                    <Button variant="contained" style={styles.btnCancel} onClick={() => this.back()}>
                        Regresar
                    </Button>
                </div>
            </div>
        );
    }
}

DetailsAccount.propTypes = {
    getDetailAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({details: state.accountsState.details});
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DetailsAccount);
