import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Container, Alert, Card } from "react-bootstrap";
import { FaEye, FaEyeSlash, FaUserPlus } from "react-icons/fa";
import { authService, RegisterData } from "../utils/authService";

const Register: React.FC = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "user" // Default role
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return false;
        }
        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters long");
            return false;
        }
        if (!formData.username.trim()) {
            setError("Username is required");
            return false;
        }
        if (formData.username.length < 3) {
            setError("Username must be at least 3 characters long");
            return false;
        }
        return true;
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        
        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            const userData: RegisterData = {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                role: formData.role
            };
            
            const response = await authService.register(userData);
            
            if (response.success || response.message) {
                setSuccess("User registered successfully!");
                setTimeout(() => {
                    navigate("/callback");
                }, 2000);
            } else {
                setError(response.message || response.error || "Registration failed. Please try again.");
            }
        } catch (err: any) {
            // Handle API error response format
            if (err.response?.data?.error) {
                setError(err.response.data.error);
            } else if (err.response?.data?.details) {
                setError(err.response.data.details);
            } else if (err.message) {
                setError(err.message);
            } else {
                setError("Registration failed. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div 
            className="register-container"
            style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Background Pattern */}
            <div 
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `
                        radial-gradient(circle at 20% 80%, rgba(103, 177, 164, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 80% 20%, rgba(103, 177, 164, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 40% 40%, rgba(103, 177, 164, 0.05) 0%, transparent 50%)
                    `,
                    pointerEvents: 'none'
                }}
            />

            <Container 
                className="d-flex justify-content-center align-items-center"
                style={{ position: 'relative', zIndex: 1 }}
            >
                <Card 
                    style={{ 
                        width: "100%",
                        maxWidth: "450px",
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '20px',
                        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
                        overflow: 'hidden'
                    }}
                >
                    {/* Header */}
                    <div 
                        style={{
                            background: 'linear-gradient(135deg, #67b1a4 0%, #4a9b8a 100%)',
                            padding: '30px 20px',
                            textAlign: 'center',
                            color: 'white'
                        }}
                    >
                        <h2 style={{ margin: 0, fontWeight: '600', fontSize: '28px' }}>
                            Create Account
                        </h2>
                        <p style={{ margin: '10px 0 0 0', opacity: 0.9, fontSize: '14px' }}>
                            Join us today
                        </p>
                    </div>

                    <Card.Body style={{ padding: '30px' }}>
                        {error && (
                            <Alert 
                                variant="danger" 
                                style={{
                                    background: 'rgba(220, 53, 69, 0.1)',
                                    border: '1px solid rgba(220, 53, 69, 0.3)',
                                    color: '#ff6b6b',
                                    borderRadius: '10px',
                                    fontSize: '14px'
                                }}
                            >
                                {error}
                            </Alert>
                        )}

                        {success && (
                            <Alert 
                                variant="success" 
                                style={{
                                    background: 'rgba(40, 167, 69, 0.1)',
                                    border: '1px solid rgba(40, 167, 69, 0.3)',
                                    color: '#51cf66',
                                    borderRadius: '10px',
                                    fontSize: '14px'
                                }}
                            >
                                {success}
                            </Alert>
                        )}

                        <Form onSubmit={handleRegister}>
                            <Form.Group className="mb-4">
                                <Form.Label style={{ color: 'white', fontWeight: '500', marginBottom: '8px' }}>
                                    Username
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="username"
                                    placeholder="Enter your username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    required
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                        borderRadius: '10px',
                                        color: 'white',
                                        padding: '12px 16px',
                                        fontSize: '14px'
                                    }}
                                />
                                <small style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '12px' }}>
                                    Username must be at least 3 characters long
                                </small>
                            </Form.Group>

                            <Form.Group className="mb-4">
                                <Form.Label style={{ color: 'white', fontWeight: '500', marginBottom: '8px' }}>
                                    Email Address
                                </Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                        borderRadius: '10px',
                                        color: 'white',
                                        padding: '12px 16px',
                                        fontSize: '14px'
                                    }}
                                />
                            </Form.Group>

                            <Form.Group className="mb-4">
                                <Form.Label style={{ color: 'white', fontWeight: '500', marginBottom: '8px' }}>
                                    Password
                                </Form.Label>
                                <div style={{ position: 'relative' }}>
                                    <Form.Control
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                        style={{
                                            background: 'rgba(255, 255, 255, 0.1)',
                                            border: '1px solid rgba(255, 255, 255, 0.2)',
                                            borderRadius: '10px',
                                            color: 'white',
                                            padding: '12px 16px',
                                            paddingRight: '50px',
                                            fontSize: '14px'
                                        }}
                                    />
                                    <Button
                                        type="button"
                                        variant="link"
                                        onClick={() => setShowPassword(!showPassword)}
                                        style={{
                                            position: 'absolute',
                                            right: '10px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            color: 'rgba(255, 255, 255, 0.6)',
                                            padding: '0',
                                            border: 'none',
                                            background: 'none'
                                        }}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </Button>
                                </div>
                                <small style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '12px' }}>
                                    Password must be at least 6 characters long
                                </small>
                            </Form.Group>

                            <Form.Group className="mb-4">
                                <Form.Label style={{ color: 'white', fontWeight: '500', marginBottom: '8px' }}>
                                    Role
                                </Form.Label>
                                <Form.Select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleInputChange}
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                        borderRadius: '10px',
                                        color: 'white',
                                        padding: '12px 16px',
                                        fontSize: '14px'
                                    }}
                                >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </Form.Select>
                                <small style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '12px' }}>
                                    Select user role (Admin has full access)
                                </small>
                            </Form.Group>

                            <Form.Group className="mb-4">
                                <Form.Label style={{ color: 'white', fontWeight: '500', marginBottom: '8px' }}>
                                    Confirm Password
                                </Form.Label>
                                <div style={{ position: 'relative' }}>
                                    <Form.Control
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        placeholder="Confirm your password"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        required
                                        style={{
                                            background: 'rgba(255, 255, 255, 0.1)',
                                            border: '1px solid rgba(255, 255, 255, 0.2)',
                                            borderRadius: '10px',
                                            color: 'white',
                                            padding: '12px 16px',
                                            paddingRight: '50px',
                                            fontSize: '14px'
                                        }}
                                    />
                                    <Button
                                        type="button"
                                        variant="link"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        style={{
                                            position: 'absolute',
                                            right: '10px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            color: 'rgba(255, 255, 255, 0.6)',
                                            padding: '0',
                                            border: 'none',
                                            background: 'none'
                                        }}
                                    >
                                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                    </Button>
                                </div>
                            </Form.Group>

                            <Button 
                                variant="primary" 
                                type="submit" 
                                className="w-100 mb-3"
                                disabled={loading}
                                style={{
                                    background: 'linear-gradient(135deg, #67b1a4 0%, #4a9b8a 100%)',
                                    border: 'none',
                                    borderRadius: '10px',
                                    padding: '12px',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 4px 15px rgba(103, 177, 164, 0.3)'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(103, 177, 164, 0.4)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(103, 177, 164, 0.3)';
                                }}
                            >
                                {loading ? (
                                    <div className="d-flex align-items-center justify-content-center">
                                        <div 
                                            className="spinner-border spinner-border-sm me-2" 
                                            style={{ width: '16px', height: '16px' }}
                                        />
                                        Creating Account...
                                    </div>
                                ) : (
                                    <div className="d-flex align-items-center justify-content-center">
                                        <FaUserPlus className="me-2" />
                                        Create Account
                                    </div>
                                )}
                            </Button>
                        </Form>

                        <div style={{ textAlign: 'center', marginTop: '20px' }}>
                            <p style={{ color: 'rgba(255, 255, 255, 0.7)', margin: '0', fontSize: '14px' }}>
                                Already have an account?{' '}
                                <Link 
                                    to="/login" 
                                    style={{ 
                                        color: '#67b1a4', 
                                        textDecoration: 'none',
                                        fontWeight: '500',
                                        transition: 'color 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = '#4a9b8a'}
                                    onMouseLeave={(e) => e.currentTarget.style.color = '#67b1a4'}
                                >
                                    Sign in here
                                </Link>
                            </p>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default Register; 