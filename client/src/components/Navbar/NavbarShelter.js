import React, { Component } from 'react';
import '../../styles/navbar.css';

// Components
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';

// Actions
import { logoutUser } from '../../actions/logout';

// Tools
import { connect } from 'react-redux';


 const mapDispatchToProps = (dispatch) => ({
     logout: () => dispatch(logoutUser())
 })

class NavbarShelter extends Component {

    constructor (props) {
        super(props);
    }

    render() {

        let welcomeText = <div style={{display:'inline-block'}}><div style={{display:'inline-block'}}>Hi, </div> <div style={{display:'inline-block', color:'cornflowerblue'}}>{this.props.name}!</div></div>

        return (
            <Navbar fixed="top" id="nav-bar" style={{borderBottom: '0.5px solid #e4e4e4', height: '4.9rem'}} expand="lg">
                <Navbar.Brand href="/" id="brand"><div id="blue-logo-nav">Blue</div><div id="basket-logo-nav">Basket</div></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto" id="menu-item">
                    <Nav.Link href="/meals" id="meals-menu-item">Meals</Nav.Link>
                </Nav>
                <Nav className = "ml-auto">
                    <NavDropdown title={welcomeText} >
                        <NavDropdown.Item href="/profile/shelter">Profile</NavDropdown.Item>
                        <NavDropdown.Item href="/orders">Orders</NavDropdown.Item>
                        <NavDropdown.Item href="/balance">Balance</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={() => this.props.logout()}>Logout</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default connect(null, mapDispatchToProps)(NavbarShelter);
