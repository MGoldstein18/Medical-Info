import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

//this functional component is the responsive menu made with react bootstrap and links from react router doms
function Menu() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>
        {" "}
        <Link to="/" className="navbar-brand nav-link">
          <b>AMIT</b>
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link>
            <Link to="/popl" className="nav-link">
              What is a Popl?
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="/faq" className="nav-link">
              FAQs
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="/contact" className="nav-link">
              Contact
            </Link>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Menu;
