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
        history.push('/');
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
                                {details !== null && details.id}
                            </Typography>
                        </div>
                        <Divider/>
                        <div style={styles.row}>
                            <Typography variant="h6" style={styles.th}>
                                Tipo de Titular:
                            </Typography>
                            <Typography variant="h6" style={styles.td}>
                                {details !== null ? details.type === 0 ? 'Natural' : 'Jurídico' : null}
                            </Typography>
                        </div>
                        <Divider/>
                        <div style={styles.row}>
                            <Typography variant="h6" style={styles.th}>
                                CUIT:
                            </Typography>
                            <Typography variant="h6" style={styles.td}>
                                {details !== null ? details.cuit : null}
                            </Typography>
                        </div>
                        {details !== null && details.type === 0 && (
                            <div>
                                <Divider/>
                                <div style={styles.row}>
                                    <Typography variant="h6" style={styles.th}>
                                        DNI:
                                    </Typography>
                                    <Typography variant="h6" style={styles.td}>
                                        {details.dni}
                                    </Typography>
                                </div>
                            </div>
                        )}
                        {details !== null && details.type === 0 && (
                            <div>
                                <Divider/>
                                <div style={styles.row}>
                                    <Typography variant="h6" style={styles.th}>
                                        Nombre/Apellido:
                                    </Typography>
                                    <Typography variant="h6" style={styles.td}>
                                        {details.name + ' ' + details.lastname}
                                    </Typography>
                                </div>
                            </div>
                        )}
                        {details !== null && details.type === 1 && (
                            <div>
                                <Divider/>
                                <div style={styles.row}>
                                    <Typography variant="h6" style={styles.th}>
                                        Razón Social:
                                    </Typography>
                                    <Typography variant="h6" style={styles.td}>
                                        {details.business_name}
                                    </Typography>
                                </div>
                            </div>
                        )}
                        {details !== null && details.type === 1 && (
                            <div>
                                <Divider/>
                                <div style={styles.row}>
                                    <Typography variant="h6" style={styles.th}>
                                        Año de Inicio:
                                    </Typography>
                                    <Typography variant="h6" style={styles.td}>
                                        {details.start_year}
                                    </Typography>
                                </div>
                            </div>
                        )}
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
