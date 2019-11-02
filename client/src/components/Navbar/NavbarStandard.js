import React, { Component } from 'react';
import '../../styles/navbar.css';

// Components
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';

class NavbarStandard extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <Navbar fixed="top" id="nav-bar" style={{borderBottom: '0.5px solid #e4e4e4', height: '4.9rem'}} expand="lg">
                <Navbar.Brand href="/" id="brand"><div id="blue-logo-nav">Blue</div><div id="basket-logo-nav">Basket</div></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto" id="menu-item">
                        <Nav.Link href="/meals" id="meals-menu-item">Meals</Nav.Link>
                        <Nav.Link href="/donate" id="donate-menu-item">Donate</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link alignRight href="/login/user">
                            <Button  variant = "login-nav" >Log in</Button>
                            <style type="text/css">
                              {`
                                .btn-login-nav {
                                  background-color: cornflowerblue;
                                  color: white;
                                  font-weight: bold;
                                  font-size: 1.1vw;
                                  width: 6rem;
                                  margin-bottom: 0rem;
                                }

                                .btn-login-nav:hover {
                                  color: white;
                                  background-color:#5288e7
                                }
                              `}
                              </style>
                        </Nav.Link>
                        {/* <NavDropdown alignRight title="Login" >
                            <NavDropdown.Item href="/login/restaurant">Restaurant Login</NavDropdown.Item>
                            <NavDropdown.Item  href="/login/user">User Login</NavDropdown.Item>
                        </NavDropdown> */}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default NavbarStandard;
