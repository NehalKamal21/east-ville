import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Alert, Card } from "react-bootstrap";

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(""); // Reset errors before login attempt

        try {
            const response = await axios.post(
                "http://localhost:5000/login",
                { email, password }, // Make sure these fields exist
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true  // Include credentials if needed
                }
            );
            if (response.data.token) {
                Cookies.set("token", response.data.token, { expires: 7 }); // Store token in cookies (valid for 7 days)
                navigate("/"); // Redirect after login
            } else {
                setError("Invalid credentials, please try again.");
            }
        } catch (err) {
            setError("Login failed. Please check your credentials.");
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundImage: "url('https://th.bing.com/th/id/OIP.ZA0_SwoDzb_B3xrqf6NI9gHaEJ?rs=1&pid=ImgDetMain')", backgroundSize: "cover", backgroundPosition: "center" }}>
            <Card style={{ width: "25rem", padding: "20px" }}>
                <Card.Body>
                    <h2 className="text-center">Login</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleLogin}>
                        <Form.Group controlId="formEmail" className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword" className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">
                            Login
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Login;
