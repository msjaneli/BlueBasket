import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Login from './Login';
import SignUp from './SignUp';
import FacebookLogin from '../../components/Facebook';
import isEmpty from '../../validation/isEmpty';
import { connect } from 'react-redux';
import { setAuthRedirect } from '../../actions/setRedirect'
import { resetAuthStatus } from '../../actions/resetStatus';
import chooseNavbar from '../../components/NavBar/chooseNavBar'
import '../../styles/auth.css';

const mapStateToProps = state => ({
  redirectUrl: state.router.location.pathname,
  signupStatus: state.signupStatus,
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
      loginscreen.push(<Login parentContext={this}/>);
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
      loginscreen.push(<Login parentContext={this}/>);
      this.setState({
        loginscreen:loginscreen,
        questionLabel: 'Don\'t have an account?', 
        buttonLabel:"Sign Up",
        isLogin:true
      })
  }

  setRedirectUrl = () => {
    var redirectData = this.props.location.state;
    var redirectUrl = "/profile";
    if(!isEmpty(redirectData)) {
      redirectUrl = redirectData.from.pathname
    }
    this.props.setAuthRedirect(redirectUrl);
  }

  componentDidMount = () => {
    var loginscreen=[];
    this.setRedirectUrl();
    loginscreen.push(<Login parentContext={this} appContext={this.props.parentContext} redirectUrl = {this.props.redirectUrl}/>);
    this.setState({
      loginscreen:loginscreen,
    })
  }

  render = () => {
    return (
      <div className="loginscreen">
        {chooseNavbar(null, false, null)}
        {this.state.loginscreen}
        <div className = 'col-md-3 ml-auto mr-auto'>
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
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
