import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import AuthService from "../services/auth-service";

function Header({ currentUser, setCurrentUser }) {
  const handleLogout = () => {
    AuthService.logout(); //清空 localStorage
    window.alert("登出成功！");
    setCurrentUser(null);
  };
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
            {currentUser ? (
              <>
                <Nav.Link to="/profile" as={Link} className="mx-2">
                  Profile
                </Nav.Link>
                <Nav.Link to="/post" as={Link} className="mx-2">
                  Post
                </Nav.Link>
                <Nav.Link
                  to="/"
                  as={Link}
                  className="mx-2"
                  onClick={handleLogout}
                >
                  Logout
                </Nav.Link>
              </>
            ) : (
              <Nav.Link to="/login" as={Link} className="mx-2">
                Login
              </Nav.Link>
            )}
          </div>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
