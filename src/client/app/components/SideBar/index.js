import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountBox from '@material-ui/icons/AccountBox';
import AccountBalance from '@material-ui/icons/AccountBalance';

import styles from './styles';

const SideBar = ({openSideBar, setSideBarOpen}) => (
    <SwipeableDrawer
        anchor="right"
        open={openSideBar}
        onClose={e => setSideBarOpen(e, false)}
        onOpen={e => setSideBarOpen(e, true)}
    >
        <div className={styles.fullList}>
            <List>
                <Link to="/" onClick={e => setSideBarOpen(e, false)} style={styles.item}>
                    <ListItem button>
                        <ListItemIcon>
                            <AccountBox/>
                        </ListItemIcon>
                        <ListItemText primary="Titulares" />
                    </ListItem>
                </Link>
            </List>
            <Divider/>
            <List>
                <Link to="/accounts" onClick={e => setSideBarOpen(e, false)} style={styles.item}>
                    <ListItem button>
                        <ListItemIcon>
                            <AccountBalance/>
                        </ListItemIcon>
                        <ListItemText primary="Cuentas Corrientes" />
                    </ListItem>
                </Link>
            </List>
        </div>
    </SwipeableDrawer>
);

SideBar.propTypes = {
    openSideBar: PropTypes.bool,
    setSideBarOpen: PropTypes.func
}

export default SideBar;
