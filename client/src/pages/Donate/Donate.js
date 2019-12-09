// TO DO:
//   - FormControl onChange, set calculated # of meals text, set props variables
//   - Button onClick, validate FormControl #, set props variable
//   - Connect to transaction page


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

// Styles
import '../../styles/donate.css';

const mapStateToProps = (state) => ({
  user: sessionSelectors.getUser(state),
  authenticated: sessionSelectors.isAuthenticated(state),
})

class Donate extends Component {
  constructor(props){
    super(props);

    this.state={
      donation: 0,
      meals: 0,
    }
  }

  render () {
    return (
      <div id="donate-container">
      <div id="donate-header">
        Donations go directly to feeding people in need.
      </div>
      <div id="donate-caption">
        Every cent (or food point) donated goes into a fund which local shelters can use to redeem free meals. Whether you’re a Duke student left with excess food points at the end of the semester or a professional who’s just received their bonus, you can be rest assured you’re making a true difference.
      </div>
      <div id="donation-title">
      Donation amount
      </div>
      <div id="donate-form">
      <InputGroup className="mb-3">
   <InputGroup.Prepend>
     <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
   </InputGroup.Prepend>
   <FormControl
  placeholder="0.00"
  aria-label="Donation amount"
  aria-describedby="basic-addon1"
/>
 </InputGroup></div>
  <Button id="donate-submit-button" href="/donate/thankyou">Donate</Button>
  </div>
    )
  }
}

export default connect(mapStateToProps)(Donate);
