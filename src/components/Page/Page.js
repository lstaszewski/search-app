import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
}));

const Page =({ children, title }) => {
  const classes = useStyles();

  return (
  <React.Fragment>
    <CssBaseline />
    <Container style={{ marginTop: 20 }}maxWidth="lg">
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          {title}
        </Typography>
        {children}
      </Paper>
    </Container>
  </React.Fragment>
  );
};

export default Page;
