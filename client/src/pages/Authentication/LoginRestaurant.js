import React, { Component } from 'react';
import '../../styles/auth.css'

// Components
import Login from '../../components/Authentication/Login';
import { Card, Col, Row } from 'react-bootstrap';

// Actions
import { setAuthRedirect } from '../../actions/auth/setRedirect'
import * as sessionSelectors from '../../selectors/sessionSelectors'

// Tools
import isEmpty from '../../validation/isEmpty';
import { connect } from 'react-redux';
import Lottie from 'react-lottie';
import foodAnimationData from '../../resources/lotties/food/10816-walking-taco.json'

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
        this.type='RESTAURANT';

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

        const animationOptionsFood = {
            loop: true,
            autoplay: true,
            animationData: foodAnimationData,
              preserveAspectRatio: 'xMidYMid slice'
        }

        return (
            <div>
                    <div className = "authContainer" >
                        <Row className ="justify-content-center">
                            <Card className = "shadow-lg p-3 mb-5 bg-white rounded" style = {{width: '55rem', marginTop: "9rem", marginBottom: "5rem"}}>
                                <Card.Body>
                                <Row>
                                    <Col md={5} className = "mt-auto mb-auto loginSplash" style ={{borderRight: '0.5px solid lightgray'}}>
                                        <a id = "logo" href ="/" style = {{'margin-top': '40px'}}>
                                        <div id="blue-logo" style={{fontSize: '40px'}}>Blue</div>
                                        <div id="basket-logo" style={{fontSize: '40px'}}>Basket</div>
                                        </a>
                                        <Lottie options = {animationOptionsFood} width = {225} height = {225} />
                                    </Col>
                                    <Col md={7}>
                                        <Login loginHeader="Restaurant login" type={this.type}/>
                                    </Col>
                                </Row>
                                </Card.Body>
                            </Card>
                        </Row>
                    </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginRestaurant);
