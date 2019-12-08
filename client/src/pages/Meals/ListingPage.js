import React, { Component } from 'react';
import '../../styles/meals.css';

// Components
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap'
import ListingContainer from '../../components/Meals/ListingContainer'

// Tools
import axios from 'axios'

class ListingPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      restaurant: {},
      listings: [],
    };
  }

  componentDidMount = async () => {
      const { data } = await axios.get('/restaurant/' + this.props.match.params.rid)
      this.setState({
        restaurant: data
      })
    }

  render() {
    return (
      <div style={{marginBottom: '5rem'}}>
        <Container>
          <Row>
              <h2 style={{display:"inline-block"}}id="subtitle-name"><p style={{display: "inline-block", color: "cornflowerblue"}}>{this.state.restaurant.name}</p></h2>
          </Row>
          <Row>
              <h3 id="subtitle-description">{this.state.restaurant.description}</h3>
          </Row>
          <Row style={{marginTop: '1rem'}}>
              <h1 id="title-available">What's on Tonight</h1>
          </Row>
          <Row style={{marginTop: '1.5rem'}}>
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
