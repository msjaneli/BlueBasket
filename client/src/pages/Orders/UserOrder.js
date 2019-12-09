import React, { Component } from 'react';
import '../../styles/orders.css'

// Components
import UserOrderCard from '../../components/Profile/UserOrderCard'
import { Alert } from 'react-bootstrap';
import { Container, Row, Col, Card} from 'react-bootstrap';

// Selectors
import * as sessionSelectors from '../../selectors/sessionSelectors'

// Tools
import { connect } from 'react-redux';
import classnames from 'classnames';
import axios from 'axios';
import Lottie from 'react-lottie';
import loadingAnimationData from '../../resources/lotties/loading/117-progress-bar.json';
import isEmpty from '../../validation/isEmpty';

const mapStateToProps = (state) => ({
  user: sessionSelectors.getUser(state),
  authenticated: sessionSelectors.isAuthenticated(state)
})

class UserOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
          view: 'current',
          currentOrders: [],
          noCurrentOrders: false,
          pastOrders: [],
          noPastOrders: false,
        }
    }

    componentDidMount = async () => {
       var { data } = await axios.get('/order/current/'+this.props.user.id);
       if (isEmpty(data)) {
          this.setState({
            noCurrentOrders: true
          })
       } else {
          data.sort((a, b) => {
            a = Date.parse(a.timestamp)
            b = Date.parse(b.timestamp)
            return b - a;
          })
        this.setState({
          currentOrders: data
        })
       }
       var { data } = await axios.get('/order/past/'+this.props.user.id);
       if(isEmpty(data)) {
         this.setState({
           noPastOrders: true
         })
       } else {
          data.sort((a, b) => {
            a = Date.parse(a.timestamp)
            b = Date.parse(b.timestamp)
            return b - a;
          })
          this.setState({
            pastOrders: data
          })
       }
   }

   setView = (view) => {
        this.setState({
            view: view
        })
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
        currentOrders = <Alert variant='danger' style={{textAlign: 'center'}}> Oops! Looks like you don't have any live orders at this time </Alert>
      } else {
        currentOrders =
          <div>
            {this.state.currentOrders.map((order, i) =>  {
              return(
                <Row key={i}>
                    <Card body className = "wrapper-card">
                      <Row>
                        <Col>
                          <p className='timestamp' style={{textAlign:'left'}}> Order on: {order.timestamp} </p>
                          <p style={{textAlign:'left'}}>Total: ${order.total}</p>
                        </Col>
                        <Col className='text-right'>
                          <p style={{display: 'inline-block'}}>Status: </p>
                          <p className={classnames({
                          "pending" : order.status === 'Pending',
                          "accepted" : order.status === 'Accepted'
                        })} style={{display: 'inline-block'}}> &nbsp;{order.status} </p>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
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

                    </Card>
                </Row>
              );
            })}
          </div>
      }

      if (isEmpty(this.state.pastOrders) && !(this.state.noPastOrders)) {
        pastOrders = <Lottie options={animationOptionsLoading} width={100} height={100}/>
      } else if ((this.state.noPastOrders)) {
        pastOrders = <Alert variant='danger' style={{textAlign: 'center'}}> Oops! Looks like you don't have any past or completed at this time </Alert>
      } else {
        pastOrders =
        <div>
        {this.state.pastOrders.map((order, i) =>  {
          return(
            <Row key={i}>
              <Card body className = "wrapper-card">
                <Row>
                  <Col>
                    <p className='timestamp' style={{textAlign:'left'}}> Order on: {order.timestamp} </p>
                  </Col>
                  <Col className='text-right'>
                    <p style={{display: 'inline-block'}}>Status: </p>
                    <p className={classnames({
                      "completed" : order.status === 'Completed',
                      "cancelled" : order.status === 'Cancelled'
                    })} style={{display: 'inline-block'}}> &nbsp;{order.status} </p>
                  </Col>
                </Row>
                <Row>
                  <Col>
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
              </Card>
            </Row>
          );
        })}
      </div>
      }

      let currentSection = this.state.view === 'current' ?
        (
          <Row>
            <Col>
                <p><b>Current Orders</b></p>
                  <a class="no-highlight" href="/checkout/thankyou">
                {currentOrders}
                </a>
            </Col>
            </Row>
    ) : null

        let pastSection = this.state.view === 'past' ?
        (<Row>
            <Col>
                <p><b>Past Orders</b></p>
                {pastOrders}
            </Col>
        </Row> ) : null

      return (
        <Container>
                <Row style={{marginTop: '3rem'}}>
                    <Col className='text-left'>
                        <p className='user-order-card-restaurant'>View Orders</p>
                        <Row style={{marginBottom: '2rem'}}>
                            <Col>
                                <button className='snack-bar' onClick={() => this.setView('current')}>Current</button>
                                <button className='snack-bar' onClick={() => this.setView('past')}>Past</button>
                            </Col>
                        </Row>
                        {currentSection}
                        {pastSection}
                    </Col>
                </Row>
            </Container>
      );
    }
}

export default connect(mapStateToProps)(UserOrder);
