import React, { Component } from "react";
import '../../styles/profile.css'

// Components
import { Button, Alert, Card, Form, Row, Col, Container } from "react-bootstrap";
import NumericInput from 'react-numeric-input';
import Select from 'react-select';

// Actions
import { logoutUser } from "../../actions/auth/logout";

// Selectors
import * as sessionSelectors from "../../selectors/sessionSelectors";

// Tools
import { connect } from "react-redux";
import axios from "axios";
import isEmpty from "../../validation/isEmpty";
import { push } from 'connected-react-router';

const mapStateToProps = state => ({
  user: sessionSelectors.getUser(state),
  authenticated: sessionSelectors.isAuthenticated(state),
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutUser()),
  goToListing: (rid) => dispatch(push('/meals/' + rid))

});

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name: '',
        description: '',
        presetTypes: [],
        preset: '',
        allergens: [],
        type: '',
        quantity: 1,
        price: 1,
        error: ''
    };
  }

  componentDidMount = async () => {
    const { data } = await axios.get('/listing/types/' + this.props.user.id)
    this.setState({presetTypes: data})    

  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
      })
  };

  changePreset = (selectedType) => {
    var presets = selectedType.value.split(" | ")
    var type = { value: presets[1], label: presets[1]}
    this.setState({
      preset: selectedType,
      name: presets[0],
      description: presets[2],
      type: type
    })
  }

  changeType = (selectedType) => {
    this.setState({
      type: selectedType
    })
  }

  changeAllergens = (selectedAllergens) => {
    this.setState({
      allergens: selectedAllergens
    })
  }

  changeQuantity = (valueAsNumber) => {
    if (isEmpty(valueAsNumber)) {
      this.setState({
        quantity: 1,
      })
    } else {
      this.setState({
        quantity: valueAsNumber
      })
    }
  };

  changePrice = (valueAsNumber) => {
    if (isEmpty(valueAsNumber)) {
      this.setState({
        price: 1,
      })
    } else {
      this.setState({
        price: valueAsNumber
      })
    }
  };

  validateInputs = () => {
    return (isEmpty(this.state.name) || isEmpty(this.state.description) || isEmpty(this.state.allergens) || isEmpty(this.state.type))
  }

  createListing = async () => {
    this.setState({
      error: ''
    })

    var allergens = [];

    this.state.allergens.forEach((allergenObj) => {
      allergens.push(allergenObj.value)
    })

    var payload = {
      name: this.state.name.trim(),
      description: this.state.description.trim(),
      allergens: allergens,
      type: this.state.type.value.trim(),
      quantity: this.state.quantity,
      price: this.state.price,
    }

    try {
      await axios.post('/listing/' + this.props.user.id + '/create/', payload);
      this.props.goToListing(this.props.user.id)
    } catch (err) {
      this.setState({
        error: err.response.data.error
      })
    }
  };

  clearForm = () => {
    this.setState({
      name: '',
      description: '',
      preset: '',
      allergens: [],
      type: '',
      quantity: 1,
      price: 1,
      error: ''
    })
  }

  render() {

    const optionsType = [
      { value: 'Meat', label: 'Meat' },
      { value: 'Vegetarian', label: 'Vegetarian'},
      { value: 'Vegan', label: 'Vegan'}
    ]

    const optionsAllergens = [
      { value: 'None', label: 'None'},
      { value: 'Dairy', label: 'Dairy' },
      { value: 'Peanuts', label: 'Peanuts'},
      { value: 'Gluten', label: 'Gluten'},
      { value: 'Soy', label: 'Soy'}
    ]

    var optionsPresets = [];

    this.state.presetTypes.forEach((listing => {
        var count = 0; 
        var selectionString ='';
        for (var key in listing) {
          if (count != 0) {
            selectionString += listing[key] + ' | '
          }
          count ++;
        }
        optionsPresets.push({
          value: selectionString,
          label: selectionString
        })
      })
    )

    let errorAlert = !isEmpty(this.state.error) ? <Alert variant="danger">{this.state.error}</Alert> : null

    return (
      <Container style={{marginBottom: '3rem'}}>
        <Card className="profile-card">
          <h3 className="profile-hello">Welcome {this.props.user.name}</h3>
          <h4 className="profile-userID"> RestaurauntID: {this.props.user.id}</h4>
          <div className="profile-auth">{this.props.authenticated ? <Alert variant='success'>You are authenticated.</Alert>: <Alert variant='error'>Your account has not been authenticated.</Alert>}</div>
          <Button className="profile-logout" variant="profile-logout" onClick={() => this.props.logout()}>Logout</Button>
          <style type="text/css">
            {`
                  .btn-profile-logout {
                      background-color: #5282FF;
                      color: white;
                      font-weight: 400;
                      margin-top: 2vh;
                  }

                  .btn-profile-logout:hover {
                      background-color: #a3bdff;
                      color: white;
                  }
              `}
          </style>
        </Card>
        <Row style={{marginTop: '3rem'}}> 
          <Col className='text-center'>
            {errorAlert}
          </Col>
        </Row>
        <Row>
          <Col className='text-left'>
            <p id="title-restaurant-profile">Create a Listing</p>
            <Form onSubmit={this.handleSubmit}>
              <Form.Label>Create From Previous Listing</Form.Label>
                <Select 
                  value={this.state.preset}
                  onChange={this.changePreset}
                  options={optionsPresets}
                />
              <Form.Group controlId="formBasicEmail" style={{marginTop: '1rem'}}>
                <Form.Label>Name of your meal</Form.Label>
                <Form.Control type="text" name="name" value={this.state.name} onChange={this.onChange} />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" name="description" value={this.state.description} onChange={this.onChange} />
              </Form.Group>

              <Form.Label>Choose Meal Type</Form.Label>
              <Select 
                value={this.state.type}
                onChange={this.changeType}
                options={optionsType}
              />

              <Form.Label style={{marginTop: '1rem'}}>Select Allergens</Form.Label>
              <Select 
                value={this.state.allergens}
                onChange={this.changeAllergens}
                options={optionsAllergens}
                isMulti={true}
              />
              <div style={{marginTop: '1rem'}}>          
                <Form.Label style={{marginRight: '1rem'}}>Quantity</Form.Label>
                <NumericInput name="quantity" min = {1} precision={0} value={this.state.quantity} onChange={(valueAsNumber) => this.changeQuantity(valueAsNumber)} />
                <Form.Label style={{marginLeft: '1rem', marginRight: '1rem'}}>Price ($)</Form.Label>
                <NumericInput name="price" min={1} precision={2} value={this.state.price} onChange={(valueAsNumber) => this.changePrice(valueAsNumber)}/> 

                <Button variant="primary" onClick={() => this.createListing()} disabled={this.validateInputs()} style={{marginLeft: '1rem', marginRight: '1rem'}}>
                  Submit
                </Button>
                <Button variant ='secondary' onClick={() => this.clearForm()}>Clear Form</Button>
              </div>    
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
