import React, { Component } from 'react';
import '../../styles/checkout.css'

// Component 
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';

// Actions
import resetCheckoutStatus  from '../../actions/checkout/resetStatus'

// Selectors
import * as checkoutSelectors from '../../selectors/checkoutSelectors'

// Tools
import isEmpty from '../../validation/isEmpty'
import Lottie from 'react-lottie'
import loadingAnimationData from '../../resources/lotties/loading/10564-loading-animation.json'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

const mapStateToProps = (state) => ({
    orders: checkoutSelectors.getCartByRestaurant(state),
    subtotal: checkoutSelectors.getSubTotal(state),
    cartStatus: checkoutSelectors.getCartStatus(state),
    isLoading: checkoutSelectors.isLoading(state),
})

const mapDispatchToProps = (dispatch) => ({
   
})

class UserCheckout extends Component {
    constructor(props){
        super(props);

        this.state = {
            paymentType: null,
        }
    }


    render (){

        let selectPayment = (
            <Card body>
                <Row>
                    <Col>
                        <Button onClick={() => this.setState({paymentType: 'CARD'})}className="option-button" >Debit/Credit Card</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button onClick={() => this.setState({paymentType: 'FOOD_POINTS'})} className="option-button">Food Points (Duke Student)</Button>
                    </Col>
                </Row>
            </Card>
        )

        if (isEmpty(this.state.paymentType)) {
            return (
                <Container>
                    <Row className="justify-content-md-center" style={{marginTop: '20vh'}}>
                        <Col md={6}>
                        {selectPayment}
                        </Col>
                    </Row>
                </Container>
            );
        } else if (this.state.paymentType === 'CARD') {
            return (
                <div>Card</div>
            )
        } else {
            return (
                <div>Food Points</div>
            )
        }
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCheckout);