import React, { Component } from 'react';
import '../../styles/meals.css';

// Components
import RestaurantCard from '../../components/Meals/RestaurantCard'
import { Container, Row, Col, Alert} from 'react-bootstrap'

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
      nowEmpty: false,
      restaurantListlater: [],
      laterEmpty: false,
    }
  }

  componentDidMount = async () => {
    setTimeout(async () => {
      var { data } = await axios.get('/restaurant/available-now');
      this.setState({
        restaurantListNow: data
      })
      if(isEmpty(data)) {
        this.setState({
          nowEmpty: true
        })
      }
      var { data } = await axios.get('/restaurant/available-later');
      this.setState({
        restaurantListLater: data
      })
      if(isEmpty(data)) {
        this.setState({
          laterEmpty: true
        })
      }
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

  let availableNow;
  if (isEmpty(this.state.restaurantListNow) && !this.state.nowEmpty) {
    availableNow = <Lottie options={animationOptionsLoading} width={100} height={100}/>
  } else if (this.state.nowEmpty) {
    availableNow = <Alert variant = "danger" style={{marginTop: '2rem'}}>No Live Listings! Please check back later</Alert>
  } else {
    availableNow = 
    <Row>
      {this.state.restaurantListNow.map((restaurant, i) =>  {
        return (
          <Col key={i} md={3} style = {{margin: 'auto'}}>
            <RestaurantCard restaurant = {restaurant} />
          </Col>);
      })}
    </Row>
  }

  let availableLater;
  if (isEmpty(this.state.restaurantListLater) && !this.state.laterEmpty) {
    availableLater = <Lottie options={animationOptionsLoading} width={100} height={100}/>
  } else if (this.state.laterEmpty) {
    availableLater = <Alert variant = "danger" style={{marginTop: '2rem'}}>Looks live all listings are live!</Alert>
  } else {
    availableLater = 
    <Row>
      {this.state.restaurantListLater.map((restaurant, i) =>  {
        return (
          <Col key={i} md={3} style = {{margin: 'auto'}}>
            <RestaurantCard restaurant = {restaurant} />
          </Col>);
      })}
    </Row>
  }

    return (
      <Container>
        <Row>
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
