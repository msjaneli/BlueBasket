import React, { Component } from 'react';

// Components
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';

class NavBarStandard extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">BlueBasket</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/meals">Meals</Nav.Link>
                        <Nav.Link href="/donate">Donate</Nav.Link>
                    </Nav>
                    <Nav>
                        <NavDropdown alignRight title="Login" >
                            <NavDropdown.Item href="/login/restaurant">Restaurant Login</NavDropdown.Item>
                            <NavDropdown.Item  href="/login/user">User Login</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default NavBarStandard;


