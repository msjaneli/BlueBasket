import React, { Component } from 'react';
import '../../styles/meals.css';

// Components
import { Container, Row, Col, Alert } from 'react-bootstrap'
import ListingCard from './ListingCard'

// Tools 
import axios from 'axios'
import Lottie from 'react-lottie'
import loadingAnimationData from '../../resources/lotties/loading/117-progress-bar.json'
import errorAnimationData from '../../resources/lotties/errors/5707-error.json'
import isEmpty from '../../validation/isEmpty'

class ListingContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            noListingsFound: false,
            liveListings: []
        }
    }

    componentDidMount = async () => {
        setTimeout(async () => {
            const { data } = await axios.get('/listing/' + this.props.rid)
            if (isEmpty(data)) {
                this.setState({
                    noListingsFound: true
                })
            } else {
                this.setState({
                    liveListings: data
                })
            }
        }, 600)

    }

    render() {
        if (isEmpty(this.state.liveListings) && !this.state.noListingsFound) {
            const animationOptionsLoading = {
                loop: true,
                autoplay: true,
                animationData: loadingAnimationData,
                renderSettings: {
                  preserveAspectRatio: 'xMidYMid slice'
                }
            }
            return(<Lottie options={animationOptionsLoading} width ={200} height ={200}/>)
        } else if (this.state.noListingsFound) {
            const animationOptionsError = {
                loop: false,
                autoplay: true,
                animationData: errorAnimationData,
                renderSettings: {
                  preserveAspectRatio: 'xMidYMid slice'
                }
            }
            return (
                <Container>
                    <Row className="justify-content-md-center">
                        <Col md={8}>
                            <Alert variant='danger'>
                                Oops! Looks like there aren't any live listings for {this.props.name} at this time
                            </Alert>
                            <Lottie style = {{marginTop: '3rem'}} options={animationOptionsError} width={200} height = {200}/>
                        </Col>
                    </Row>
                </Container>
                )

        } else {
            return (
                <Container> 
                    {this.state.liveListings.map((listing, i) => {
                        return(
                            <Row>
                                <Col>
                                    <ListingCard listing = {listing}/>
                                </Col>
                            </Row>
                        );
                    })}
                </Container>
            )
        }

    }
}

export default ListingContainer

