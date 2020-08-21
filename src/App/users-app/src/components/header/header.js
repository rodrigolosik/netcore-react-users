import React  from "react";
import './header.css';
import { Navbar, Nav } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/users">crud-users</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Nav className="mr-auto">
            <Nav.Link href={`/add`}>Add New</Nav.Link>
        </Nav>
        <Navbar.Collapse id="responsive-navbar-nav">
        </Navbar.Collapse>
    </Navbar>
);

export default Header;