import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/logout';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

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
            <MuiThemeProvider>
                    <div>
                        <h4>Hello, This is a protected route. Should redirect to login when not logged in, and when you log in, it should redirect back here</h4>
                        <h5>{this.props.authenticated ? 'You are authenticated': 'Error'}</h5>
                        <RaisedButton label = "Logout" onClick={() => this.props.logout()}/>
                    </div>
            </MuiThemeProvider>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestProtected);