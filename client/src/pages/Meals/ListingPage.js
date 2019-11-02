import React, { Component } from 'react';

import { Row, Col, Form, Button, Image } from 'react-bootstrap'

class ListingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pricing_list: []
    };
  }
  render() {
    return (
      <div>
        <Row>
          <div id="back-page-button">
            <a href="" />
          </div>
        </Row>
        <Row>
          <Col>
            <div>
              <p>What's on tonight</p>
            </div>
            <div>
              <Form>
                {this.state.restaurant_list.map(function (price, i) {
                  return <Form.Group>
                    <Form.Check type="checkbox" label={price}/>
                  </Form.Group>;
                })}
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </div>
          </Col>
          <Col>
            <Image src=""/>
          </Col>
        </Row>
      </div>
    )
  }
}
export default ListingPage
