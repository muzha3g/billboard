import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { InputGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const Login = () => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const navigate = useNavigate();

  const toSignup = () => {
    navigate("/signup");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:4000/auth/login/", {
      email: account,
      password,
    });
    setAccount("");
    setPassword("");
    navigate("/");
  };

  return (
    <main
      style={{ width: "100%" }}
      className="d-flex justify-content-center mt-5 align-items-center"
    >
      <Form onSubmit={(e) => submitHandler(e)}>
        <h2 className="d-flex justify-content-center">Log in</h2>
        <Form.Group className="mb-3 mt-4" controlId="formBasicEmail">
          <Form.Label className="fs-3">Email</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter email"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              variant="outline-secondary"
              onClick={togglePasswordVisibility}
              size="sm"
            >
              {showPassword ? <Eye /> : <EyeSlash />}
            </Button>
          </InputGroup>
          <InputGroup className="d-flex justify-content-center align-items-center mt-2">
            <p className="align-middle m-1">Didn't have account?</p>
            <Button variant="link" onClick={toSignup}>
              Sign up
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
            Log in
          </Button>
        </div>
      </Form>
    </main>
  );
};

export default Login;
