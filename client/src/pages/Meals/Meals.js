import React, { Component } from 'react';
import '../../styles/meals.css';

// Components
import RestaurantCard from '../Meals/RestaurantCard'

// Selectors
import * as sessionSelectors from '../../selectors/sessionSelectors'

// Tools
import { connect } from 'react-redux';
import { Container, Row, Col, Button, Card } from 'react-bootstrap'

const mapStateToProps = (state) => ({
  user: sessionSelectors.getUser(state),
  authenticated: sessionSelectors.isAuthenticated(state),
});

class Meals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant_list: [{
        img: 'https://drive.google.com/uc?export=view&id=1YtkZEcg7djB2LgbeKvW9Ktgy9mP8oDRP',
        name: 'test'
      },
        {
          img: 'https://drive.google.com/uc?export=view&id=1YtkZEcg7djB2LgbeKvW9Ktgy9mP8oDRP',
          name: 'test'
        }]
    };
  }
  render () {
    return (
      <div>
        <Row>
          <div id="title">Available Now</div>
        </Row>
        <Row>
          {this.state.restaurant_list.map(function (restaurant, i) {
            return <Col>
              <RestaurantCard img = {restaurant.img} name = {restaurant.name} key = {i}/>
            </Col>;
          })}
        </Row>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Meals);
