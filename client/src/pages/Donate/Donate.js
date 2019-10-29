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

class Donate extends Component {
  render () {
    return (
      <div>
        DONATE!!
      </div>
    )
  }
}

export default connect(mapStateToProps)(Donate);
