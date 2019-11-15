import React, { Component } from 'react';
import '../../styles/checkout.css'

// Components
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import NumericInput from 'react-numeric-input';

// Selectors
import * as checkoutSelectors from '../../selectors/checkoutSelectors'

// Actions
import resetCheckoutStatus  from '../../actions/checkout/resetStatus'
import updateCart from '../../actions/checkout/updateCart';
import removeFromCart from '../../actions/checkout/removeFromCart'

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
    goToMeals: () => {
        dispatch(resetCheckoutStatus());
        dispatch(push('/meals'))
    },
    updateCart: (payload) => dispatch(updateCart(payload)),
    removeFromCart: (payload) => dispatch(removeFromCart(payload))
})


class Cart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: {
                rid: null,
                index: null,
                restaurantIndex: null,
                isRemove: false,
            },
        }
    }

    changeQuantity = async (valueAsNumber, rid, index, restaurantIndex, isRemove) => {
        this.setState({
            loading: {
                rid: rid,
                index: index,
                restaurantIndex: restaurantIndex,
                isRemove: isRemove
            }
        })
        var quantityChangeForListing = this.props.orders[rid].quantities[index] - valueAsNumber;
        var quantityChangeForCart = -quantityChangeForListing;
        var cartId = this.props.orders[rid].cartIds[index];
        var lid = this.props.orders[rid].lids[index];
        var name = this.props.orders[rid].names[index];

        const payload = {
            cartId: cartId,
            rid: rid,
            lid: lid,
            name: name,
            quantityChangeForListing: quantityChangeForListing,
            quantityChangeForCart: quantityChangeForCart,
            index: index,
        }
        if (!isRemove) {
            await this.props.updateCart(payload);
        } else {
            await this.props.removeFromCart(payload);
        }
    }

    render() {

        const animationOptionsLoading = {
            loop: true,
            autoplay: true,
            animationData: loadingAnimationData,
        }
         
        let cartList = isEmpty(this.props.orders) ? (
              <Container>
                <Row>
                    <Col>
                        Oops! Looks like there's nothing here
                    </Col>
                </Row>
              </Container>
          ) : (
            <Container>
                {Object.keys(this.props.orders).map((rid, restaurantIndex) => {
                    return(
                        <Row key = {restaurantIndex}>
                            <Col className="text-left">
                                <Row style={{marginTop: '2rem'}}>
                                    <Col>
                                        <h4>{this.props.orders[rid].restaurant}</h4>
                                        {this.props.cartStatus === "UPDATE_SUCCESS" && this.state.loading.restaurantIndex === restaurantIndex && !this.state.loading.isRemove ? <Alert className="text-center" variant="success">Successfully updated cart</Alert> : null}
                                        {!isEmpty(this.props.cartStatus) && this.props.cartStatus !== "UPDATE_SUCCESS"  && this.state.loading.restaurantIndex === restaurantIndex ? <Alert className="text-center" variant="danger">{this.props.cartStatus}</Alert> : null}
                                    </Col>
                                </Row>
                                {
                                    this.props.orders[rid]["lids"].map((lid, index) => {
                                        return (
                                            <Row key = {index}>
                                                <Col>
                                                    <Card body className="cart-page-card shadow-sm">
                                                        <Row>
                                                            <Col>
                                                                <p>{this.props.orders[rid].names[index]}</p>
                                                            </Col>
                                                            <Col>
                                                                <p>Quantity: </p>
                                                                {(this.props.isLoading && this.state.loading.rid === rid && this.state.loading.index === index && !this.state.loading.isRemove) ? 
                                                                    (<Lottie style={{ paddingBottom: '1rem', marginTop: '-1rem'}} options = {animationOptionsLoading} width={25}/>) : 
                                                                    (<NumericInput 
                                                                        style={{
                                                                            input: {pointerEvents: 'none'}
                                                                        }}
                                                                        min={1} 
                                                                        value={this.props.orders[rid].quantities[index]}
                                                                        onChange={(valueAsNumber) => this.changeQuantity(valueAsNumber, rid, index, restaurantIndex, false)}
                                                                        />)
                                                                }
                                                            </Col>
                                                            <Col>
                                                                <p>Price: ${this.props.orders[rid].prices[index]}</p>
                                                            </Col>
                                                            <Col>
                                                                <p>Note: {this.props.orders[rid].notes[index]}</p>
                                                            </Col>
                                                            <Col>
                                                                {(this.props.isLoading && this.state.loading.rid === rid && this.state.loading.index === index && this.state.loading.isRemove) ?
                                                                    (<Lottie options = {animationOptionsLoading} width = {40}/>) :
                                                                    (<Button onClick={() => this.changeQuantity(0, rid, index, restaurantIndex, true)}>Remove</Button>)
                                                                }
                                                            </Col>
                                                        </Row>
                                                    </Card>
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

        return(
            <Container style={{height: '100vh'}}>
                <Row style={{marginTop: '2rem'}}>
                    <Col className="text-left">
                        <h2>Your cart</h2>
                        <Button onClick={() => this.props.goToMeals()}>Add more meals</Button>
                        {(this.props.cartStatus === "UPDATE_SUCCESS" && this.state.loading.isRemove) ? <Alert className="text-center" style = {{marginTop: '1rem'}}variant="success">Successfully removed item from cart.</Alert> : null }
                    </Col>
                </Row>
                {cartList}
                <hr/>
                <Row>
                    <Col className="text-left">
                        <p>Subtotal: ${this.props.subtotal}</p>
                        <p>Tax: ${(this.props.subtotal * 0.0675).toFixed(2)}</p>
                        <p>Total: ${(this.props.subtotal * 1.0675).toFixed(2)}</p>
                        <Button>Checkout</Button>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)