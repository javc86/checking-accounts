import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import Header from '../../components/Header';
import SideBar from '../../components/SideBar';
import DataTable from '../../components/DataTable';
import styles from './styles';
import * as actions from '../../actions/clientsActions';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            openSideBar: false
        }

        this.setSideBarOpen = this.setSideBarOpen.bind(this);
    }

    componentDidMount() {
        const {getClients} = this.props;
        getClients();
    }

    setSideBarOpen(event, openSideBar) {
        this.setState({openSideBar});
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
        const {openSideBar} = this.state;
        const {clients} = this.props;

        return(
            <div>
                <Header title="Titulares" setSideBarOpen={this.setSideBarOpen}/>
                <div style={styles.content}>
                    <Button variant="contained" style={styles.btn}>
                        <AddIcon style={styles.icon}/>
                        Agregar Titular
                    </Button>
                    <Divider/>
                </div>
                <DataTable fields={this.getListFields()} rows={clients}/>
                <SideBar openSideBar={openSideBar} setSideBarOpen={this.setSideBarOpen}/>
            </div>
        );
    }
}

Home.propTypes = {
    getClients: PropTypes.func.isRequired
};

const mapStateToProps = state => ({clients: state.clientsState.list});
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
