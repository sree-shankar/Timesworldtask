import React, { useState } from "react";
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Alert,
    InputGroup,
    Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./loginpages.css";
import pic from "../assets/pic.png";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [showAlert, setShowAlert] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const validatePassword = (password) => {
        const regex =
            /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
        return regex.test(password);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let formErrors = {};

        if (!email) formErrors.email = "Email is required";
        if (!password) formErrors.password = "Password is required";
        else if (!validatePassword(password)) {
            formErrors.password =
                "Password must be at least 8 characters long, include 1 capital letter, 1 number, and 1 symbol";
        }

        setErrors(formErrors);

        if (Object.keys(formErrors).length === 0) {
            setShowAlert(false);
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                navigate("/home");
            }, 2000);
        } else {
            setShowAlert(true);
        }
    };

    return (
        <Container fluid className="login-container">
            {isLoading && (
                <div className="loading-overlay">
                    <div className="text-center">
                        <Spinner
                            animation="border"
                            variant="primary"
                            style={{ width: "4rem", height: "4rem" }}
                        />
                        <p className="mt-3">Loading countries...</p>
                    </div>
                </div>
            )}
            <div
                className={`d-flex w-100 justify-content-center align-items-center ${
                    isLoading ? "opacity-25 pointer-events-none" : ""
                }`}
            >
                <Row className="login-card">
                    <Col md={6} className="form-side">
                        <h3 className="mb-2 fw-bold">Sign In</h3>
                        <p className="mb-4">
                            New user?{" "}
                            <a href="#" className="text-primary">
                                Create an account
                            </a>
                        </p>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group
                                controlId="formBasicEmail"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="email"
                                    placeholder="Username or email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email && (
                                    <div className="text-danger small">
                                        {errors.email}
                                    </div>
                                )}
                            </Form.Group>

                            <Form.Group
                                controlId="formBasicPassword"
                                className="mb-3"
                            >
                                <InputGroup>
                                    <Form.Control
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                    <Button
                                        variant="outline-secondary"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </Button>
                                </InputGroup>
                                {errors.password && (
                                    <div className="text-danger small">
                                        {errors.password}
                                    </div>
                                )}
                            </Form.Group>

                            <Form.Group
                                controlId="formBasicCheckbox"
                                className="mb-3"
                            >
                                <Form.Check
                                    type="checkbox"
                                    label="Keep me signed in"
                                />
                            </Form.Group>

                            <Button
                                variant="dark"
                                type="submit"
                                className="w-100"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <Spinner
                                        animation="border"
                                        size="sm"
                                        className="me-2"
                                    />
                                ) : null}
                                {isLoading ? "Signing In..." : "Sign In"}
                            </Button>

                            {showAlert && (
                                <Alert variant="danger" className="mt-3">
                                    Please fix the errors above.
                                </Alert>
                            )}

                            <div className="divider">
                                <span>Or Sign In With</span>
                            </div>
                            <div className="d-flex justify-content-between social-icons">
                                <i className="bi bi-google"></i>
                                <i className="bi bi-facebook"></i>
                                <i className="bi bi-linkedin"></i>
                                <i className="bi bi-twitter"></i>
                            </div>
                        </Form>
                    </Col>
                    <Col md={6} className="image-side">
                        <img
                            src={pic}
                            alt="Illustration"
                            className="login-illustration"
                        />
                        <i className="bi bi-key-fill login-key-icon"></i>
                    </Col>
                </Row>
            </div>
        </Container>
    );
};

export default Login;
