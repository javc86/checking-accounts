import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import {Link} from 'react-router-dom';

import DataTable from '../../components/DataTable';
import Alert from '../../components/Alert';
import styles from './styles';
import * as actions from '../../actions/clientsActions';

class Clients extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showAlert: false
        }

        this.deleteClient = this.deleteClient.bind(this);
        this.closeAlert = this.closeAlert.bind(this);
    }

    componentDidMount() {
        const {getClients} = this.props;
        getClients();
    }

    getListFields() {
        return [
            {name: 'id', desc: 'ID'},
            {name: 'dniCuit', desc: 'DNI / CUIT'},
            {name: 'nombreRazonSocialAnioInicio', desc: 'NOMBRE / RAZÓN SOCIAL / AÑO DE INICIO'},
            {name: 'tipo', desc: 'TIPO DE TITULAR'}
        ];
    }

    closeAlert() {
        const {getClients} = this.props;
        this.setState({showAlert: false});
        getClients();
    }

    deleteClient(event, id) {
        const {getDeleteClient} = this.props;
        getDeleteClient(id, () => {
            this.setState({showAlert: true});
        });
    }

    render(){
        const {showAlert} = this.state;
        const {clients, history, deleted} = this.props;
        if(deleted !== null) console.log(deleted);

        return(
            <div>
                <Button variant="contained" style={styles.btn} onClick={() => history.push('/clients/new')}>
                    <AddIcon style={styles.icon}/>
                    Agregar Titular
                </Button>
                <Divider/>
                <DataTable
                    fields={this.getListFields()}
                    rows={clients !== null ? clients : []}
                    deleteData={this.deleteClient}
                    module="clients"
                />
                {showAlert && deleted !== null && (
                    <Alert
                        text={deleted.error ? deleted.error : 'Titular eliminado con EXITO!!'}
                        type={deleted.error ? 'error' : 'success'}
                        close={this.closeAlert}
                    />
                )}
            </div>
        );
    }
}

Clients.propTypes = {
    getClients: PropTypes.func.isRequired,
    getDeleteClient: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    clients: state.clientsState.list,
    deleted: state.clientsState.deleted
});
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Clients);
