import React, { Component } from 'react';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import '../../styles/navbar.css';

class NavBarStandard extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <Navbar id="nav-bar" expand="lg">
                <Navbar.Brand href="/" id="brand"><div id="blue-logo">Blue</div><div id="basket-logo">Basket</div></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto" id="menu-item">
                        <Nav.Link href="/meals" id="meals-menu-item">Meals</Nav.Link>
                        <Nav.Link href="/donate" id="donate-menu-item">Donate</Nav.Link>
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
