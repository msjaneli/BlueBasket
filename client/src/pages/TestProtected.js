import React, { Component } from 'react';

// Components
import { logoutUser } from '../actions/auth/logout'
import { Button } from 'react-bootstrap'

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

class TestProtected extends Component {
    constructor(props) {
        super(props);
    }

    render (){
        return(
            <div>
                <h4>Hello, This is a protected route. Should redirect to login when not logged in, and when you log in, it should redirect back here</h4>
                <h5>{this.props.authenticated ? 'You are authenticated': 'Error'}</h5>
                <Button onClick={() => this.props.logout()}>Logout</Button>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestProtected);