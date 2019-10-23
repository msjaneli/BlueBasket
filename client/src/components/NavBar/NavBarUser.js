import React, { Component } from 'react';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/logout';

 const mapDispatchToProps = (dispatch) => ({
     logout: () => dispatch(logoutUser())
 })

class NavBarUser extends Component {

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
                    <Nav.Link href="/donate">Donate</Nav.Link>
                </Nav>
                <Nav className = "ml-auto">
                    <NavDropdown alignRight title={"Hi, " + this.props.name} >
                    <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                    <NavDropdown.Item href="/orders">Orders</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={() => this.props.logout()}>Logout</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default connect(null, mapDispatchToProps)(NavBarUser);