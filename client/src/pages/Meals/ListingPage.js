import React, { Component } from 'react';
import '../../styles/meals.css';

// Components
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap'
import ListingContainer from '../../components/Meals/ListingContainer'

// Tools
import axios from 'axios'
import Lottie from 'react-lottie'
import loadingAnimationData from '../../resources/lotties/loading/10912-loading.json'
import isEmpty from '../../validation/isEmpty'

class ListingPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      restaurant: {},
      listings: [],
    };
  }

  componentDidMount = async () => {
    setTimeout(async () => {
      const { data } = await axios.get('/restaurant/' + this.props.match.params.rid)
      this.setState({
        restaurant: data
      })
    }, 500)

  }

  render() {
    if (isEmpty(this.state.restaurant)) {
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
      <div style={{marginBottom: '5rem'}}>
        <Container>
          <Row>
              <h1 id="title-available">What's on Tonight</h1>
          </Row>
          <Row>
              <h2 style={{display:"inline-block"}}id="subtitle-restaurant">Delicious meals from <p style={{display: "inline-block", color: "cornflowerblue"}}>{this.state.restaurant.name}</p></h2>
          </Row>
          <Row style={{marginTop: '4rem'}}>
            <Col>
              <ListingContainer rid = {this.state.restaurant.rid} name = {this.state.restaurant.name} />
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
export default ListingPage
