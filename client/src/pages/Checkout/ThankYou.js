import React, { Component } from 'react'
import '../../styles/thankyou.css';

//Components
import {Card, Container} from 'react-bootstrap';

import Map from '../../resources/pickup-location.png';

class ThankYou extends Component {

    render() {
        return(
          <div id="checkout-thankyou-container">
            <p id="thankyou-header">Good things are on their way...</p><br/>
            <p id="thankyou-caption">Thanks for your order! You should receive an email confirmation soon. In the meantime, you can check your current and previous orders under your profile.
            We appreciate your dedication in making the world a happier and less hungry place! 😋</p>

            <p id="pickup-title">Pickup Instructions</p>
              <p id="pickup-time">Time: 9:30PM</p>
              <p id="pickup-location">Location: <a target="_blank" href="https://www.google.com/maps/dir//36.0015411,-78.9412005/@36.0016192,-78.9420964,18z">Bryan Center Circle</a></p>
              <a target="_blank" href="https://www.google.com/maps/dir//36.0015411,-78.9412005/@36.0016192,-78.9420964,18z">
            <img id="pickup-map" src={Map}/>
            </a>
          </div>
        )
    }
}

export default ThankYou
