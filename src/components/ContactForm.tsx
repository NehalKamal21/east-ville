import axios from "axios";
import React, { useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { RiMailLine } from "react-icons/ri";

const ContactForm: React.FC = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const submitContactRequest = async (contactData: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        residence: string;
        nationality: string;
        message: string;
    }) => {
        try {
            const response = await axios.post("http://159.89.30.220/contact", contactData, {
                withCredentials: true,
            });

            console.log("✅ Contact submitted:", response.data);
            alert("Your message has been sent successfully!");
        } catch (error) {
            console.error("❌ Error submitting contact:", error);
            alert("Failed to send your message.");
        }
    };

    return (
        <>
            {/* Floating Contact Button with Accessible Label */}
            <Button
                variant="primary"
                onClick={handleShow}
                className="contact-button"
                aria-label="Contact Us Form"
            >
                <RiMailLine size={24} />
            </Button>

            {/* Accessible Modal */}
            <Modal
                show={show}
                onHide={handleClose}
                centered
                backdrop="static"
                aria-labelledby="contact-form-title"
            >
                <Modal.Header closeButton className="modal-header">
                    <Modal.Title id="contact-form-title">Contact Us</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body">
                    <Form>
                        <Row className="justify-content-center">
                            <Col xs={12} md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="first-name">First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="first-name"
                                        required
                                        className="form-control"
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="last-name">Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="last-name"
                                        required
                                        className="form-control"
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="email">Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        id="email"
                                        required
                                        className="form-control"
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="phone">Phone</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        id="phone"
                                        required
                                        className="form-control"
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="residence">Residence</Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="residence"
                                        className="form-control"
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="nationality">Nationality</Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="nationality"
                                        className="form-control"
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="message">Prefred Call Time </Form.Label>
                                    <Form.Select aria-label="Default select example">
                                        <option>Open this select menu</option>
                                        <option value="1">9:00 AM to 12:00 PM</option>
                                        <option value="2">12:00 PM to 5:00 PM</option>
                                        <option value="3">5:00 PM to 8:00 PM</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="message">Message</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        id="message"
                                        rows={3}
                                        required
                                        className="form-control"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="modal-footerr">
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            const formData = {
                                firstName: (document.getElementById("first-name") as HTMLInputElement)?.value || "",
                                lastName: (document.getElementById("last-name") as HTMLInputElement)?.value || "",
                                email: (document.getElementById("email") as HTMLInputElement)?.value || "",
                                phone: (document.getElementById("phone") as HTMLInputElement)?.value || "",
                                residence: (document.getElementById("residence") as HTMLInputElement)?.value || "",
                                nationality: (document.getElementById("nationality") as HTMLInputElement)?.value || "",
                                message: (document.getElementById("message") as HTMLTextAreaElement)?.value || "",
                            };
                            submitContactRequest(formData);
                        }}
                    >
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ContactForm;
