import React, { Component } from 'react';

// Components
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// Selectors
import * as sessionSelectors from '../../selectors/sessionSelectors'

// Tools
import { connect } from 'react-redux';
import Lottie from 'react-lottie';
import heartAnimationData from '../../resources/lotties/thankyou/7500-heart.json';


// Styles
import '../../styles/thankyou.css';

const mapStateToProps = (state) => ({
  user: sessionSelectors.getUser(state),
  authenticated: sessionSelectors.isAuthenticated(state),
})

class ThankYou extends Component {

  render () {

    const animationOptionsHeart = {
        loop: false,
        autoplay: true,
        animationData: heartAnimationData,
        renderSettings: {
          preserveAspectRatio: 'xMidYMid slice'
      }
    }

      let heartAnimation = <Lottie style={{"margin-bottom": "10px"}} options = {animationOptionsHeart} width = {300}  height = {300} />
    return (
      <div>
      <div id="thankyou-text">
      <div id="thankyou-header">Thank you!</div>
      <div id="thankyou-descr">
      <div id="txt">Thank you for joining us in delivering positive change to the world.
      We appreciate your contribution, and you can be rest assured your money is going to a great cause.
      As a token of our appreciation, <div className="highlight">enjoy 10% off your next meal.</div></div></div></div>
      <div id = "lottie">
      { heartAnimation }
      </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(ThankYou);
