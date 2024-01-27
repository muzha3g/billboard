import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary shadow-sm"
      style={{ fontSize: "1.25rem" }}
    >
      <Container>
        <Navbar.Brand to="/" as={Link}>
          <p className="fs-3 m-0 p-0">Billboard</p>
        </Navbar.Brand>
        <Nav>
          <div className="d-flex">
            <Nav.Link to="/post" as={Link} className="mx-2">
              Post
            </Nav.Link>
            {/* <Nav.Link to="/login" as={Link} className="mx-2">
              Login
            </Nav.Link> */}
          </div>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
