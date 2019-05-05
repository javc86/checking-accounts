import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import _ from 'lodash';

import * as actions from '../../../actions/accountsActions';
import Alert from '../../../components/Alert';

import styles from './styles';

class NewEditAccount extends Component {
    constructor(props) {
        super(props);
        const {history} = this.props;

        this.state = {
            form: {
                client_id: '',
                number: '',
                currency: '',
                balance: ''
            },
            inputErrors: {
                client_id: false,
                number: false,
                currency: false,
                balance: false
            },
            showAlert: false
        };

        this.closeAlert = this.closeAlert.bind(this);
    }

    componentDidMount() {
        const {getClientsWithoutAccount} = this.props;
        getClientsWithoutAccount();
    }

    handleChange(e) {
        const {form, inputErrors} = this.state;
        inputErrors[e.target.name] = e.target.value !== '' ? false : true;

        if(e.target.name === 'balance') {
            const onlyNumber = e.target.value.replace('.','');
            const array = onlyNumber.split('');
            if (array.length > 2 && /^[0-9]*$/.test(onlyNumber)) {
                let newValue = '';
                for (let i = 0; i < array.length; i++) {
                    if (i === array.length - 2) newValue += '.';
                    newValue += array[i];
                }
                form[e.target.name] = newValue;
            } else if (/^[0-9]*$/.test(onlyNumber)) {
                form[e.target.name] = onlyNumber;
            }
        } else {
            form[e.target.name] = e.target.value;
        }

        this.setState({form});
    }

    back() {
        const {history} = this.props;

        this.setState({
            form: {
                client_id: '',
                number: '',
                currency: '',
                balance: ''
            },
            inputErrors: {
                client_id: false,
                number: false,
                currency: false,
                balance: false
            },
            showAlert: false
        });

        history.push('/accounts');
    }

    save() {
        const {getSavedAccount, getClientsWithoutAccount, saved} = this.props;
        const {form, inputErrors} = this.state;
        let formValid = true;

        if (form.client_id === '') {inputErrors.client_id = true; formValid = false;}
        else inputErrors.client_id = false;

        if (form.number === '') {inputErrors.number = true; formValid = false;}
        else inputErrors.number = false;

        if (form.currency === '') {inputErrors.currency = true; formValid = false;}
        else inputErrors.currency = false;

        if (form.balance === '') {inputErrors.balance = true; formValid = false;}
        else inputErrors.balance = false;

        this.setState({inputErrors});

        if (formValid) {
            getSavedAccount(form, saved => {
                if (saved.result) {
                    this.setState({
                        form: {
                            client_id: '',
                            number: '',
                            currency: '',
                            balance: ''
                        },
                        inputErrors: {
                            client_id: false,
                            number: false,
                            currency: false,
                            balance: false
                        },
                        showAlert: true
                    });
                } else {
                    this.setState({showAlert: true});
                }

                getClientsWithoutAccount();
            });
        }
    }

    closeAlert() {
        this.setState({showAlert: false});
    }

    render() {
        const {form, inputErrors, showAlert} = this.state;
        const {saved, clients} = this.props;

        return(
            <div style={styles.container}>
                <Typography variant="h5" style={styles.title}>
                    Agregar Datos del una Cuenta
                </Typography>
                <Divider/>
                <div style={styles.form}>
                    <div style={styles.formContainer}>
                        <TextField
                            error={inputErrors.client_id}
                            select
                            name="client_id"
                            label="Titular"
                            style={styles.textField}
                            value={form.client_id}
                            onChange={e => this.handleChange(e)}
                            margin="normal"
                            variant="outlined"
                            required
                        >
                            {clients.map(client => (
                                <MenuItem key={client.id} value={client.id}>
                                    {client.desc}
                                </MenuItem>
                            ))};
                        </TextField>
                        <TextField
                            error={inputErrors.number}
                            name="number"
                            label="Número de Cuenta"
                            style={styles.textField}
                            value={form.number}
                            onChange={e => this.handleChange(e)}
                            margin="normal"
                            variant="outlined"
                            onInput={e => e.target.value = /[0-9]/.test(e.target.value) ? e.target.value : ''}
                            inputProps={{maxLength: 30}}
                            required
                        />
                        <TextField
                            error={inputErrors.currency}
                            select
                            name="currency"
                            label="Moneda"
                            style={styles.textField}
                            value={form.currency}
                            onChange={e => this.handleChange(e)}
                            margin="normal"
                            variant="outlined"
                            required
                        >
                            <MenuItem value={0}>Pesos</MenuItem>
                            <MenuItem value={1}>Dolar</MenuItem>
                            <MenuItem value={2}>Euro</MenuItem>
                        </TextField>
                        <TextField
                            error={inputErrors.balance}
                            name="balance"
                            label="Saldo"
                            style={styles.textField}
                            value={form.balance}
                            onChange={e => this.handleChange(e)}
                            margin="normal"
                            variant="outlined"
                            onInput={e => e.target.value = /[0-9]/.test(e.target.value) ? e.target.value : ''}
                            inputProps={{maxLength: 11}}
                            required
                        />
                    </div>
                </div>
                <Divider/>
                <div style={styles.btnForm}>
                    <Button variant="contained" style={styles.btnCancel} onClick={() => this.back()}>
                        Regresar
                    </Button>
                    <Button variant="contained" style={styles.btnSave} onClick={() => this.save()}>
                        Guardar
                    </Button>
                </div>
                {showAlert && saved !== null && (
                    <Alert
                        text={saved.error ? saved.error : 'Cuenta guardada con EXITO!!'}
                        type={saved.error ? 'error' : 'success'}
                        close={this.closeAlert}
                    />
                )}
            </div>
        );
    }
}

NewEditAccount.propTypes = {
    getSavedAccount: PropTypes.func.isRequired,
    getClientsWithoutAccount: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    saved: state.accountsState.saved,
    clients: state.accountsState.clients
});
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NewEditAccount);
