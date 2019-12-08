import React, { Component } from "react";
import '../../styles/profile.css'

// Components
import { Button, Alert, Card, DropdownButton, Form, Dropdown, Row, Col, Container } from "react-bootstrap";
import NumericInput from 'react-numeric-input';


// Actions
import { logoutUser } from "../../actions/auth/logout";

// Selectors
import * as sessionSelectors from "../../selectors/sessionSelectors";

// Tools
import { connect } from "react-redux";
import axios from "axios";
import isEmpty from "../../validation/isEmpty";

const mapStateToProps = state => ({
  user: sessionSelectors.getUser(state),
  authenticated: sessionSelectors.isAuthenticated(state)
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutUser())
});

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant_listing: {},
      form: {
        name: '',
        description: '',
        allergens: '',
        type: '',
        quantity: 1,
        price: 1
      }
    };
  }

  componentDidMount = async () => {

  };

  onChange = e => {
    this.setState({form: {
      [e.target.name]: e.target.value
      }})
  };

  handleSubmit = e => {
    e.preventDefault();
    const id = this.props.user.id;
    console.log(this.state.form);
    axios.post('/' + id + '/create', this.state.form).then((res, err) => {
      console.log(res);
      console.log(err);
    }).catch(error => (
      error.response.data.error
    ))
  };

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

  render() {
    return (
      <div>
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
        <Card className="existing-listing">

        </Card>
        <Card className="add-listing">
          <Container>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Name of your meal</Form.Label>
                <Form.Control type="text" placeholder="Enter meal" name="name" onChange={this.onChange} />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="Description" name="description" onChange={this.onChange} />
              </Form.Group>

              <DropdownButton name="type" onChange={this.onChange} title="Meal Type">
                <Dropdown.Item href="#/action-1">Meat</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Vegan</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Vegetarian</Dropdown.Item>
              </DropdownButton>

              <DropdownButton name="allergens" onChange={this.onChange} title="Allegiance">
                <Dropdown.Item href="#/action-1">Meat</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Vegan</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Vegetarian</Dropdown.Item>
              </DropdownButton>

              Quantity: <NumericInput name="quantity" min = {1} precision={0} value={this.state.form.quantity} />
              Price: <NumericInput name="price" min={1} precision={0} value={this.state.form.price} /> $

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Container>
        </Card>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
