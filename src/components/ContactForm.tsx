import React, { useEffect, useRef, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useContactModal } from "../utils/ContactModalContext";
import { useModal } from "../utils/ModalContext";
import { RiMailLine } from "react-icons/ri";
import axios from "axios";

const ContactForm: React.FC = () => {
    const [show, setShow] = useState(false);
    const { isOpen, closeModal, prefillData, openModal } = useContactModal();
    const { activeModal, openModal: openGlobalModal, closeModal: closeGlobalModal } = useModal();
    const buttonRef = useRef<HTMLButtonElement>(null);
    const showSuccessModal = activeModal === 'success';

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        interestedUnit: "",
        message: "",
        priority: "Medium",
        source: "Website"
    });

    useEffect(() => {
        if (prefillData.interestedUnit) {
            setFormData((prev) => ({ ...prev, interestedUnit: prefillData.interestedUnit || "" }));
        }
    }, [prefillData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            // Validate required fields according to schema
            if (!formData.name || !formData.name.trim()) {
                alert("Name is required.");
                return;
            }
            if (formData.name.length > 100) {
                alert("Name cannot exceed 100 characters.");
                return;
            }
            
            if (!formData.email || !formData.email.trim()) {
                alert("Email is required.");
                return;
            }
            const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
            if (!emailRegex.test(formData.email)) {
                alert("Please enter a valid email.");
                return;
            }
            
            if (!formData.phone || !formData.phone.trim()) {
                alert("Phone number is required.");
                return;
            }
            // Remove any non-digit characters for validation
            const phoneDigits = formData.phone.replace(/\D/g, '');
            if (phoneDigits.length !== 11) {
                alert("Phone number must be exactly 11 digits.");
                return;
            }
            
            if (!formData.message || !formData.message.trim()) {
                alert("Message is required.");
                return;
            }
            if (formData.message.length > 1000) {
                alert("Message cannot exceed 1000 characters.");
                return;
            }
            
            if (formData.interestedUnit && formData.interestedUnit.length > 200) {
                alert("Interested unit cannot exceed 200 characters.");
                return;
            }

            // Call the backend API
            const response = await axios.post("/api/contacts", formData, { 
                withCredentials: true 
            });
            
            // Show success message
            openGlobalModal('success');
            closeModal();
            
            // Reset form
            setFormData({
                name: "",
                email: "",
                phone: "",
                interestedUnit: "",
                message: "",
                priority: "Medium",
                source: "Website"
            });
    
        } catch (err: any) {
            console.error("Contact form error:", err);
            
            // Show more specific error messages
            if (err.response?.data?.error) {
                alert(`Error: ${err.response.data.error}`);
            } else if (err.response?.data?.message) {
                alert(`Error: ${err.response.data.message}`);
            } else if (err.response?.status === 400) {
                alert("Invalid data. Please check your input and try again.");
            } else {
                alert("Failed to send message. Please try again.");
            }
        }
    };

    return (<>
        <Button
            ref={buttonRef}
            variant="primary"
            onClick={() => openModal()}
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
                        <Form.Label>Name *</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleChange} 
                            required 
                            maxLength={100}
                            placeholder="Enter your full name"
                        />
                        <Form.Text className="text-muted">
                            {formData.name.length}/100 characters
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email *</Form.Label>
                        <Form.Control 
                            type="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            required 
                            placeholder="Enter your email address"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Phone *</Form.Label>
                        <Form.Control 
                            type="tel" 
                            name="phone" 
                            value={formData.phone} 
                            onChange={handleChange} 
                            required 
                            placeholder="Enter 11-digit phone number (e.g., 01234567890)"
                        />
                        <Form.Text className="text-muted">
                            Must be exactly 11 digits (e.g., 01234567890)
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Interested Unit</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="interestedUnit" 
                            value={formData.interestedUnit} 
                            onChange={handleChange}
                            maxLength={200}
                            placeholder="e.g., Unit A203, Villa B, etc."
                        />
                        <Form.Text className="text-muted">
                            {formData.interestedUnit.length}/200 characters
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Message *</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            name="message" 
                            rows={3} 
                            value={formData.message} 
                            onChange={handleChange} 
                            required 
                            maxLength={1000}
                            placeholder="Enter your message here..."
                        />
                        <Form.Text className="text-muted">
                            {formData.message.length}/1000 characters
                        </Form.Text>
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
        <Modal show={showSuccessModal} onHide={() => closeGlobalModal()} centered>
            <Modal.Header closeButton>
                <Modal.Title>Success</Modal.Title>
            </Modal.Header>
            <Modal.Body>Your message has been sent successfully!</Modal.Body>
            <Modal.Footer>
                <Button
                    variant="success"
                    onClick={() => {
                        closeGlobalModal();
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
