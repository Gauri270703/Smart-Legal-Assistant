import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Css/Header.css';

const Footer = () => {
  return (
    <Navbar
      fixed="bottom"
      style={{
        backgroundColor: "#141e2e",
        textAlign: "center",
        padding: "10px 0",
        marginTop: "40px",
      
      }}
      variant="dark"
    >
      <Container className="justify-content-center">
        <Nav className="mx-auto text-center gap-5" style={{ color: "white" }}>
          <Nav.Link as={Link} to="/web-policies" style={{ color: "white" }}>
  Website Policies
</Nav.Link>

<Nav.Link as={Link} to="/disclaimer" style={{ color: "white" }}>
  Disclaimer
</Nav.Link>

<Nav.Link as={Link} to="/contactUs" style={{ color: "white" }}>
  Contact Us
</Nav.Link>

<Nav.Link as={Link} to="/feedback" style={{ color: "white" }}>
  Feedback
</Nav.Link>
<Nav.Link as={Link} to="/faqs" style={{ color: "white" }}>
  Faqs
</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Footer;