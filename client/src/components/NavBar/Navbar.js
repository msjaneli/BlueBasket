import React, { Component } from 'react';

// Components
import NavBarStandard from './NavbarStandard';
import NavBarUser from './NavbarUser';
import NavBarRestaurant from './NavbarRestaurant';

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
            return(<NavBarStandard/>)
        } else {
            var name = this.props.user.name.split(" ")[0]
            if (this.props.user.type === "USER") {
                return(<NavBarUser name = {name}/>);
            } else {
                return(<NavBarRestaurant name = {name}/>);
            }
        }
    }
}

export default connect(mapStateToProps)(Navbar);