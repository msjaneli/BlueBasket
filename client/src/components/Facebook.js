import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login'
import axios from 'axios';

import { connect } from 'react-redux';
import { loginUserFacebook } from '../actions/login';
import '../styles/auth.css'

const mapStateToProps = (state) => ({
  authRedirect: state.authRedirect,
})

const mapDispatchToProps = (dispatch) => ({
  login: (payload, redirectUrl) => dispatch(loginUserFacebook(payload, redirectUrl))
})

class Facebook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      userID: "",
      name: "",
      email: "",
      picture: ""
    }
  }

  register = async () => {
    const alreadyRegistered = await axios.post('/user/check-exists', {
      email: this.state.email
    });

    if (!alreadyRegistered.data) {
      // If not already registered, then register the user as a facebook user with a numerical id into the database
      await axios.post('/user/register-facebook-user', {
        uid: this.state.userID,
        name: this.state.name,
        email: this.state.email,
        password: null,
        phone: null,
        restrictions: null,
      });
    } else {
      // Otherwise, get the original userID from the original account. 
      const res = await axios.get('/user/' + this.state.email + '/uid');
      const uid = res.data;
      this.setState({
        userID: uid
      })
    }
  };

  responseFacebook = async response => {
    this.setState({
      isLoggedIn: true,
      userID: response.userID,
      name: response.name,
      email: response.email,
      picture: response.picture.data.url
    });

    await this.register();

    var loginPayload = {
      token: this.state.userID,
      data: {
        id: this.state.userID,
        email: this.state.email,
        name: this.state.name
      }
    }

    await this.props.login(loginPayload, this.props.authRedirect);
  };

  componentClicked = () =>  {
    console.log("Empty Function For Facebook Callback");
  }

  render() {
    let fbContent;
    
      fbContent = (
        <FacebookLogin
          appId="674103499777392"
          cssClass="facebookLogin"
          autoLoad={false}
          fields="name,email,picture"
          textButton = {"\xa0\xa0\xa0\xa0\xa0" + "Continue With Facebook"}
          onClick={() => this.componentClicked()}
          callback={this.responseFacebook}
          icon="fa-facebook"
        />
      );
    
    return <div>{fbContent}</div>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Facebook)
