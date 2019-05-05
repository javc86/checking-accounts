import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import {Link} from 'react-router-dom';

import DataTable from '../../components/DataTable';
import styles from './styles';
import * as actions from '../../actions/clientsActions';

class Clients extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {getClients, clients} = this.props;
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

    render(){
        const {clients, history} = this.props;

        return(
            <div>
                <Button variant="contained" style={styles.btn} onClick={() => history.push('/clients/new')}>
                    <AddIcon style={styles.icon}/>
                    Agregar Titular
                </Button>
                <Divider/>
                <DataTable fields={this.getListFields()} rows={clients}/>
            </div>
        );
    }
}

Clients.propTypes = {
    getClients: PropTypes.func.isRequired
};

const mapStateToProps = state => ({clients: state.clientsState.list});
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Clients);
