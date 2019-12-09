import React, { Component } from 'react';
import '../../styles/orders.css';

// Components
import { Row, Col, Card, Container } from 'react-bootstrap';

//Tools
import axios from 'axios';
import isEmpty from '../../validation/isEmpty'

class ListingCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
          restaurant: [],
          listing: []
        }
    }

    componentDidMount = async () => {
       var { data } = await axios.get('/restaurant/'+this.props.order.rid);
       this.setState({
         restaurant: data
       })
       var { data } = await axios.get('/listing/'+this.props.order.lids[this.props.orderIndex]);
       this.setState({
         listing: data
       })
   }

    render() {

      let nameHeader = this.props.orderIndex === 0 ? 
        (<Row>
            <Col>
              <p className='text-left user-order-card-restaurant'>{this.state.restaurant.name}</p>
            </Col>
        </Row>) : null

      let note = !isEmpty(this.props.order.notes[this.props.orderIndex]) ? <Row><Col className="text-left"><p className="user-order-card-note">Note: {this.props.order.notes[this.props.orderIndex]}</p></Col></Row> : null

        return(
          <Card className="order-card">
            {nameHeader}
            <Row>
              <Col className="text-left"> <p className="user-order-card-name">{this.state.listing.name}</p></Col>
              <Col><p className="user-order-card-quantity">Quantity: {this.props.order.quantities[this.props.orderIndex]}</p></Col>
              <Col className="text-right"><p className="user-order-card-total">Price: ${(this.state.listing.price)}</p></Col>
            </Row>
            <Row>
              <Col className="text-left"><p className="user-order-card-details">Type: {this.state.listing.type} | Allergens: {this.state.listing.allergens}</p></Col>
            </Row>
            <Row>
              <Col className="text-left"><p className="user-order-card-details">Description: {this.state.listing.description}</p>
            </Col>
            </Row>
            {note}
          </Card>
        )

    }
}

export default ListingCard;
