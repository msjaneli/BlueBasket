import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import validateLoginInput from '../validation/validateLoginInput';

import { connect } from 'react-redux';
import { loginActionUser } from '../actions/loginAction';

const mapStateToProps = state => ({
  authentication: state.authentication,
})

const mapDispatchToProps = dispatch => ({
  testAction: (payload) => dispatch(loginActionUser(payload))
})

class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      email:'',
      password:'',
      errors: {}
    }
  }

  render() {

    let failureText;

    if (this.props.authentication === 'FAILURE') {
      // Needs to be changed to something more pleasing
      failureText = <p>WRONG EMAIL OR PASSWORD</p>
    } else {
      failureText = null;
    }

    return (
      <div>
        <MuiThemeProvider>
          <div>
            <TextField
              hintText="Enter your Email"
              floatingLabelText="Email"
              onChange = {(event,newValue) => this.setState({email:newValue})}
            />
            <br/>
            <TextField
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              onChange = {(event,newValue) => this.setState({password:newValue})}
            />
            <br/>
            <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.validateInput(event)}/>
          </div>
        </MuiThemeProvider>
        {failureText}
      </div>
    );
  }

  validateInput= (event) => {
    event.preventDefault();

    var payload = {
      email: this.state.email,
      password: this.state.password
    }

    const { errors, isValid } = validateLoginInput(payload);

    if (!isValid) {
      this.setState({errors: errors});
      console.log(errors);
      // Will need the text boxes to turn red if any of these errors occur
      return;
    }

    this.props.testAction(payload);

  }


}
const style = {
  margin: 15,
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
