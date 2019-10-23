import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/logout';
import { Button } from 'react-bootstrap';

const mapStateToProps = ({ session }) => ({
    authenticated: session.authenticated
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