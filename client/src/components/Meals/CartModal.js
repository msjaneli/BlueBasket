import React, { Component } from 'react';
import '../../styles/meals.css';

// Components
import { Modal, Button, InputGroup, FormControl, Alert } from 'react-bootstrap';
import NumericInput from 'react-numeric-input';

// Actions
import addToCart from '../../actions/checkout/addToCart'
import resetCheckoutStatus from '../../actions/checkout/resetStatus'

// Selectors
import * as checkoutSelectors from '../../selectors/checkoutSelectors'
import * as sessionSelectors from '../../selectors/sessionSelectors'

// Tools
import isEmpty from '../../validation/isEmpty'
import Lottie from 'react-lottie'
import loadingAnimationData from '../../resources/lotties/loading/117-progress-bar.json'
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    user: sessionSelectors.getUser(state),
    isLoading: checkoutSelectors.isLoading(state),
    cartStatus: checkoutSelectors.getCartStatus(state)
})

const mapDispatchToProps = (dispatch) => ({
    addToCart: (payload) => dispatch(addToCart(payload)),
    resetCheckoutStatus: () => dispatch(resetCheckoutStatus())
})

class CartModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listing: this.props.listing,
            quantity: 1,
            note: '',
        }

    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    hideAndReset = () => {
        this.props.resetCheckoutStatus();
        this.props.onHide();
    }

    changeQuantity = (valueAsNumber) => {
        if (isEmpty(valueAsNumber)) {
            this.setState({
                quantity: 1,
            })
        } else {
            this.setState({
                quantity: valueAsNumber
            })
        }
    }

    attemptCartAdd = async () => {
        const payload = {
            lid: this.props.listing.lid,
            quantityChange: -this.state.quantity,
            cartItem: {
                cartId: Math.random()
                .toString(36)
                .substr(2, 9),
                rid: this.props.listing.rid,
                restaurant: this.props.restaurant,
                lid: this.props.listing.lid,
                name: this.props.listing.name,
                quantity: this.state.quantity,
                price: this.props.listing.price,
                note: this.state.note,
            }
        }
        await this.props.addToCart(payload);
    }

    render() {

        const animationOptionsLoading = {
            loop: true,
            autoplay: true,
            animationData: loadingAnimationData,
            renderSettings: {
              preserveAspectRatio: 'xMidYMid slice'
            }
        }

        let cartErrorMessage = !isEmpty(this.props.cartStatus) ? <Alert variant = 'danger'>{this.props.cartStatus}</Alert> : null

        let loading = this.props.isLoading ? <Lottie options = {animationOptionsLoading} width={200} height={200} style={{marginTop: '-60px', marginBottom: '-60px'}}/> : null

        return (
            <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    Add to Cart
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {cartErrorMessage}
                    {loading}
                    <p className="listing-name">{this.props.listing.name}</p>
                    <p className="listing-type">{this.props.listing.type}</p><p className="allergens">Allergens/Restrictions: {this.props.listing.allergens}</p>
                    <p className="listing-quantity"> Remaining: {this.props.listing.quantity}</p>
                    <p>
                    {this.props.listing.description}
                    </p>
                    Quantity: <NumericInput name="quantity" min = {1} precision={0} value={this.state.quantity}  onChange={(valueAsNumber) => this.changeQuantity(valueAsNumber)}/>
                    <br/>
                    <br/>
                    <label>Add a note:</label>
                    <InputGroup>
                        <FormControl as="textarea" name="note" onChange={this.handleChange} aria-label="With textarea" />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="cart-modal-cancel" onClick={() => this.hideAndReset()} variant="cancel">Cancel</Button>
                    <Button className="cart-modal-submit" onClick={() => this.attemptCartAdd()} variant="cart" disabled={this.props.user.type === 'RESTAURANT'}>Add to Cart</Button>
                    <style type="text/css">
                        {`
                            .btn-cart {
                                background-color: cornflowerblue;
                                color: white;
                                font-weight: 400;
                                width: 8rem;
                            }

                            .btn-cart:hover {
                                background-color: cornflowerblue;
                                color: white;
                            }

                            .btn-cancel:hover {
                              color: #ff8a75;
                            }
                        `}
                        </style>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartModal);
