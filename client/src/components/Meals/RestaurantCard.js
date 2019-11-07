import React, { Component } from 'react';

// Components
import { Card, Button } from 'react-bootstrap'

// Tools
import { connect } from 'react-redux'
import { push } from 'connected-react-router'


const mapDispatchToProps = (dispatch) => ({
  goToRestaurantPage: (restaurantUrl) => dispatch(push(restaurantUrl))
})

class RestaurantCard extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <Card>
        <Card.Img style={{padding: '0.75rem'}}variant="top" src= {this.props.restaurant.image} />
        <Card.Body>
          <Card.Title>{this.props.restaurant.name}</Card.Title>
          <p>{this.props.restaurant.description}</p>
          <Button onClick={() => this.props.goToRestaurantPage('/meals/' + this.props.restaurant.rid)}>Explore!</Button>
        </Card.Body>
      </Card>
    )
  }
}
export default connect(null, mapDispatchToProps)(RestaurantCard)