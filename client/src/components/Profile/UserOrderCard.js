import React, { Component } from 'react';
import '../../styles/orders.css';

// Components
import { Row, Col, Card, Container } from 'react-bootstrap';

//Tools
import axios from 'axios';

class ListingCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
          restaurant: [],
          listing: []
        }
    }

    componentDidMount = async () => {
     setTimeout(async () => {
       var { data } = await axios.get('/restaurant/'+this.props.order.rid);
       this.setState({
         restaurant: data
       })
       var { data } = await axios.get('/listing/'+this.props.order.lids[0]);
       this.setState({
         listing: data
       })
     }, 750);
   }

    render() {
        return(
          <Card className="order-card">
            <Row>
            <Col className="text-left"> <p className="user-order-card-restaurant">{this.state.restaurant.name}</p></Col>
            </Row>
            <Row>
            <Col className="text-left"> <p className="user-order-card-name">{this.state.listing.name}</p></Col>
            <Col><p className="user-order-card-quantity">Quantity: {this.props.order.quantities[0]}</p></Col>
            <Col className="text-right"><p className="user-order-card-total">Total: ${this.props.order.total}</p></Col>
            </Row>
            <Row>
            <Col className="text-left"><p className="user-order-card-details">Type: {this.state.listing.type} | Allergens: {this.state.listing.allergens}</p></Col>
            </Row>
            <Row>
            <Col className="text-left"><p className="user-order-card-note">Note: {this.props.order.note}</p></Col>
            </Row>
            <Row><Col className="text-left"><p className="user-order-card-description">{this.state.listing.description}</p></Col>
            </Row>
          </Card>
        )

    }
}

export default ListingCard;
