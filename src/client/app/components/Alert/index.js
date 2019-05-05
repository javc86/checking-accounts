import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import styles from './styles';

const Alert = ({text, type, close}) => (
    <div style={styles[type]}>
        <span style={styles.close} onClick={() => close()}>
            <CloseIcon fontSize="small"/>
        </span>
        <Typography variant="h6" style={styles.text}>
            {text}
        </Typography>
    </div>
);

Alert.propTypes = {
    text: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    close: PropTypes.func.isRequired
}

export default Alert;
