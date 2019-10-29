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

class NavbarUser extends Component {

    constructor (props) {
        super(props);
    }

    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">BlueBasket</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                    <Nav.Link href="/meals">Meals</Nav.Link>
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

export default connect(null, mapDispatchToProps)(NavbarUser);