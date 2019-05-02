import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import styles from './styles';

const Header = ({title, setSideBarOpen}) => {
    return (
        <div style={styles.root}>
            <AppBar position="static" color="primary" position="fixed">
                <Toolbar>
                    <div onClick={e => setSideBarOpen(e, true)}>
                        <IconButton
                            style={styles.menuButton}
                            color="inherit"
                            aria-label="Menu"
                        >
                            <MenuIcon/>
                        </IconButton>
                    </div>
                    <Typography variant="h6" color="inherit">
                        {title}
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

Header.propTypes = {
    title: PropTypes.string,
    setSideBarOpen: PropTypes.func
};

export default Header;
