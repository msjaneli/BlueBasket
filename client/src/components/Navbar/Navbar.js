import React, { Component } from 'react';

// Components
import NavbarStandard from './NavbarStandard';
import NavbarUser from './NavbarUser';
import NavbarRestaurant from './NavbarRestaurant';

// Selectors
import * as sessionSelectors from '../../selectors/sessionSelectors';

// Tools
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    authenticated: sessionSelectors.isAuthenticated(state),
    user: sessionSelectors.getUser(state)
})

class Navbar extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        if (!this.props.authenticated) {
            return(<NavbarStandard/>)
        } else {
            var name = this.props.user.name.split(" ")[0]
            if (this.props.user.type === "USER") {
                return(<NavbarUser name = {name}/>);
            } else {
                return(<NavbarRestaurant name = {name}/>);
            }
        }
    }
}

export default connect(mapStateToProps)(Navbar);
