import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import classes from "./Navbar.module.css";

const MyNavbar = (props) => {
  return (
    <Navbar expand="sm" className={classes.navbar}  >
      <Container>
        <Navbar.Brand href="#">
          Job Offers
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={`me-auto ${classes["nav-links"]}`}>
            <Link to="/" className={classes["nav-link"]}>
              Home
            </Link>
            <Link to="/createOffer" className={classes["nav-link"]}>
              Create Offer
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
