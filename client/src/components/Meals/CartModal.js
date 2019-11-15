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

// Tools 
import isEmpty from '../../validation/isEmpty'
import Lottie from 'react-lottie'
import loadingAnimationData from '../../resources/lotties/loading/117-progress-bar.json'
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
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
        this.setState({
            quantity: valueAsNumber
        })
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
                    {this.props.listing.name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {cartErrorMessage}
                    {loading}
                    <h4>{this.props.listing.type}</h4>
                    <p>
                    {this.props.listing.description}
                    </p>
                    <p>
                    Quantity Remaining: {this.props.listing.quantity}
                    </p>
                    <NumericInput name="quantity" min = {1} value={this.state.quantity}  onChange={(valueAsNumber) => this.changeQuantity(valueAsNumber)}/>
                    <br/>
                    <label>Add a note:</label>
                    <InputGroup>
                        <FormControl as="textarea" name="note" onChange={this.handleChange} aria-label="With textarea" />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => this.hideAndReset()}>Cancel</Button>
                    <Button onClick={() => this.attemptCartAdd()}>Add to Cart</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartModal);
