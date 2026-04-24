import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Css/Header.css";

const Header = ({ user, setUser }) => {
  const navigate = useNavigate();
  const location = useLocation(); 

  // ✅ LOGOUT
  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  // ✅ HOME BUTTON FIX
  const handleHomeClick = () => {
    if (user?.role === "user") {
      navigate("/user");
    } else if (user?.role === "lawyer") {
      navigate("/lawyer");
    } else {
      navigate("/");
    }
  };

  return (
    <Navbar
      expand="lg"
      sticky="top"
      style={{ backgroundColor: "#141e2e" }}
      variant="dark"
    >
      <Container>
        <Navbar.Brand style={{ color: "#D4AF37", fontSize: "20px" }}>
          LEXPERT
          <h6 style={{ color: "white", margin: 0 }}>
            your legal partner
          </h6>
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ms-auto custom-nav">
            
            {/* ✅ HOME */}
            <Nav.Link onClick={handleHomeClick}>Home</Nav.Link>

            <Nav.Link as={Link} to="/about">About us</Nav.Link>
            <Nav.Link as={Link} to="/feature">Feature</Nav.Link>

            {user ? (
              <>
                <span style={{ color: "gold", padding: "8px 12px" }}>
                  Welcome, {user.name}!
                </span>

                <button
                  onClick={handleLogout}
                  style={{
                    marginLeft: "10px",
                    backgroundColor: "#D4AF37",
                    border: "none",
                    borderRadius: "4px",
                    padding: "5px 10px",
                    cursor: "pointer",
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
