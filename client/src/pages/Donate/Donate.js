import React, { Component } from 'react';

// Components
import chooseNavbar from '../../components/NavBar/chooseNavBar'

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
        {chooseNavbar(this.props.user, this.props.authenticated)}
        DONATE!!
      </div>
    )
  }
}

export default connect(mapStateToProps)(Donate);
