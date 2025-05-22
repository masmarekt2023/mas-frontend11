import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, Box } from '@mui/material';
import { withStyles } from '@mui/styles';

const styles = () => ({
  circularProgress: {
    color: 'rgb(195, 0, 209)',
  },
});

function ButtonCircularProgress(props) {
  const { size, classes } = props;
  return (
    <Box color='secondary.main' pl={1.5} display='flex'>
      <CircularProgress
        size={size || 24}
        thickness={size ? (size / 5) * 24 : 5}
        className={classes.circularProgress}
      />
    </Box>
  );
}

ButtonCircularProgress.propTypes = {
  size: PropTypes.number,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ButtonCircularProgress);

