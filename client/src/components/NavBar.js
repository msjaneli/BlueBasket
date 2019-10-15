import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <MuiThemeProvider>
        <AppBar position="static">
          <Toolbar>
            <Button href="/">Blue Basket</Button>
            <Button href="/meals">Meals</Button>
            <Button href="/donate">Donate</Button>
            <Button color="inherit" href="/login">Login</Button>
          </Toolbar>
        </AppBar>
      </MuiThemeProvider>
    </div>
  );
}


