import React, { Component } from 'react';
import '../../styles/meals.css';

// Components
import RestaurantCard from '../../components/Meals/RestaurantCard'
import { Container, Row, Col} from 'react-bootstrap'

// Tools
import axios from 'axios'
import Lottie from 'react-lottie'
import loadingAnimationData from '../../resources/lotties/loading/117-progress-bar.json'
import isEmpty from '../../validation/isEmpty'


class Meals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantListNow: [],
      restaurantListlater: [],
    }
  }

  componentDidMount = async () => {
    setTimeout(async () => {
      var { data } = await axios.get('/restaurant/available-now');
      this.setState({
        restaurantListNow: data
      })
      var { data } = await axios.get('/restaurant/available-later');
      this.setState({
        restaurantListLater: data
      })
    }, 750);
  }

  render () {

    const animationOptionsLoading = {
      loop: true,
      autoplay: true,
      animationData: loadingAnimationData,
      renderSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
  }

    let availableNow = isEmpty(this.state.restaurantListNow) ? <Lottie options={animationOptionsLoading} width={100} height={100}/>  
      : <Row>
          {this.state.restaurantListNow.map((restaurant, i) =>  {
            return (
              <Col md={3} style = {{margin: 'auto'}}>
                <RestaurantCard restaurant = {restaurant} key = {i} />
              </Col>);
          })}
        </Row>

    let availableLater = isEmpty(this.state.restaurantListLater) ? <Lottie options={animationOptionsLoading} width={100} height={100}/>  
      : <Row>
          {this.state.restaurantListLater.map((restaurant, i) =>  {
            return (
              <Col md={3} style = {{margin: 'auto'}}>
                <RestaurantCard restaurant = {restaurant} key = {i} />
              </Col>);
          })}
        </Row>

    return (
      <Container>
        <Row>
          <h1 id="title-available">Participating Restaurants</h1>
        </Row>
        <Row>
          <h2 id="subtitle-restaurant">Available Now</h2>
        </Row>
        {availableNow}
        <Row style={{marginTop: '2rem'}}>
          <h2 id="subtitle-restaurant">Available Later</h2>
        </Row>
        {availableLater}
        <Row>
          
        </Row>
      </Container>
    );
  }
}

export default Meals;
