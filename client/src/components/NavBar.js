import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

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

class NavBar extends Component{
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <AppBar position="static">
            {/*<Toolbar>*/}
            {/*  <Typography variant="h6" className={classes.title}>*/}
            {/*    News*/}
            {/*  </Typography>*/}
            {/*  <Button color="inherit">Login</Button>*/}
            {/*</Toolbar>*/}
            <ul id="nav">
              <li><a href="#">Meals</a></li>
              <li><a href="#">Donate</a></li>
              <li><a href="#">Cart</a></li>
              <li><a href="/login">Login</a></li>
            </ul>
          </AppBar>
        </MuiThemeProvider>MuiThemeProvider>
      </div>
    );
  }
}

export default NavBar;

