import React, { Component } from 'react';
import { connect } from 'react-redux';
import chooseNavbar from '../../components/NavBar/chooseNavBar'

const mapStateToProps = (state) => ({
  user: state.session.user,
  authenticated: state.session.authenticated,
  type: state.type
})

class Donate extends Component {
  render () {
    return (
      <div>
        {chooseNavbar(this.props.user, this.props.authenticated, this.props.type)}
        DONATE!!
      </div>
    )
  }
}

export default connect(mapStateToProps)(Donate);
