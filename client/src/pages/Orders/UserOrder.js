import React, { Component } from 'react';
import '../../styles/orders.css'


// Components
import UserOrderCard from '../../components/Profile/UserOrderCard'
import { Button } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { Container, Row, Col} from 'react-bootstrap';

// Actions
import { logoutUser } from '../../actions/auth/logout';

// Selectors
import * as sessionSelectors from '../../selectors/sessionSelectors'

// Tools
import { connect } from 'react-redux';
import axios from 'axios';
import Lottie from 'react-lottie';
import loadingAnimationData from '../../resources/lotties/loading/117-progress-bar.json';
import isEmpty from '../../validation/isEmpty';

const mapStateToProps = (state) => ({
  user: sessionSelectors.getUser(state),
  authenticated: sessionSelectors.isAuthenticated(state)
})

class Order extends Component {

    constructor(props) {
        super(props);
        this.state = {
          curr_orders: [],
          past_orders: []
        }
    }

    componentDidMount = async () => {
     setTimeout(async () => {
       var { data } = await axios.get('/order/user/current/'+this.props.user.id);
       this.setState({
         curr_orders: data
       })
       var { data } = await axios.get('/order/user/past/'+this.props.user.id);
       this.setState({
         past_orders: data
       })
     }, 750);
   }

    render() {
      const animationOptionsLoading = {
        loop: true,
        autoplay: true,
        animationData: loadingAnimationData,
        renderSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    }

      let currentOrders = isEmpty(this.state.curr_orders) ? <Lottie options={animationOptionsLoading} width={100} height={100}/>
        : <Row>
            {this.state.curr_orders.map((order, i) =>  {
              return (
                <Col key={i}>
                  <UserOrderCard order = {order}/>
                </Col>);
            })}
          </Row>

          let pastOrders = isEmpty(this.state.past_orders) ? <Lottie options={animationOptionsLoading} width={100} height={100}/>
            : <Row>
                {this.state.past_orders.map((order, i) =>  {
                  return (
                    <Col key={i}>
                      <UserOrderCard order = {order}/>
                    </Col>);
                })}
              </Row>

          return (
            <Container>
              <Row>
              <h2 id="subtitle-restaurant" style={{marginBottom: '2rem'}}>Current Orders</h2>
              </Row>
              {currentOrders}
              <Row>
                <h2 id="subtitle-restaurant" style={{marginBottom: '2rem'}}>Past Orders</h2>
              </Row>
              {pastOrders}
            </Container>
          );
    }
}

export default connect(mapStateToProps)(Order);
