import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import AuthService from "../../services/AuthService";
import './NavbarComponent.scss'

export class NavbarComponent extends Component {

    logout = () => {
        AuthService.logout();
        this.props.history.push("/");
    }

    render() {
        return (
            <Navbar className="background pb-navbar" expand="lg">
                <Navbar.Brand>XCIDIC</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse>
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                        <Nav.Link onClick={this.logout}>Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default withRouter(NavbarComponent);