import React, { Component } from 'react';
import '../../styles/auth.css'

// Components
import chooseNavbar from '../../components/NavBar/chooseNavBar'
import Login from '../../components/Authentication/Login'

// Selectors
import * as sessionSelectors from '../../selectors/sessionSelectors'

// Tools
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  user: sessionSelectors.getUser(state),
  authenticated: sessionSelectors.isAuthenticated(state),
})

class LoginRestaurant extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (       
            <div>
                {chooseNavbar(this.props.user, this.props.authenticated)}
                <Login loginHeader="Restaurant login" isUser={false}/>
            </div>
        )
    }
}

export default connect(mapStateToProps)(LoginRestaurant);