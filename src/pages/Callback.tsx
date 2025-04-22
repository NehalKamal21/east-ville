import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Modal, Button, Form } from "react-bootstrap";

interface Contact {
    firstName: string;
    lastName: string;
    _id: string;
    name: string;
    email: string;
    message: string;
    status: string;
    createdAt: string;
    updatedBy?: { username: string };
    updatedAt?: string;
    comment?: string;
}

const Callback: React.FC = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [status, setStatus] = useState("");
    const [comment, setComment] = useState("");

    // 🔹 Fetch Contacts from Backend
    useEffect(() => {
        const fetchContacts = async () => {
            try {
                // const token = Cookies.get("token");
                const response = await axios.get("http://localhost:5000/contacts", { withCredentials: true })

                setContacts(response.data);
            } catch (error) {
                console.error("Error fetching contacts:", error);
            }
        };

        fetchContacts();
    }, []);

    // 🔹 Open Modal & Set Initial Data
    const handleRowClick = (contact: Contact) => {
        setSelectedContact(contact);
        setStatus(contact.status);
        setComment(contact.comment || "");
        setShowModal(true);
    };

    // 🔹 Close Modal
    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedContact(null);
    };

    // 🔹 Handle Update Submission
    const handleUpdate = async () => {
        if (!selectedContact) return;

        try {
            const response = await axios.put(
                `http://localhost:5000/contacts/${selectedContact._id}`,
                { status, comment },
                {
                    withCredentials: true
                }
            );

            // ✅ Update UI
            setContacts((prev) =>
                prev.map((contact) =>
                    contact._id === selectedContact._id
                        ? { ...contact, status, comment, updatedAt: new Date().toISOString(), updatedBy: response.data.data.updatedBy }
                        : contact
                )
            );

            handleCloseModal();
        } catch (error) {
            console.error("Error updating contact:", error);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Contact Requests</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Message</th>
                        <th>Status</th>
                        <th>Updated By</th>
                        <th>Updated At</th>
                        <th>Sales Comment</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((contact) => (
                        <tr key={contact._id} onClick={() => handleRowClick(contact)} style={{ cursor: "pointer" }}>
                            {contact.firstName ? <td>{contact.firstName + ' ' + contact.lastName}</td> : <td>{contact.name} </td>}
                            <td>{contact.email}</td>
                            <td>{contact.message}</td>
                            <td>
                                <span
                                    className={`badge ${contact.status === "Resolved"
                                        ? "bg-success"
                                        : contact.status === "Pending"
                                            ? "bg-warning"
                                            : "bg-secondary"
                                        }`}
                                >
                                    {contact.status}
                                </span>
                            </td><td>{contact.updatedBy?.username || "N/A"}</td>
                            <td>{contact.updatedAt ? new Date(contact.updatedAt).toLocaleString() : "N/A"}</td>
                            <td>{contact.comment}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* 🔹 Update Contact Modal */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Contact Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Resolved">Resolved</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Comment</Form.Label>
                            <Form.Control as="textarea" rows={3} value={comment} onChange={(e) => setComment(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Callback;
