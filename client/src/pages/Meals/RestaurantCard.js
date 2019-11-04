import React, { Component } from 'react';

import { Card, Button } from 'react-bootstrap'

class RestaurantCard extends Component {
  constructor(props) {
    super(props);

  }
  goToRestaurantPage = () => {
    var urlLink = '/meals/';
    console.log('clik!!')
  };
  render () {
    return (
      <Card>
        <Card.Img style={{padding: '0.75rem'}}variant="top" src= {this.props.img} />
        <Card.Body>
          <Card.Title>{this.props.name}</Card.Title>
          <Button onClick={() => this.goToRestaurantPage()}>Explore!</Button>
        </Card.Body>
      </Card>
    )
  }
}
export default RestaurantCard
