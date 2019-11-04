import React, { Component } from 'react';
import '../../styles/meals.css';

// Components
import RestaurantCard from '../Meals/RestaurantCard'
import { Container, Row, Col} from 'react-bootstrap'

// Selectors
import * as sessionSelectors from '../../selectors/sessionSelectors'

// Tools
import axios from 'axios'
import Lottie from 'react-lottie'
import loadingAnimationData from '../../resources/lotties/loading/9965-loading-spinner.json'
import isEmpty from '../../validation/isEmpty'
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  user: sessionSelectors.getUser(state),
  authenticated: sessionSelectors.isAuthenticated(state),
});

class Meals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantList: []
    }
  }

  componentDidMount = async () => {
    const { data } = await axios.get('/restaurant');
    this.setState({
      restaurantList: data
    })
  }

  render () {
    if (isEmpty(this.state.restaurantList)) {
      const animationOptionsLoading = {
          loop: true,
          autoplay: true,
          animationData: loadingAnimationData,
          renderSettings: {
            preserveAspectRatio: 'xMidYMid slice'
          }
      }
      return(<Lottie style= {{marginTop: '12rem'}}options={animationOptionsLoading} width={100} height={100}/>)
    }
    return (
      <Container>
        <Row>
          <h1 id="title-available">Participating Restaurants</h1>
        </Row>
        <Row>
          {this.state.restaurantList.map((restaurant, i) =>  {
            return <Col>
              <RestaurantCard img = {restaurant.image} name = {restaurant.name} key = {i} />
            </Col>;
          })}
        </Row>
      </Container>
    );
  }
}

export default connect(mapStateToProps)(Meals);
