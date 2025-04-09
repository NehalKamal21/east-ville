// TODO: Define proper props interface
// src/pages/SpinnerPage.tsx
import React from "react";
import { Spinner } from "react-bootstrap";

const SpinnerPage: React.FC = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
      <Spinner animation="border" variant="primary" role="status" style={{ width: "3rem", height: "3rem" }} />
      <p className="mt-3 fs-5 text-muted">Loading, please wait...</p>
    </div>
  );
};

export default SpinnerPage;
