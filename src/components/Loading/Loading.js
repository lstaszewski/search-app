import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    textAlign: 'center',
  },
}));

const Loading = ({ children, loading, size = 40 }) => {
  const classes = useStyles();
  const Spinner = (
    <div className={classes.root}>
      <CircularProgress size={size} />
    </div>
  );

  return loading ? Spinner : children;
};

export default Loading;
