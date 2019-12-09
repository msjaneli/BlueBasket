import React, { Component } from 'react';
import '../../styles/orders.css'

// Components 
import { Container, Row, Col, Alert, Card, Button } from 'react-bootstrap';
import RestaurantOrderCard from '../../components/Profile/RestaurantOrderCard'

// Selectors
import * as sessionSelectors from '../../selectors/sessionSelectors'

// Tools
import isEmpty from "../../validation/isEmpty";
import { connect } from 'react-redux';
import axios from 'axios'
import Lottie from 'react-lottie';
import loadingAnimationData from '../../resources/lotties/loading/117-progress-bar.json';

const mapStateToProps = (state) => ({
    user: sessionSelectors.getUser(state)
})

class RestaurantOrder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            view: 'pending',
            pendingOrders: [],
            noPendingOrders: false,
            acceptedOrders: [],
            noAcceptedOrders: false,
            completedOrders: [],
            noCompletedOrders: false,
        }
    }

    componentDidMount = async () => {
        var { data } = await axios.get('/order/restaurant/' + this.props.user.id + '/pending')
        if (isEmpty(data)) {
            this.setState({
                noPendingOrders: true
            })
        } else {
            data.sort((a, b) => {
                a = Date.parse(a.timestamp)
                b = Date.parse(b.timestamp)
                return b - a;
              })
            this.setState({
                pendingOrders: data
            })
        }
        var { data } = await axios.get('/order/restaurant/' + this.props.user.id + '/accepted')
        if (isEmpty(data)) {
            this.setState({
                noAcceptedOrders: true
            })
        } else {
            data.sort((a, b) => {
                a = Date.parse(a.timestamp)
                b = Date.parse(b.timestamp)
                return b - a;
              })
            this.setState({
                acceptedOrders: data
            })
        }
        var { data } = await axios.get('/order/restaurant/' + this.props.user.id + '/completed')
        if (isEmpty(data)) {
            this.setState({
                noCompletedOrders: true
            })
        } else {
            data.sort((a, b) => {
                a = Date.parse(a.timestamp)
                b = Date.parse(b.timestamp)
                return b - a;
              })
            this.setState({
                completedOrders: data
            })
        }
        this.timer = setInterval(async () => await this.getPending(), 1000);
    }

    componentWillUnmount= () => {
        this.timer = null;
    }

    getPending = async () => {
    
       var {data} =  await axios.get('/order/restaurant/' + this.props.user.id + '/pending');
       if (!isEmpty(data)) {
        this.setState({
            pendingOrders: data,
            noPendingOrders: false
        })
       } else {
           this.setState({
               pendingOrders: data,
               noPendingOrders: true
           })
       }
    }

    setView = (view) => {
        this.setState({
            view: view
        })
    }

    acceptOrder = async (order, index) => {
        try {
            await axios.put('/order/' + order.oid + '/' + order.rid + '/accept', {phoneNumber: order.phone})
        } catch (err) {
            console.log(err);
        }
       
        this.setState({
            pendingOrders: this.state.pendingOrders.filter((_, i) => i !== index),
            acceptedOrders: [...this.state.acceptedOrders, order],
            noAcceptedOrders: false,
            view: 'accepted'
        })

        if(isEmpty(this.state.pendingOrders)) {
            this.setState({
                noPendingOrders: true
            })
        }
    }

    markAsComplete = async (order, index) => {
        try {
            await axios.put('/order/' + order.oid + '/' + order.rid + '/complete', {phoneNumber: order.phone})
        } catch (err) {
            console.log(err);
        }

        this.setState({
            acceptedOrders: this.state.acceptedOrders.filter((_, i) => i !== index),
            completedOrders: [...this.state.completedOrders, order],
            noCompletedOrders: false,
            view: 'completed'
        })

        if (isEmpty(this.state.acceptedOrders)) {
            this.setState({
                noAcceptedOrders: true
            })
        }
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

        let pendingOrders;
        let acceptedOrders;
        let completedOrders;

        if (isEmpty(this.state.pendingOrders) && !this.state.noPendingOrders) {
            pendingOrders = <Lottie options={animationOptionsLoading} width={100} height={100}/>
        } else if (this.state.noPendingOrders) {
            pendingOrders = <Alert variant='danger' style={{textAlign: 'center'}}> No pending orders </Alert>
        } else {
            pendingOrders = 
                <div>
                    {
                        this.state.pendingOrders.map((order, i) => {
                        let foodpointsData = !isEmpty(order.foodpoints_details) ? <div><p>Card Number: {order.foodpoints_details[0]}</p> <p>Pin: {order.foodpoints_details[1]}</p> </div> : null
                            return(
                                <Row key={i}>
                                    <Card body className='wrapper-card'>
                                        <Row>
                                            <Col>
                                                <p className='timestamp' style={{textAlign:'left'}}> Order on: {order.timestamp} </p>
                                                <p style={{textAlign:'left'}}>Total: ${order.total}</p>
                                                {foodpointsData}
                                            </Col>
                                            <Col className='text-right'>
                                                <Button variant='primary' onClick={() => this.acceptOrder(order, i)}>
                                                    Accept Order
                                                </Button>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>

                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                {
                                                    order.lids.map((lid, j) => {
                                                        return(
                                                            <Row key={j}>
                                                                <Col>
                                                                    <RestaurantOrderCard order = {order} orderIndex = {j}/>
                                                                </Col>
                                                            </Row>
                                                        )
                                                    })
                                                }
                                            </Col>
                                        </Row>
                                    </Card>
                                </Row>
                            )
                        })
                    }

                </div>
        }

        if (isEmpty(this.state.acceptedOrders) && !this.state.noAcceptedOrders) {
            acceptedOrders = <Lottie options={animationOptionsLoading} width={100} height={100}/>
        } else if (this.state.noAcceptedOrders) {
            acceptedOrders = <Alert variant='danger' style={{textAlign: 'center'}}> No accepted orders </Alert>
        } else {
            acceptedOrders = 
                <div>
                    {
                        this.state.acceptedOrders.map((order, i) => {
                        let foodpointsData = !isEmpty(order.foodpoints_details) ? <div><p>Card Number: {order.foodpoints_details[0]}</p> <p>Pin: {order.foodpoints_details[1]}</p> </div> : null
                            return(
                                <Row key={i}>
                                    <Card body className='wrapper-card'>
                                        <Row>
                                            <Col>
                                                <p className='timestamp' style={{textAlign:'left'}}> Order on: {order.timestamp} </p>
                                                <p style={{textAlign:'left'}}>Total: ${order.total}</p>
                                                {foodpointsData}
                                            </Col>
                                            <Col className='text-right'>
                                                <Button variant='primary' onClick={() => this.markAsComplete(order, i)}>
                                                    Mark as Completed
                                                </Button>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>

                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                {
                                                    order.lids.map((lid, j) => {
                                                        return(
                                                            <Row key={j}>
                                                                <Col>
                                                                    <RestaurantOrderCard order = {order} orderIndex = {j}/>
                                                                </Col>
                                                            </Row>
                                                        )
                                                    })
                                                }
                                            </Col>
                                        </Row>
                                    </Card>
                                </Row>
                            )
                        })
                    }

                </div>
        }

        if (isEmpty(this.state.completedOrders) && !this.state.noCompletedOrders) {
            completedOrders = <Lottie options={animationOptionsLoading} width={100} height={100}/>
        } else if (this.state.noCompletedOrders) {
            completedOrders = <Alert variant='danger' style={{textAlign: 'center'}}> No completed orders </Alert>
        } else {
            completedOrders = 
                <div>
                    {
                        this.state.completedOrders.map((order, i) => {
                        let foodpointsData = !isEmpty(order.foodpoints_details) ? <div><p>Card Number: {order.foodpoints_details[0]}</p> <p>Pin: {order.foodpoints_details[1]}</p> </div> : null
                            return(
                                <Row key={i}>
                                    <Card body className='wrapper-card'>
                                        <Row>
                                            <Col>
                                                <p className='timestamp' style={{textAlign:'left'}}> Order on: {order.timestamp} </p>
                                                <p style={{textAlign:'left'}}>Total: ${order.total}</p>
                                                {foodpointsData}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>

                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                {
                                                    order.lids.map((lid, j) => {
                                                        return(
                                                            <Row key={j}>
                                                                <Col>
                                                                    <RestaurantOrderCard order = {order} orderIndex = {j}/>
                                                                </Col>
                                                            </Row>
                                                        )
                                                    })
                                                }
                                            </Col>
                                        </Row>
                                    </Card>
                                </Row>
                            )
                        })
                    }

                </div>
        }

        let pendingSection = this.state.view === 'pending' ? 
        (<Row>
            <Col>
                <p><b>Pending Orders</b></p>
                {pendingOrders}
            </Col>
        </Row> ) : null

        let acceptedSection = this.state.view === 'accepted' ? 
        (<Row>
            <Col>
                <p><b>Accepted Orders</b></p>
                {acceptedOrders}
            </Col>
        </Row> ) : null

        let completedSection = this.state.view === 'completed' ? 
        (<Row>
            <Col>
                <p><b>Completed Orders</b></p>
                {completedOrders}
            </Col>
        </Row> ) : null

        return(
            <Container>
                <Row style={{marginTop: '3rem'}}>
                    <Col className='text-left'>
                        <p className='user-order-card-restaurant'>Manage Orders</p>
                        <Row style={{marginBottom: '2rem'}}>
                            <Col>
                                <button className='snack-bar' onClick={() => this.setView('pending')}>Pending</button>
                                <button className='snack-bar' onClick={() => this.setView('accepted')}>Accepted</button>
                                <button className='snack-bar' onClick={() => this.setView('completed')}>Completed</button>
                            </Col>
                        </Row>
                        {pendingSection}
                        {acceptedSection}
                        {completedSection}
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default connect(mapStateToProps)(RestaurantOrder);