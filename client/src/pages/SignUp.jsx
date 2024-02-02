import { useState } from "react";
import Button from "react-bootstrap/Button";
import { InputGroup, Alert } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import AuthService from "../services/auth-service";
import Swal from "sweetalert2";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [message, setMessage] = useState("");

  const navigete = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // Check if passwords match when the user types
    setPasswordsMatch(e.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    // Check if passwords match when the user types
    setPasswordsMatch(e.target.value === password);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (passwordsMatch) {
      console.log("Form submitted successfully!");
    } else {
      return;
    }
    AuthService.signup(name, email, password)
      .then(() => {
        Swal.fire({
          title: "Good job!",
          text: "註冊成功，可以登入了！",
          icon: "success",
        });
        navigete("/login");
      })
      .catch((e) => setMessage(e.response.data));
  };

  return (
    <main
      style={{ width: "100%" }}
      className="d-flex justify-content-center my-5 align-items-center"
    >
      <Form onSubmit={(e) => submitHandler(e)}>
        {message && (
          <Alert variant="danger" className="mt-2">
            {message}
          </Alert>
        )}
        <h2 className="d-flex justify-content-center">Sign up</h2>
        <Form.Group className="mb-3 mt-4" controlId="formBasicEmail">
          <Form.Label className="fs-3">Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Label className="fs-3">Email</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className="fs-3">Password</Form.Label>
          <InputGroup>
            <Form.Control
              required
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={handlePasswordChange}
            />
            <Button
              variant="outline-secondary"
              onClick={togglePasswordVisibility}
              size="sm"
            >
              {showPassword ? <Eye /> : <EyeSlash />}
            </Button>
          </InputGroup>
          <Form.Label className="fs-3"> Check password</Form.Label>
          <InputGroup>
            <Form.Control
              required
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Enter password again"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            <Button
              variant="outline-secondary"
              onClick={toggleConfirmPasswordVisibility}
              size="sm"
            >
              {showConfirmPassword ? <Eye /> : <EyeSlash />}
            </Button>
          </InputGroup>
          {!passwordsMatch && (
            <Alert variant="danger" className="mt-2">
              Passwords do not match!
            </Alert>
          )}
          <InputGroup className="d-flex justify-content-center align-items-center mt-2">
            <p className="align-middle m-1">Already have an account?</p>
            <Button variant="link" as={Link} to="/login">
              Log in
            </Button>
          </InputGroup>
        </Form.Group>
        <div className="d-flex justify-content-center">
          <Button
            variant="warning"
            type="submit"
            className="fs-5 mt-2"
            size="sm"
          >
            Sign up
          </Button>
        </div>
      </Form>
    </main>
  );
};

export default SignUp;
