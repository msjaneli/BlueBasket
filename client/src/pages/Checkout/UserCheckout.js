import React, { Component } from 'react';
import '../../styles/checkout.css'

// Component 
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import CardCheckout from '../../components/Checkout/CardCheckout'

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

        let cartDetails = (
            <Container>
                {Object.keys(this.props.orders).map((rid, restaurantIndex) => {
                            return(
                                <Row key={restaurantIndex}>
                                    <Col className = "text-left">
                                        <Row>
                                            <Col>
                                                <h5>{this.props.orders[rid].restaurant}</h5>
                                            </Col>
                                        </Row>
                                        {
                                            this.props.orders[rid].lids.map((lid, index) => {
                                                return (
                                                    <Row key = {index}>
                                                        <Col>
                                                        <li>{this.props.orders[rid].names[index]}</li>
                                                        <ul>
                                                            <li>Quantity: {this.props.orders[rid].quantities[index]}</li>
                                                            <li>Price: {this.props.orders[rid].prices[index]}</li>
                                                            <li>Note: {this.props.orders[rid].notes[index]}</li>
                                                        </ul>
                                                        </Col>
                                                    </Row>
                                                )
                                            })
                                        }
                                    </Col>
                                </Row>
                            )
                        })}
            </Container>
        )

        if (isEmpty(this.props.orders)) {
            return (
                <Container>
                    <Row className="justify-content-md-center">
                        <Col md={6}>
                            <h2>Looks like your cart is empty!</h2>
                        </Col>
                    </Row>
                </Container>
            )

        } else if (isEmpty(this.state.paymentType)) {
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
                <Container>
                    <Row style={{marginTop: '5vh'}}>
                        <Col md={6}>
                            {cartDetails}
                        </Col>
                        <Col md={6}>
                        </Col>
                    </Row>
                </Container>
            )
        } else {
            return (
                <Container>
                    <Row style={{marginTop: '5vh'}}>
                        <Col md={6}>
                            {cartDetails}
                        </Col>
                        <Col md={6}>

                        </Col>
                    </Row>
                </Container>
            )
        }
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCheckout);