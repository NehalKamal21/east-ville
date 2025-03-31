import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
      <Container className="text-center">
        <h1 className="display-1 fw-bold text-danger">404</h1>
        <p className="fs-4 text-muted">Oops! The page you’re looking for doesn’t exist.</p>
        <Button variant="primary" size="lg" onClick={() => navigate("/")}>
          Go Home
        </Button>
      </Container>
    </div>
  );
};

export default NotFoundPage;
