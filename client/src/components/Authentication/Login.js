import React, { Component } from 'react';
import '../../styles/auth.css'

// Components
import { Alert, Button, Form, Col } from 'react-bootstrap';

// Selectors
import * as authSelectors from '../../selectors/authSelectors'

// Actions
import { loginUser, loginRestaurant, loginShelter } from '../../actions/auth/login';

// Tools
import validateLoginInput from '../../validation/validateLoginInput';
import { connect } from 'react-redux';
import isEmpty from '../../validation/isEmpty';
import classnames from 'classnames';
import Lottie from 'react-lottie';
import loadingAnimationData from '../../resources/lotties/loading/10564-loading-animation.json';
import checkAnimationData from '../../resources/lotties/checks/10100-green-payment-checkmark.json';

const mapStateToProps = state => ({
  signupStatus: authSelectors.getSignupStatus(state),
  loginStatus: authSelectors.getLoginStatus(state),
  authRedirect: authSelectors.getAuthRedirect(state),
  isLoading: authSelectors.isLoading(state)
})

const mapDispatchToProps = (dispatch) => ({
  loginUser: (payload, redirectUrl) => dispatch(loginUser(payload, redirectUrl)),
  loginRestaurant: (payload, redirectUrl) => dispatch(loginRestaurant(payload, redirectUrl)),
  loginShelter: (payload, redirectUrl) => dispatch(loginShelter(payload, redirectUrl)),
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

    const animationOptionsLoading = {
        loop: true,
        autoplay: true,
        animationData: loadingAnimationData,
        renderSettings: {
          preserveAspectRatio: 'xMidYMid slice'
      }
    }

    const animationOptionsCheck = {
        loop: false,
        autoplay: true,
        animationData: checkAnimationData,
        renderSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    }

    let loadingAnimation = this.props.isLoading ? <Lottie style={{"margin-bottom": "10px"}} options = {animationOptionsLoading} width = {56}  height = {56} /> : null

    let checkAnimation = this.props.signupStatus === 'SIGNUP_SUCCESS' ? <Lottie style = {{"margin-bottom": "9px", "margin-top": "-6px"}} options = {animationOptionsCheck} width = {38} height = {38} /> : null

    let signupSuccessMessage = this.props.signupStatus === 'SIGNUP_SUCCESS' ? <Alert className = "signUpSuccessAlert" variant = 'success'>You signed up! Login below</Alert> : null

    let loginErrorMessage = (!isEmpty(this.props.loginStatus) && isEmpty(this.state.errors)) ?  <Alert className = "loginErrorAlert" variant = 'danger'>{this.props.loginStatus}</Alert> : null

    let loginButtonText = this.props.isLoading ? "Loading..." : "Log in"

    const { errors } = this.state;

    return (
        <Col md={10} className = 'ml-auto mr-auto'>

          <h4 className = "loginText" > {this.props.loginHeader} </h4>

          { loadingAnimation }

          { signupSuccessMessage }

          { checkAnimation }

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

          <Button disabled = {this.props.isLoading} variant = "login"  onClick={() => this.validateInput()}>{loginButtonText}</Button>

          <style type="text/css">
              {`
                .btn-login {
                  background-color: cornflowerblue;
                  color: white;
                  font-weight: bold;
                }

                .btn-login:hover {
                  color: white;
                  background-color: #5288e7
                }
              `}
          </style>
        </Col>
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

    this.setState({
      errors: {}
    })

    if (this.props.type === "USER") {
      await this.props.loginUser(payload, this.props.authRedirect);
    } else if (this.props.type === "SHELTER"){
      await this.props.loginUser(payload, this.props.isShelter);
    }else {
      await this.props.loginRestaurant(payload, this.props.authRedirect);
    }

  }


}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
