import React, { Component } from 'react';
import '../../styles/orders.css'


// Components
import UserOrderCard from '../../components/Profile/UserOrderCard'
import { Alert } from 'react-bootstrap';
import { Container, Row, Col} from 'react-bootstrap';

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
          currentOrders: [],
          noCurrentOrders: false,
          pastOrders: [],
          noPastOrders: false,
        }
    }

    componentDidMount = async () => {
     setTimeout(async () => {
       var { data } = await axios.get('/order/user/current/'+this.props.user.id);
       if (isEmpty(data)) {
         this.setState({
           noCurrentOrders: true
         })
       } else {
        this.setState({
          currentOrders: data
        })
       }
       var { data } = await axios.get('/order/user/past/'+this.props.user.id);
       if(isEmpty(data)) {
         this.setState({
           noPastOrders: true
         })
       } else {
         this.setState({
          pastOrders: data
         })
       }
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

      let currentOrders;
      let pastOrders;

      if (isEmpty(this.state.currentOrders) && !(this.state.noCurrentOrders)) {
        currentOrders = <Lottie options={animationOptionsLoading} width={100} height={100}/>
      } else if ((this.state.noCurrentOrders)) {
        currentOrders = <Alert variant='danger'> Oops! Looks like you don't have any live orders at this time </Alert>
      } else {
        currentOrders = 
          <div>
            {this.state.currentOrders.map((order, i) =>  {
              return(
                <Row key={i}>
                  <Col>
                    <p style={{textAlign:'left'}}> Order on: {order.timestamp} </p>
                    {
                      order.lids.map((lid, j) => {
                        return(
                          <Row>
                            <Col key={j}>
                              <UserOrderCard order = {order} orderIndex = {j}/>
                            </Col>
                          </Row>
                        )
                      })
                    }
                  </Col>
                </Row>
              );
            })}
          </div>
      }

      if (isEmpty(this.state.pastOrders) && !(this.state.noPastOrders)) {
        pastOrders = <Lottie options={animationOptionsLoading} width={100} height={100}/>
      } else if ((this.state.noPastOrders)) {
        pastOrders = <Alert variant='danger'> Oops! Looks like you don't have any past or completed at this time </Alert>
      } else {
        pastOrders = 
          <div>
            {this.state.pastOrders.map((order, i) =>  {
              return(
                <Row key={i}>
                  <Col>
                    <p style={{textAlign:'left'}}> Order on: {order.timestamp} </p>
                    {
                      order.lids.map((lid, j) => {
                        return(
                          <Row>
                            <Col key={j}>
                              <UserOrderCard order = {order} orderIndex = {j}/>
                            </Col>
                          </Row>
                        )
                      })
                    }
                  </Col>
                </Row>
              );
            })}
          </div>
      }

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
