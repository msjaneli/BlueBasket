import React, { Component } from 'react';

// Components 
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';

// Actions
import { logoutUser } from '../../actions/logout';

// Tools
import { connect } from 'react-redux';


 const mapDispatchToProps = (dispatch) => ({
     logout: () => dispatch(logoutUser())
 })

class NavbarRestaurant extends Component {

    constructor (props) {
        super(props);
    }

    render() {
        return (
            <Navbar fixed="top" id="nav-bar" style={{borderBottom: '0.5px solid #e4e4e4', height: '4.9rem'}} expand="lg">
                <Navbar.Brand href="/" id="brand"><div id="blue-logo-nav">Blue</div><div id="basket-logo-nav">Basket</div></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto" id="menu-item">
                    <Nav.Link href="/meals" id="meals-menu-item">Meals</Nav.Link>
                </Nav>
                <Nav className = "ml-auto">
                    <NavDropdown alignRight title={"Hi, " + this.props.name} >
                        <NavDropdown.Item href="/profile/restaurant">Profile</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={() => this.props.logout()}>Logout</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default connect(null, mapDispatchToProps)(NavbarRestaurant);