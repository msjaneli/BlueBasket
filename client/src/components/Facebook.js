import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login'
import axios from 'axios';

export default class Facebook extends Component {
  state = {
    isLoggedIn: false,
    userID: "",
    name: "",
    email: "",
    picture: ""
  };

  register = async () => {
    let alreadyRegistered = await axios.post('/user/check-exists', {
      email: this.state.email
    });
    console.log(alreadyRegistered.data);
    
    if (!alreadyRegistered.data) {
        var res = await axios.post('/user/register-facebook-user', {
          uid: this.state.userID,
          name: this.state.name,
          email: this.state.email,
          password: null,
          phone: null,
          restrictions: null,
        })
        console.log(res);
    }
  }

  responseFacebook = async response => {
    // console.log(response);
    this.setState({
      isLoggedIn: true,
      userID: response.userID,
      name: response.name,
      email: response.email,
      picture: response.picture.data.url
    });

    this.register();
  };

  componentClicked = () => console.log("clicked");

  render() {
    let fbContent
    if (this.state.isLoggedIn) {
      fbContent = (
        <div
          style={{
            width: "400px",
            margin: "auto",
            background: "#f4f4f4",
            padding: "20px"
          }}
        >
          <img src={this.state.picture} alt={this.state.name} />
          <h2>Welcome {this.state.name}</h2>
          Email: {this.state.email}
        </div>
      );
    } else {
      fbContent = (
        <FacebookLogin
          appId="674103499777392"
          autoLoad={false}
          fields="name,email,picture"
          onClick={this.componentClicked}
          callback={this.responseFacebook}
        />
      );
    }
    return <div>{fbContent}</div>;
  }
}
