import React, { Component } from 'react';
import '../../styles/checkout.css'

// Component
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import CardCheckout from '../../components/Checkout/CardCheckout'
import FoodPointsCheckout from '../../components/Checkout/FoodPointsCheckout'

// Selectors
import * as checkoutSelectors from '../../selectors/checkoutSelectors'

// Tools
import isEmpty from '../../validation/isEmpty'
import { connect } from 'react-redux'
import { Elements } from 'react-stripe-elements'

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
                        <Button onClick={() => this.setState({paymentType: 'CARD'})} className="option-button" variant="debitcredit">Debit/Credit Card</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button onClick={() => this.setState({paymentType: 'FOOD_POINTS'})} className="option-button" variant="foodpoints">Food Points (Duke Student)</Button>
                    </Col>
                </Row>
                <style type="text/css">
                    {`
                        .btn-debitcredit {
                            background-color: #5282FF;
                            color: white;
                            font-weight: 400;
                            margin-top: 2vh;
                        }

                        .btn-debitcredit:hover {
                            background-color: #a3bdff;
                            color: white;
                        }

                        .btn-foodpoints {
                            background-color: #5282FF;
                            color: white;
                            font-weight: 400;
                            margin-top: 2vh;
                        }

                        .btn-foodpoints:hover {
                            background-color: #a3bdff;
                            color: white;
                        }
                    `}
                    </style>
            </Card>
        )

        console.log(this.props.orders);

        let cartDetails = (
            <Container>
                {Object.keys(this.props.orders).map((rid, restaurantIndex) => {
                            return(
                                <Row key={restaurantIndex}>
                                    <Col className = "text-left">
                                        <Row>
                                            <Col>
                                                <h5 className="checkout-restauraunt-title">{this.props.orders[rid].restaurant}</h5>
                                            </Col>
                                        </Row>
                                        {
                                            this.props.orders[rid].lids.map((lid, index) => {
                                                return (
                                                  <Card className="checkout-item-card">
                                                    <Row key = {index}>
                                                        <Col>
                                                        <h3 className="checkout-item-title">{this.props.orders[rid].names[index]}</h3>
                                                        <h4 className="checkout-item-details">Quantity: {this.props.orders[rid].quantities[index]} |
                                                            Price: ${this.props.orders[rid].prices[index]}</h4>
                                                        <h4 className="checkout-item-note">Note: {this.props.orders[rid].notes[index]}</h4>

                                                        </Col>
                                                    </Row>
                                                    </Card>
                                                )
                                            })
                                        }
                                    </Col>
                                </Row>
                            )
                        })}
                <Row>
                    <Col className="text-left">
                            <Row>
                                <Col className ="text-left checkout-total">
                                <p>Subtotal: ${this.props.subtotal}</p>
                                <p>Tax: ${(this.props.subtotal * 0.0675).toFixed(2)}</p>
                                <p>Total: ${(this.props.subtotal * 1.0675).toFixed(2)}</p>
                                </Col>
                            </Row>
                    </Col>

                </Row>

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
                        <Col md={5}>
                            {cartDetails}
                        </Col>
                        <Col md={7}>
                            <Elements>
                                <CardCheckout/>
                            </Elements>
                        </Col>
                    </Row>
                </Container>
            )
        } else {
            return (
                <Container>
                    <Row style={{marginTop: '5vh'}}>
                        <Col md={4}>
                            {cartDetails}
                        </Col>
                        <Col md={8}>
                            <Elements>
                              <FoodPointsCheckout/>
                            </Elements>
                        </Col>
                    </Row>
                </Container>
            )
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCheckout);
