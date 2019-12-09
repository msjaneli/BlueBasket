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
          user: {},
          listing: []
        }
    }

    componentDidMount = async () => {
        var { data } = await axios.get('/user/' + this.props.order.uid)
        this.setState({
            user: data[0]
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
                <p>User: {this.state.user.name} </p>
                <p>Email: {this.state.user.email} </p>
                {isEmpty(this.props.order.phone) ? null : <p>Phone: {this.props.order.phone}</p> }
            </Col>
        </Row>) : null

        let note = !isEmpty(this.props.order.notes[this.props.orderIndex]) ? <Row><Col className="text-left"><p className="user-order-card-note">Note: {this.props.order.notes[this.props.orderIndex]}</p></Col></Row> : null

        return(
          <Card className="order-card">
            {nameHeader}
            <Row>
              <Col className="text-left"> <p className="user-order-card-name">{this.state.listing.name}</p></Col>
              <Col><p className="user-order-card-quantity">Quantity: {this.props.order.quantities[this.props.orderIndex]}</p></Col>
              <Col className="text-right"><p className="user-order-card-total">Price: ${this.state.listing.price}</p></Col>
            </Row>
            {note}
          </Card>
        )

    }
}

export default ListingCard;
