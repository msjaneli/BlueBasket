import React, { Component } from 'react';

import { Card } from 'react-bootstrap'

class RestaurantCard extends Component {
  constructor(props) {
    super(props);

  }
  render () {
    return (
      <Card>
        <Card.Img variant="top" src= {this.props.img} />
        <Card.Body>
          <Card.Title>{this.props.name}</Card.Title>
        </Card.Body>
      </Card>
    )
  }
}
export default RestaurantCard
