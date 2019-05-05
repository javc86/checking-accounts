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

import * as actions from '../../../actions/clientsActions';
import Alert from '../../../components/Alert';

import styles from './styles';

class NewEditClient extends Component {
    constructor(props) {
        super(props);
        const {history} = this.props;
        const arrayPathName = history.location.pathname.split('/');
        const id = /[0-9]/.test(arrayPathName[arrayPathName.length - 1]) ?
                            arrayPathName[arrayPathName.length - 1] : null;

        this.state = {
            form: {
                id: id,
                dni: '',
                cuit: '',
                name: '',
                lastname: '',
                business_name: '',
                start_year: parseInt(moment().format('YYYY')),
                type: 0
            },
            inputErrors: {
                dni: false,
                cuit: false,
                name: false,
                lastname: false,
                business_name: false
            },
            showAlert: false
        };

        this.closeAlert = this.closeAlert.bind(this);
    }

    handleChange(e) {
        const {form, inputErrors} = this.state;
        form[e.target.name] = e.target.value;
        inputErrors[e.target.name] = e.target.value !== '' ? false : true;
        this.setState({form});
    }

    _years() {
        const actualYear = parseInt(moment().format('YYYY'));
        const arrayYears = [];

        for (let year = actualYear; year >= actualYear - 100; year--) arrayYears.push(year);

        return arrayYears;
    }

    cancel() {
        const {history} = this.props;

        this.setState({
            form: {
                dni: '',
                cuit: '',
                name: '',
                lastname: '',
                business_name: '',
                start_year: parseInt(moment().format('YYYY')),
                type: 0
            },
            inputErrors: {
                dni: false,
                cuit: false,
                name: false,
                lastname: false,
                business_name: false
            }
        });

        history.push('/');
    }

    save() {
        const {getSavedClient, saved} = this.props;
        const {form, inputErrors} = this.state;
        let formValid = true;

        if (form.dni === '' && form.type === 0) {inputErrors.dni = true; formValid = false;}
        else inputErrors.dni = false;

        if (form.cuit === '') {inputErrors.cuit = true; formValid = false;}
        else inputErrors.cuit = false;

        if (form.name === '' && form.type === 0) {inputErrors.name = true; formValid = false;}
        else inputErrors.name = false;

        if (form.lastname === '' && form.type === 0) {inputErrors.lastname = true; formValid = false;}
        else inputErrors.lastname = false;

        if (form.business_name === '' && form.type === 1) {inputErrors.business_name = true; formValid = false;}
        else inputErrors.business_name = false;

        this.setState({inputErrors});

        if (formValid) {
            getSavedClient(form, saved => {
                if (saved.result) {
                    this.setState({
                        form: {
                            dni: '',
                            cuit: '',
                            name: '',
                            lastname: '',
                            business_name: '',
                            start_year: parseInt(moment().format('YYYY')),
                            type: 0
                        },
                        inputErrors: {
                            dni: false,
                            cuit: false,
                            name: false,
                            lastname: false,
                            business_name: false
                        },
                        showAlert: true
                    });
                } else {
                    this.setState({showAlert: true});
                }
            });
        }
    }

    closeAlert() {
        this.setState({showAlert: false});
    }

    render() {
        const {form, inputErrors, showAlert} = this.state;
        const {saved} = this.props;

        return(
            <div style={styles.container}>
                <Typography variant="h5" style={styles.title}>
                    Agregar Datos del Titular
                </Typography>
                <Divider/>
                <div style={styles.form}>
                    <div style={styles.formContainer}>
                        <TextField
                            select
                            name="type"
                            label="Tipo de Titular"
                            style={styles.textField}
                            value={form.type}
                            onChange={e => this.handleChange(e)}
                            margin="normal"
                            variant="outlined"
                        >
                            <MenuItem value={0}>Natural</MenuItem>
                            <MenuItem value={1}>Jurídica</MenuItem>
                        </TextField>
                        {form.type === 0 && (
                            <TextField
                                error={form.type === 0 && inputErrors.dni}
                                name="dni"
                                label="DNI"
                                min="0"
                                style={styles.textField}
                                value={form.dni}
                                onChange={e => this.handleChange(e)}
                                margin="normal"
                                variant="outlined"
                                onInput={e => e.target.value = /[0-9]/.test(e.target.value) ? e.target.value : ''}
                                inputProps={{maxLength: 11}}
                                required={form.type === 0 ? true : false}
                            />
                        )}
                        <TextField
                            error={inputErrors.cuit}
                            name="cuit"
                            label="CUIT"
                            min="0"
                            style={styles.textField}
                            value={form.cuit}
                            onChange={e => this.handleChange(e)}
                            margin="normal"
                            variant="outlined"
                            onInput={e => e.target.value = /[0-9]/.test(e.target.value) ? e.target.value : ''}
                            inputProps={{maxLength: 11}}
                            required
                        />
                        {form.type === 0 && (
                            <TextField
                                error={form.type === 0 && inputErrors.name}
                                name="name"
                                label="Nombre"
                                min="0"
                                style={styles.textField}
                                value={form.name}
                                onChange={e => this.handleChange(e)}
                                margin="normal"
                                variant="outlined"
                                inputProps={{maxLength: 80}}
                                required={form.type === 0 ? true : false}
                            />
                        )}
                        {form.type === 0 && (
                            <TextField
                                error={form.type === 0 && inputErrors.lastname}
                                name="lastname"
                                label="Apellido"
                                style={styles.textField}
                                value={form.lastname}
                                onChange={e => this.handleChange(e)}
                                margin="normal"
                                variant="outlined"
                                inputProps={{maxLength: 255}}
                                required={form.type === 0 ? true : false}
                            />
                        )}
                        {form.type === 1 && (
                            <TextField
                                error={form.type === 1 && inputErrors.business_name}
                                name="business_name"
                                label="Razón Social"
                                style={styles.textField}
                                value={form.business_name}
                                onChange={e => this.handleChange(e)}
                                margin="normal"
                                variant="outlined"
                                inputProps={{maxLength: 100}}
                                required={form.type === 1 ? true : false}
                            />
                        )}
                        {form.type === 1 && (
                            <TextField
                                select
                                name="start_year"
                                label="Año de Inicio"
                                style={styles.textField}
                                value={form.start_year}
                                onChange={e => this.handleChange(e)}
                                margin="normal"
                                variant="outlined"
                                required={form.type === 1 ? true : false}
                            >
                                {this._years().map((year, index) => (
                                    <MenuItem key={index + '-' + year} value={year}>
                                        {year}
                                    </MenuItem>
                                ))}
                            </TextField>
                        )}
                    </div>
                </div>
                <Divider/>
                <div style={styles.btnForm}>
                    <Button variant="contained" style={styles.btnCancel} onClick={() => this.cancel()}>
                        Cancelar
                    </Button>
                    <Button variant="contained" style={styles.btnSave} onClick={() => this.save()}>
                        Guardar
                    </Button>
                </div>
                {showAlert && saved !== null && (
                    <Alert
                        text={saved.error ? saved.error : 'Titular guardado con EXITO!!'}
                        type={saved.error ? 'error' : 'success'}
                        close={this.closeAlert}
                    />
                )}
            </div>
        );
    }
}

NewEditClient.propTypes = {
    getSavedClient: PropTypes.func.isRequired
};

const mapStateToProps = state => ({saved: state.clientsState.saved});
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NewEditClient);
