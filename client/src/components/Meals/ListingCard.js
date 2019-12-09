import React, { Component } from 'react';
import '../../styles/meals.css';

// Components
import { Row, Col, Card, Button } from 'react-bootstrap'

// Selectors 
import * as sessionSelectors from '../../selectors/sessionSelectors'

// Tools
import axios from 'axios'
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    user: sessionSelectors.getUser(state),
})

class ListingCard extends Component {
    constructor(props) {
        super(props);
    }

    deleteListing = async () => {
        await axios.post('/listing/' + this.props.listing.lid + '/delete')
        window.location.reload(true)
    }

    render() {

        let deleteListingButton = this.props.user.type === 'RESTAURANT' ? <Button variant="danger" style={{marginLeft: '0.5rem'}} onClick={() => this.deleteListing()}>Delete</Button> : null

        return(
            <Card body className = "listing-card" style={{margin: '0.25rem'}}>
                <Row>
                    <Col md={9}>
                        <Row>
                            <Col md={4}>
                                <Row>
                                    <Col>
                                        <p className="listing-name">{this.props.listing.name}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p className="listing-type">{this.props.listing.type} </p>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={8}>
                                <Row>
                                    <Col className="text-left">
                                        <p className="listing-description">{this.props.listing.description}</p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <p className="listing-quantity"> Remaining: {this.props.listing.quantity}</p>
                            </Col>
                            <Col md={8} className = "text-left">
                                <p className="allergens">Allergens/Restrictions: {this.props.listing.allergens}</p>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={3}>
                        <Row>
                        <Col>
                            <p className = "price">Price: ${this.props.listing.price}</p>
                        </Col>
                        </Row>
                        <Row>
                        <Col>
                            <Button onClick={() => this.props.showModal(this.props.keyId)} disabled={this.props.user.type === 'RESTAURANT'} variant="cart">Add to Cart</Button>
                            <style type="text/css">
                                {`
                                    .btn-cart {
                                        background-color: cornflowerblue;
                                        color: white;
                                        font-weight: 400;
                                        width: 8rem;
                                        margin
                                    }

                                    .btn-cart:hover {
                                        background-color: cornflowerblue;
                                        color: white;
                                    }
                                `}
                            </style>
                            {deleteListingButton}
                        </Col>
                        </Row>
                    </Col>
                </Row>
            </Card>
        )

    }
}

export default connect(mapStateToProps)(ListingCard);
