import React, { Component } from 'react';

// Components

// Selectors
import * as sessionSelectors from '../../selectors/sessionSelectors'

// Tools
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  user: sessionSelectors.getUser(state),
  authenticated: sessionSelectors.isAuthenticated(state),
})

class Meals extends Component {
  render () {
    return (
      <div>
        MEALS!!
      </div>
    )
  }
}

export default connect(mapStateToProps)(Meals);
