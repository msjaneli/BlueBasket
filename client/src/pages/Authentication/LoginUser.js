import React, { Component } from 'react';

// Components
import { Button, Card, Col, Row } from 'react-bootstrap';
import FacebookLogin from '../../components/Authentication/Facebook';
import '../../styles/auth.css';

// Actions
import Login from '../../components/Authentication/Login';
import SignUp from '../../components/Authentication/SignUp';
import { setAuthRedirect } from '../../actions/setRedirect'
import { resetAuthStatus } from '../../actions/resetStatus';

// Selectors
import * as authSelectors from '../../selectors/authSelectors'
import * as sessionSelectors from '../../selectors/sessionSelectors'

// Tools 
import isEmpty from '../../validation/isEmpty';
import { connect } from 'react-redux';
import Lottie from 'react-lottie';
import foodAnimationData from '../../resources/lotties/food/4762-food-carousel.json'

const mapStateToProps = state => ({
  signupStatus: authSelectors.getSignupStatus(state),
  user: sessionSelectors.getUser(state),
  authenticated: sessionSelectors.isAuthenticated(state),
})

const mapDispatchToProps = dispatch => ({
  setAuthRedirect: redirectUrl => dispatch(setAuthRedirect(redirectUrl)),
  resetAuthStatus: () => dispatch(resetAuthStatus()),
})

class LoginScreen extends Component {

  constructor(props){
    super(props);
    this.state={
      username:'',
      password:'',
      loginscreen:[],
      questionLabel: 'Don\'t have an account?', 
      buttonLabel:'Sign up',
      isLogin:true
    }
  }

  handleClick = () => {
    this.props.resetAuthStatus();
    if(this.state.isLogin){
      var loginscreen=[];
      loginscreen.push(<SignUp parentContext={this} goToLogin={this.goToLogin}/>);
      this.setState({
        loginscreen:loginscreen,
        questionLabel: 'Already have an account?',
        buttonLabel:"Login",
        isLogin:false
      })
    }
    else{
      var loginscreen=[];
      loginscreen.push(<Login parentContext={this} loginHeader="Login to continue" isUser={true}/>);
      this.setState({
        loginscreen:loginscreen,
        questionLabel: 'Don\'t have an account?', 
        buttonLabel:"Sign Up",
        isLogin:true
      })
    }
  }

  goToLogin = () => {
    var loginscreen=[];
      loginscreen.push(<Login parentContext={this} loginHeader="Login to continue" isUser={true}/>);
      this.setState({
        loginscreen:loginscreen,
        questionLabel: 'Don\'t have an account?', 
        buttonLabel:"Sign Up",
        isLogin:true
      })
  }

  setRedirectUrl = () => {
    var redirectData = this.props.location.state;
    var redirectUrl = "/profile/user";
    if(!isEmpty(redirectData)) {
      redirectUrl = redirectData.from.pathname
    }
    this.props.setAuthRedirect(redirectUrl);
  }

  componentDidMount = () => {
    var loginscreen=[];
    this.setRedirectUrl();
    loginscreen.push(<Login parentContext={this} appContext={this.props.parentContext} loginHeader="Login to continue" isUser={true}/>);
    this.setState({
      loginscreen:loginscreen,
    })
  }

  render = () => {

    const animationOptionsFood = {
      loop: true,
      autoplay: true,
      animationData: foodAnimationData,
        preserveAspectRatio: 'xMidYMid slice'
    }

      return (
        <div className = "authContainer" >
          <Row className ="justify-content-center">
            <Card className = "shadow-lg p-3 mb-5 bg-white rounded" style = {{width: '55rem', marginTop: "5rem", marginBottom: "5rem"}}>
                <Card.Body>
                  <Row>
                    <Col md={5} className = "mt-auto mb-auto loginSplash" style ={{borderRight: '0.5px solid lightgray'}}>
                        <a id = "logo" href ="/" style = {{'margin-top': '40px'}}>
                          <div id="blue-logo">Blue</div>
                          <div id="basket-logo">Basket</div>
                        </a>
                        <Lottie style = {{marginTop: '1.5rem'}} options = {animationOptionsFood} width = {200} height = {200} />
                    </Col>
                    <Col md={7}>
                    {this.state.loginscreen}
                    <Col md={10} className = 'ml-auto mr-auto'>
                      <div className = "row">
                        <div className = "col-4">
                            <hr/>
                          </div>
                          <div className = "col-4">
                            <p className = "continue">or continue with</p>
                          </div>
                          <div className = "col-4">
                            <hr/>
                          </div>
                      </div>
                        <FacebookLogin />
                        <p className = "switchText">{this.state.questionLabel}<Button variant = "authLink" className="changeAuthMode" onClick={() => this.handleClick()}> { this.state.buttonLabel } </Button> </p>  
            
                        <style type="text/css">
                        {`
                          .btn-authLink {
                            font-weight: bold;
                            text-decoration: none;
                            font-size: 15px;
                            color: cornflowerblue;
                            border: white;
                            border-decoration: none;
                          }
            
                          .btn:focus,.btn:active {
                            outline: none !important;
                            box-shadow: none;
                          }
            
                          .btn-authLink:hover {
                            color: cornflowerblue;
                          }
                        `}
                    </style>             
                    </Col>
                    </Col>
                  </Row>
                </Card.Body>
            </Card>
          </Row>
        </div>
      );
    }

  }
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
