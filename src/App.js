import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
  Redirect,
} from "react-router-dom";
import './App.css';
import About from './pages/About';
import Search from './pages/Search';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const defaultPath = '/search/1';
const routes = [
  {
    path: '/search/',
    exact: false,
    component: Search,
    params: ':page(\\d+)',
  },
  {
    path: '/about/',
    exact: false,
    component: About,
    params: '',
  },
];

const Routes = routes.map(route => (
  <Route
    key={route.path}
    path={`${route.path}${route.params}`}
    exact={route.exact}
    component={route.component}
  />
));

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  menuLink: {
    color: 'unset',
    textDecoration: 'unset',
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();
  return (
    <Router>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              SEARCH-APP
            </Typography>
            <NavLink to={defaultPath} className={classes.menuLink}>
              <Button color="inherit">Search</Button>
            </NavLink>
            <NavLink to="/about/" className={classes.menuLink}>
              <Button color="inherit">About us</Button>
            </NavLink>
          </Toolbar>
        </AppBar>
      </div>
      <Switch>
        {Routes}
        <Route render={() => <Redirect to={defaultPath} />}/>
      </Switch>
    </Router>
  );
}

export default App;
