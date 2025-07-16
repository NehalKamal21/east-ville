import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useContactModal } from "../utils/ContactModalContext";
import { RiMailLine } from "react-icons/ri";

const ContactForm: React.FC = () => {
    const [show, setShow] = useState(false);
    const { isOpen, closeModal, prefillData, openModal } = useContactModal();
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        interestedUnit: "",
        message: "",
    });

    useEffect(() => {
        if (prefillData.interestedUnit) {
            setFormData((prev) => ({ ...prev, interestedUnit: prefillData.interestedUnit }));
        }
    }, [prefillData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post("http://209.38.255.181/api/contact", formData);
            setShowSuccessModal(true); // ✅ show success modal
            closeModal();
        } catch (err) {
            alert("Failed to send message.");
        }
    };

    return (<>
        <Button
            ref={buttonRef}
            variant="primary"
            onClick={openModal}
            className="contact-button"
            aria-label="Contact Us Form"
        >
            <RiMailLine size={24} />
        </Button>
        <Modal show={isOpen} onHide={closeModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>Contact Us</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Interested Unit</Form.Label>
                        <Form.Control type="text" name="interestedUnit" value={formData.interestedUnit} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Message</Form.Label>
                        <Form.Control as="textarea" name="message" rows={3} value={formData.message} onChange={handleChange} required />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className="flex-column align-items-start">
                <div className="mt-2 text-muted">
                    Or call us on hotline <strong>XXX</strong>
                </div>
                <div className="w-100 d-flex justify-content-between align-items-center">
                    <Button variant="secondary" onClick={closeModal}>Close</Button>
                    <Button variant="primary" onClick={handleSubmit}>Submit</Button>
                </div>

            </Modal.Footer>
        </Modal>
        <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Success</Modal.Title>
            </Modal.Header>
            <Modal.Body>Your message has been sent successfully!</Modal.Body>
            <Modal.Footer>
                <Button
                    variant="success"
                    onClick={() => {
                        setShowSuccessModal(false);
                        closeModal();
                    }}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>

    </>
    );
};

export default ContactForm;
