import React, { Component } from 'react';
import '../../styles/auth.css'

// Components
import Login from '../../components/Authentication/Login';

// Actions
import { setAuthRedirect } from '../../actions/setRedirect'
import * as sessionSelectors from '../../selectors/sessionSelectors'

// Tools
import isEmpty from '../../validation/isEmpty';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    user: sessionSelectors.getUser(state),
    authenticated: sessionSelectors.isAuthenticated(state)
})

const mapDispatchToProps = dispatch => ({
    setAuthRedirect: redirectUrl => dispatch(setAuthRedirect(redirectUrl)),
})


class LoginRestaurant extends Component {
    constructor(props) {
        super(props);

    }

    setRedirectUrl = () => {
        var redirectData = this.props.location.state;
        var redirectUrl = "/profile/restaurant";
        if(!isEmpty(redirectData)) {
          redirectUrl = redirectData.from.pathname
        }
        this.props.setAuthRedirect(redirectUrl);
      }

    componentDidMount = () => {
        this.setRedirectUrl();
    }

    render() {
        return (       
            <div>
                <Login loginHeader="Restaurant login" isUser={false}/>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginRestaurant);