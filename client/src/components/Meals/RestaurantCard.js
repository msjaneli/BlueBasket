import React, { Component } from 'react';


// Components
import { Card, Button } from 'react-bootstrap'

// Tools
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import '../../styles/restaurantcard.css';

const mapDispatchToProps = (dispatch) => ({
  goToRestaurantPage: (restaurantUrl) => dispatch(push(restaurantUrl))
})

class RestaurantCard extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <Card className="unselectable-card" onClick={() => this.props.goToRestaurantPage('/meals/' + this.props.restaurant.rid)}>
        <Card.Img className="img-rounded" src= {this.props.restaurant.image} />
        <Card.ImgOverlay className="d-flex flex-column">
          <Card.Title className="restauraunt-card-title">{this.props.restaurant.name}</Card.Title>
          <Card.Text className="restauraunt-card-descr mt-auto">{this.props.restaurant.description}</Card.Text>
        </Card.ImgOverlay>
      </Card>
    )
  }
}
export default connect(null, mapDispatchToProps)(RestaurantCard)
