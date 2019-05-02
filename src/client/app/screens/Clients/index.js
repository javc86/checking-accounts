import React, {Component} from 'react';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import Header from '../../components/Header';
import SideBar from '../../components/SideBar';
import DataTable from '../../components/DataTable';
import styles from './styles';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            openSideBar: false,
            clients: {
                fields: [
                    {name: 'id', desc: 'Id'},
                    {name: 'dni', desc: 'DNI'},
                    {name: 'name', desc: 'Nombre'},
                    {name: 'lastname', desc: 'Apellido'},
                    {name: 'number', desc: 'Número de Cuenta'},
                    {name: 'currency', desc: 'Moneda'},
                    {name: 'balance', desc: 'Saldo'}
                ],
                rows: [
                    {
                        id: 1,
                        dni: 1651561,
                        name: 'José',
                        lastname: 'Alvares',
                        number: 25264514585949,
                        currency: 'Pesos',
                        balance: 700.00

                    },
                    {
                        id: 2,
                        dni: 963698,
                        name: 'Manuel',
                        lastname: 'Rodriguez',
                        number: 778996589,
                        currency: 'U$S',
                        balance: 1500.00

                    },
                    {
                        id: 3,
                        dni: 4055928,
                        name: 'Natalia',
                        lastname: 'Rengifo',
                        number: 336554456985,
                        currency: 'Euros',
                        balance: 300.00

                    },
                    {
                        id: 4,
                        dni: 1323232,
                        name: 'Analie',
                        lastname: 'Richard',
                        number: 4455588223,
                        currency: 'Pesos',
                        balance: 20000.00

                    }
                ]
            }
        }

        this.setSideBarOpen = this.setSideBarOpen.bind(this);
    }

    setSideBarOpen(event, openSideBar) {
        this.setState({openSideBar});
    }

    render(){
        const {openSideBar, clients} = this.state;
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
                <DataTable fields={clients.fields} rows={clients.rows}/>
                <SideBar openSideBar={openSideBar} setSideBarOpen={this.setSideBarOpen}/>
            </div>
        );
    }
}

export default Home;
