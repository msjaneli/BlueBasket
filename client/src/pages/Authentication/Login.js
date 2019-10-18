import React, { Component } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import validateLoginInput from '../../validation/validateLoginInput';
import isEmpty from '../../validation/isEmpty';
import classnames from 'classnames';

import { connect } from 'react-redux';
import { loginUser } from '../../actions/login';
import '../../styles/auth.css'

const mapStateToProps = state => ({
  signupStatus: state.signupStatus,
  loginStatus: state.loginStatus,
  authRedirect: state.authRedirect,
})

const mapDispatchToProps = (dispatch) => ({
  login: (payload, redirectUrl) => dispatch(loginUser(payload, redirectUrl))
})

class Login extends Component {
  constructor(props){
    super(props);

    this.state={
      email:'',
      password:'',
      errors: {},
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {

    let signupSuccessMessage = this.props.signupStatus === 'SIGNUP_SUCCESS' ? <Alert className = "signUpSuccessAlert" variant = 'success'>Thank you for signing up! Login in below</Alert> : null

    let loginErrorMessage = (!isEmpty(this.props.loginStatus) && isEmpty(this.state.errors)) ?  <Alert className = "loginErrorAlert" variant = 'danger'>{this.props.loginStatus}</Alert> : null

    const { errors } = this.state;

    return (
      <div className='col-md-3 ml-auto mr-auto'>

        <h4 className = "loginText" > Login to continue </h4> 

        { signupSuccessMessage }

        { loginErrorMessage }

        <Form noValidate className='text-left' >
          <Form.Group controlId="formBasicEmail">
            <Form.Control autoComplete="off" type="email" placeholder="Email Address" name = "email" onChange = {this.handleChange} className={"form-control", classnames({
              "is-invalid": errors.email,
            })}/>
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Control type="password" placeholder="Password" name = "password" onChange = {this.handleChange} className={"form-control", classnames({
              "is-invalid": errors.password,
            })}/>
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </Form.Group>
        </Form>

        <Button variant = "login"  onClick={() => this.validateInput()}>Log in</Button>

        <style type="text/css">
            {`
              .btn-login {
                background-color: cornflowerblue;
                color: white;
                font-weight: bold;
              }

              .btn-login:hover {
                color: white;
              }
            `}
        </style>

      </div>
    );
  }

  validateInput = async () => {
      
    var payload = {
      email: this.state.email,
      password: this.state.password
    }

    const { errors, isValid } = validateLoginInput(payload);

    if (!isValid) {
      this.setState({
        errors: errors
      });
      return;
    }
    await this.props.login(payload, this.props.authRedirect);

    this.setState({
      errors: {}
    })
  }


}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
