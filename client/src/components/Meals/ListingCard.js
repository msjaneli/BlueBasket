import React, { Component } from 'react';
import '../../styles/meals.css';

// Components
import { Row, Col, Card, Button } from 'react-bootstrap'

// Tools

class ListingCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
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
                                <Button variant="cart">Add to Cart</Button>
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
                                    `}
                                </style>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p className = "price">Price: ${this.props.listing.price}</p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card>
        )

    }
}

export default ListingCard;
