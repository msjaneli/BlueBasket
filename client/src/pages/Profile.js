import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/logout';
import { Button } from 'react-bootstrap';
import chooseNavbar from '../components/NavBar/chooseNavBar'

const mapStateToProps = ( state ) => ({
    user: state.session.user,
    authenticated: state.session.authenticated,
    type: state.type
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
                    {chooseNavbar(this.props.user, this.props.authenticated, this.props.type)}
                    <h3>Welcome {this.props.user.name}</h3>
                    <h4> UserID: {this.props.user.id}</h4>
                    <h5>{this.props.authenticated ? 'You are authenticated': 'Error'}</h5>
                    <Button variant="outline-primary" onClick={() => this.props.logout()}>Logout</Button>
                </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);