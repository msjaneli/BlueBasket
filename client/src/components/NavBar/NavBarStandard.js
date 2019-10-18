import React, { Component } from 'react';
import {Navbar, Nav} from 'react-bootstrap';

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
                        <Nav.Link href="/login">Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default NavBarStandard;


