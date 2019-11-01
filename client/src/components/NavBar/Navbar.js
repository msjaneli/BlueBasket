import React, { Component } from 'react';

// Components
import NavbarStandard from './NavbarStandard';
import NavbarUser from './NavbarUser';
import NavbarRestaurant from './NavbarRestaurant';

// Selectors
import * as sessionSelectors from '../../selectors/sessionSelectors';
import * as routerSelectors from '../../selectors/routerSelectors';

// Tools
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    authenticated: sessionSelectors.isAuthenticated(state),
    user: sessionSelectors.getUser(state),
    url: routerSelectors.getUrl(state)
})

class Navbar extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        let hidden = this.props.url === "/login/user" || this.props.url === "/login/restaurant";

        if (hidden) {
            return (<div></div>)
        }

        if (!this.props.authenticated) {
            return(<NavbarStandard/>)
        } else {
            if (this.props.user.type === "USER") {
                return(<NavbarUser name = {this.props.user.name.split(" ")[0]}/>);
            } else {
                return(<NavbarRestaurant name = {this.props.user.name}/>);
            }
        }
    }
}

export default connect(mapStateToProps)(Navbar);
