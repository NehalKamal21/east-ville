import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Card, Container, Alert } from "react-bootstrap";
import Cookies from "js-cookie";

interface Villa {
  _id: string;
  id: string;
  status: "Available" | "Sold" | "Under Construction";
  size: number;
  type: string;
}

const UpdateVillaStatus: React.FC = () => {
  const [villaId, setVillaId] = useState("");
  const [villa, setVilla] = useState<Villa | null>(null);
  const [newStatus, setNewStatus] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    try {
      setError(null);
      const response = await axios.get<Villa>(`http://159.89.30.220/villas/${villaId}`, { withCredentials: true });
      setVilla(response.data);
      setNewStatus(response.data.status);
    } catch (error) {
      setError("Villa not found or error fetching data.");
      setVilla(null);
    }
  };

  const handleUpdateVilla = async () => {
    if (!villa) return;
    
    try {
      const token = Cookies.get("token");
      if (!token) {
        alert("No authentication token found!");
        return;
      }

      const response = await axios.put(
        `http://159.89.30.220/villas/${villa._id}`,
        { status: newStatus },
        { 
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setVilla(response.data.data);
      alert("Villa status updated successfully!");
    } catch (error) {
      console.error("Error updating villa status", error);
      setError("Error updating villa status.");
    }
  };

  return (
    <Container className="mt-4">
      <h2>Update Villa Status</h2>
      
      {/* Search Input */}
      <Form>
        <Form.Group controlId="villaId">
          <Form.Label>Search Villa by ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Villa ID"
            value={villaId}
            onChange={(e) => setVillaId(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" className="mt-2" onClick={handleSearch}>
          Search
        </Button>
      </Form>

      {/* Error Alert */}
      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

      {/* Villa Details */}
      {villa && (
        <Card className="mt-4">
          <Card.Body>
            <Card.Title>Villa Details</Card.Title>
            <Card.Text><strong>ID:</strong> {villa.id}</Card.Text>
            <Card.Text><strong>Type:</strong> {villa.type}</Card.Text>
            <Card.Text><strong>Size:</strong> {villa.size} sqm</Card.Text>
            <Form.Group controlId="status">
              <Form.Label>Update Status</Form.Label>
              <Form.Control
                as="select"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
              >
                <option value="Available">Available</option>
                <option value="Sold">Sold</option>
                <option value="Under Construction">Under Construction</option>
              </Form.Control>
            </Form.Group>
            <Button variant="success" className="mt-2" onClick={handleUpdateVilla}>
              Update Status
            </Button>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default UpdateVillaStatus;
