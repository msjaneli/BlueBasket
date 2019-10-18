import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/logout';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

const mapStateToProps = ({ session }) => ({
    user: session.user,
    authenticated: session.authenticated
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
            <MuiThemeProvider>
                <div>
                    <h3>Welcome {this.props.user.name}</h3>
                    <h4> UserID: {this.props.user.id}</h4>
                    <h5>{this.props.authenticated ? 'You are authenticated': 'Error'}</h5>
                    <RaisedButton label = "Logout" onClick={() => this.props.logout()}/>
                </div>
            </MuiThemeProvider>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);