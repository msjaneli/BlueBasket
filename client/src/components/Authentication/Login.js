import React, { Component } from 'react';
import '../../styles/auth.css'

// Components
import { Alert, Button, Form } from 'react-bootstrap';
import validateLoginInput from '../../validation/validateLoginInput';

// Selectors
import * as authSelectors from '../../selectors/authSelectors'

// Actions
import { loginUser } from '../../actions/login';

// Tools
import { connect } from 'react-redux';
import isEmpty from '../../validation/isEmpty';
import classnames from 'classnames';

const mapStateToProps = state => ({
  signupStatus: authSelectors.getSignupStatus(state),
  loginStatus: authSelectors.getLoginStatus(state),
  authRedirect: authSelectors.getAuthRedirect(state),
})

const mapDispatchToProps = (dispatch) => ({
  loginUser: (payload, redirectUrl) => dispatch(loginUser(payload, redirectUrl))
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

        <h4 className = "loginText" > {this.props.loginHeader} </h4> 

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

    if (this.props.isUser) {
      await this.props.loginUser(payload, this.props.authRedirect);
    } else {
      // login restaurant
    }

    this.setState({
      errors: {}
    })
  }


}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
