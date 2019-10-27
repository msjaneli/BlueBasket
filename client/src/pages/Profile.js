import React, { Component } from 'react';

// Components
import chooseNavbar from '../components/NavBar/chooseNavBar'
import { Button } from 'react-bootstrap';

// Actions
import { logoutUser } from '../actions/logout';

// Selectors
import * as sessionSelectors from '../selectors/sessionSelectors'

// Tools
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  user: sessionSelectors.getUser(state),
  authenticated: sessionSelectors.isAuthenticated(state),
})

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logoutUser())
})

class Profile extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
                <div>
                    {chooseNavbar(this.props.user, this.props.authenticated)}
                    <h3>Welcome {this.props.user.name}</h3>
                    <h4> UserID: {this.props.user.id}</h4>
                    <h5>{this.props.authenticated ? 'You are authenticated': 'Error'}</h5>
                    <Button variant="outline-primary" onClick={() => this.props.logout()}>Logout</Button>
                </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);