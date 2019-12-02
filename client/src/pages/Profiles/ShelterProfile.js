import React, { Component } from 'react';
import '../../styles/profile.css'

// Components
import { Button } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';
import { Card } from 'react-bootstrap';

// Actions
import { logoutUser } from '../../actions/auth/logout';

// Selectors
import * as sessionSelectors from '../../selectors/sessionSelectors'

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
                <Card className="profile-card">
                    <h3 className="profile-hello">Welcome {this.props.user.name}</h3>
                    <h4 className="profile-userID"> UserID: {this.props.user.id}</h4>
                    <div className="profile-auth">{this.props.authenticated ? <Alert variant='success'>You are authenticated.</Alert>: <Alert variant='error'>Your account has not been authenticated.</Alert>}</div>
                    <Button className="profile-logout" variant="profile-logout" onClick={() => this.props.logout()}>Logout</Button>
                    <style type="text/css">
                        {`
                            .btn-profile-logout {
                                background-color: #5282FF;
                                color: white;
                                font-weight: 400;
                                margin-top: 2vh;
                            }

                            .btn-profile-logout:hover {
                                background-color: #a3bdff;
                                color: white;
                            }
                        `}
                        </style>
                </Card>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
