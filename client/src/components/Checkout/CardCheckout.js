import React, { Component } from 'react';
import '../../styles/checkout.css'

// Components
import { Container, Row, Col, Card, Button, Alert, Form } from 'react-bootstrap';
import { CardNumberElement, CardCVCElement, CardExpiryElement} from 'react-stripe-elements'
import IntlTelInput from 'react-bootstrap-intl-tel-input'

// Selectors
import * as sessionSelectors from '../../selectors/sessionSelectors'
import * as checkoutSelectors from '../../selectors/checkoutSelectors'

// Actions
import submitOrder from '../../actions/checkout/submitOrder'
import clearCart from '../../actions/checkout/clearCart'

// Tools
import isEmpty from '../../validation/isEmpty'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { injectStripe } from 'react-stripe-elements';
import Lottie from 'react-lottie'
import loadingAnimationData from '../../resources/lotties/loading/10564-loading-animation.json'

const mapStateToProps = (state) => ({
    getUser: sessionSelectors.getUser(state),
    orders: checkoutSelectors.getCartByRestaurant(state),
    isLoading: checkoutSelectors.isLoading(state),
    checkoutStatus: checkoutSelectors.getCheckoutStatus(state)
})

const mapDispatchToProps = (dispatch) => ({
    submitOrder: (payload) => dispatch(submitOrder(payload)),
    goToThankYou: () => dispatch(push('/checkout/thankyou')),
    clearCart: () => dispatch(clearCart())
})


class CardCheckout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            phoneNumber: ''
        }
    }

    submitOrder = async () => {
        let tokenGenResults = []
        for (var rid in this.props.orders) {
            let result = await this.props.stripe.createToken();
            console.log(result);
            tokenGenResults.push(result);
        }
        const payload = {
            uid: this.props.getUser.id,
            name: this.props.getUser.name,
            email: this.props.getUser.email,
            phoneNumber: this.state.phoneNumber,
            tokenGenResults: tokenGenResults,
            orders: this.props.orders
        }

        try {
            await this.props.submitOrder(payload);
            this.props.goToThankYou();
            this.props.clearCart();
        } catch {
            return
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
      };

    render () {

        var style = {
            base: {
              color: '#303238',
              fontSize: '16px',
              fontFamily: '"Open Sans", sans-serif',
              fontSmoothing: 'antialiased',
              '::placeholder': {
                color: '#CFD7DF',
              },
            },
            invalid: {
              color: '#e5424d',
              ':focus': {
                color: '#303238',
              },
            },
          };

        const animationOptionsLoading = {
            loop: true,
            autoplay: true,
            animationData: loadingAnimationData,
        }

        let errorAlert = this.props.checkoutStatus !== "CHECKOUT_SUCCESS" && !isEmpty(this.props.checkoutStatus) ? <Alert className="text-center" variant="danger">{this.props.checkoutStatus}</Alert> : null

        let loadingAnimation = this.props.isLoading ? <Lottie options={animationOptionsLoading} width={50} height={50}/> : null

        return (
          <Card>
            <Container className="card-checkout">
                <Row>
                    <Col className="text-left">
                        <Row>
                            <Col>
                            <h3 className='card-checkout-title'>Checkout with Card</h3>
                            </Col>
                        </Row>
                        {loadingAnimation}
                        {errorAlert}
                        <Row className="checkout-card-form">
                            <Col>
                                <label>Card Number</label>
                                <CardNumberElement style={style} />
                            </Col>
                        </Row>
                        <Row className="checkout-card-form">
                            <Col>
                                <label>CVC</label>
                                <CardCVCElement />
                            </Col>
                        </Row>
                        <Row className="checkout-card-form">
                            <Col>
                                <label>Expiration Date</label>
                                <CardExpiryElement />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Control placeholder="Phone Number" type='tel' name = "phoneNumber" onChange = {this.handleChange}>
                                </Form.Control>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-left">
                        <Button onClick={() => this.submitOrder()} variant="submit-order">
                            Confirm Order
                        </Button>
                        <style type="text/css">
                            {`
                              .btn-submit-order {
                                  background-color: #5282FF;
                                  color: white;
                                  font-weight: 400;
                                  margin-top: 2vh;
                              }

                              .btn-submit-order:hover {
                                  background-color: #a3bdff;
                                  color: white;
                              }
                            `}
                        </style>
                    </Col>
                </Row>

            </Container>
            </Card>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(injectStripe(CardCheckout));
