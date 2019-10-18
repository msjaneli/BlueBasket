import React, { Component } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import classnames from 'classnames';

import validateRegistrationInput from '../../validation/validateRegistrationInput';

import { connect } from 'react-redux';
import { signup } from '../../actions/signup';
import isEmpty from '../../validation/isEmpty';
import '../../styles/auth.css';

const mapStateToProps = state => ({
  signupStatus: state.signupStatus,
})

const mapDispatchToProps =  dispatch => ({
  signup: (payload) => dispatch(signup(payload))
})

class SignUp extends Component {
  constructor(props){
    super(props);

    this.state={
      name: '',
      email:'',
      password:'',
      errors: {},
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {

    let errorDisplay = (this.props.signupStatus !== 'SIGNUP_SUCCESS' 
      && !isEmpty(this.props.signupStatus) 
      && isEmpty(this.state.errors)) ? <Alert variant = 'danger'> {this.props.signupStatus} </Alert> : null

    const { errors } = this.state

    return (

      <div className='col-md-3 ml-auto mr-auto'>

        <h4 className = "loginText" > Sign up </h4> 

        {errorDisplay}

        <Form noValidate className='text-left' type="hidden" value="big booling" autoComplete="off" >
          <Form.Group controlId="formBasicName">
            <Form.Control autoComplete="new-password" placeholder="Name" name = "name" onChange = {this.handleChange} className={"form-control", classnames({
              "is-invalid": errors.name,
            })}/>
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Control autoComplete="off" type="email" placeholder="Email Address" name = "email" onChange = {this.handleChange} className={"form-control", classnames({
              "is-invalid": errors.email,
            })}/>
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Control autoComplete="off" type="password" placeholder="Password" name = "password" onChange = {this.handleChange} className={"form-control", classnames({
              "is-invalid": errors.password,
            })}/>
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </Form.Group>
        </Form>

        <Button variant = "login"  onClick={() => this.validateInput()}>Sign Up</Button>

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
      name: this.state.name,
      email: this.state.email.toLowerCase(),
      password: this.state.password,
    }

    const { errors, isValid } = validateRegistrationInput(payload);

    if (!isValid) {
      this.setState({
        errors: errors
      })
      return;
    }

    await this.props.signup(payload);
    if (this.props.signupStatus === 'SIGNUP_SUCCESS') {
      this.props.goToLogin();
    }

    this.setState({
      errors: {}
    })

  }

}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
