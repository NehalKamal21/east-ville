import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Modal, Button, Form } from "react-bootstrap";

interface Contact {
    _id: string;
    name?: string;
    firstName?: string;
    lastName?: string;
    email: string;
    phone?: string;
    residence?: string;
    nationality?: string;
    interestedUnit?: string;
    message: string;
    status: string;
    priority?: string;
    source?: string;
    tags?: string[];
    createdAt: string;
    updatedAt: string;
    updatedBy?: { username: string };
    comment?: string;
    salesComment?: string;
    __v?: number;
}

const Callback: React.FC = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [status, setStatus] = useState("");
    const [comment, setComment] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 10
    });

    // 🔹 Fetch Contacts from Backend
    const fetchContacts = async (page = 1) => {
        try {
            setError(null);
            setLoading(true);
            const response = await axios.get(`/api/contacts?page=${page}&limit=10`, { withCredentials: true });
            
            // Handle different response structures
            let contactsData = response.data.contacts || [];
            let paginationData = response.data.pagination || {};
            
            // Ensure all contacts have required fields with fallbacks
            const validatedContacts = Array.isArray(contactsData) ? contactsData.map(contact => ({
                ...contact,
                updatedBy: contact.updatedBy || { username: 'N/A' },
                message: contact.message || '',
                comment: contact.salesComment || '',
                status: contact.status || 'Pending',
                priority: contact.priority || 'Medium'
            })) : [];
            
            setContacts(validatedContacts);
            const paginationInfo = {
                currentPage: paginationData.current || page,
                totalPages: paginationData.total || 1,
                totalItems: paginationData.totalItems || 0,
                itemsPerPage: paginationData.itemsPerPage || 10
            };
            

            
            setPagination(paginationInfo);
        } catch (error: any) {
            console.error("Error fetching contacts:", error);
            
            // Handle API error response format
            if (error.response?.data?.error) {
                setError(error.response.data.error);
            } else if (error.response?.data?.code) {
                setError(`${error.response.data.code}: ${error.response.data.error || 'Permission denied'}`);
            } else if (error.message) {
                setError(error.message);
            } else {
                setError("Failed to fetch contacts. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    // 🔹 Handle Page Change
    const handlePageChange = (page: number) => {
        fetchContacts(page);
    };

    // 🔹 Open Modal & Set Initial Data
    const handleRowClick = (contact: Contact) => {
        setSelectedContact(contact);
        setStatus(contact.status);
        setComment(contact.salesComment || "");
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
                `/api/contacts/${selectedContact._id}`,
                { status, salesComment: comment },
                {
                    withCredentials: true
                }
            );

            // ✅ Update UI with proper null checks
            setContacts((prev) =>
                prev.map((contact) =>
                    contact._id === selectedContact._id
                        ? { 
                            ...contact, 
                            status, 
                            comment, 
                            updatedAt: new Date().toISOString(), 
                            updatedBy: response.data?.data?.updatedBy || response.data?.updatedBy || { username: 'Current User' }
                        }
                        : contact
                )
            );

            handleCloseModal();
        } catch (error) {
            console.error("Error updating contact:", error);
            // Show user-friendly error message
            alert("Failed to update contact. Please try again.");
        }
    };

    return (
        <>
            <style>
                {`
                    .callback-container .table-responsive::-webkit-scrollbar {
                        width: 8px;
                        height: 8px;
                    }
                    .callback-container .table-responsive::-webkit-scrollbar-track {
                        background: rgba(255, 255, 255, 0.1);
                        border-radius: 4px;
                    }
                    .callback-container .table-responsive::-webkit-scrollbar-thumb {
                        background: rgba(103, 177, 164, 0.5);
                        border-radius: 4px;
                    }
                    .callback-container .table-responsive::-webkit-scrollbar-thumb:hover {
                        background: rgba(103, 177, 164, 0.7);
                    }
                    
                    /* Modal form styling */
                    .modal-content {
                        background: rgba(45, 45, 45, 0.95) !important;
                        border: 1px solid rgba(255, 255, 255, 0.1) !important;
                    }
                    
                    .modal select option {
                        background: #2d2d2d !important;
                        color: white !important;
                    }
                    
                    .modal textarea::placeholder {
                        color: rgba(255, 255, 255, 0.6) !important;
                    }
                    
                    .modal input::placeholder {
                        color: rgba(255, 255, 255, 0.6) !important;
                    }
                `}
            </style>
            <div 
                className="callback-container"
                style={{
                    minHeight: '100vh',
                    background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
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

            <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '100%' }}>
                <div 
                    style={{
                        // background: 'rgba(255, 255, 255, 0.05)',
                        // backdropFilter: 'blur(20px)',
                        // border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '20px',
                        padding: '30px',
                        marginBottom: '30px',
                        // boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
                        width: '100%',
                        maxWidth: '100%'
                    }}
                >
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <div>
                                    <h2 style={{ 
                                        color: 'white', 
                                        margin: 0, 
                                        fontWeight: '600',
                                        fontSize: '28px'
                                    }}>
                                        Contact Requests
                                    </h2>
                                    <p style={{ 
                                        color: 'rgba(255, 255, 255, 0.7)', 
                                        margin: '8px 0 0 0',
                                        fontSize: '14px'
                                    }}>
                                        Manage and respond to customer inquiries
                                    </p>
                                </div>
                                <div className="d-flex align-items-center">
                                    <span style={{ 
                                        color: 'rgba(255, 255, 255, 0.7)',
                                        fontSize: '14px',
                                        marginRight: '15px'
                                    }}>
                                        Total: {Array.isArray(contacts) ? contacts.length : 0}
                                    </span>
                                </div>
                            </div>
            
            {loading && (
                <div 
                    style={{
                        background: 'rgba(13, 202, 240, 0.1)',
                        border: '1px solid rgba(13, 202, 240, 0.3)',
                        color: '#67b1a4',
                        borderRadius: '15px',
                        padding: '20px',
                        marginBottom: '20px',
                        fontSize: '16px'
                    }}
                >
                    <div className="d-flex align-items-center justify-content-center">
                        <div 
                            className="spinner-border me-3" 
                            style={{ 
                                width: '24px', 
                                height: '24px',
                                borderColor: '#67b1a4',
                                borderRightColor: 'transparent'
                            }}
                        />
                        <span>Loading contacts...</span>
                    </div>
                </div>
            )}
            
            {error && (
                <div 
                    style={{
                        background: 'rgba(220, 53, 69, 0.1)',
                        border: '1px solid rgba(220, 53, 69, 0.3)',
                        color: '#ff6b6b',
                        borderRadius: '15px',
                        padding: '20px',
                        marginBottom: '20px'
                    }}
                >
                    <h5 style={{ color: '#ff6b6b', marginBottom: '10px' }}>Access Denied</h5>
                    <p style={{ marginBottom: '10px', fontSize: '16px' }}>{error}</p>
                    {error.includes("INSUFFICIENT_PERMISSIONS") && (
                        <div style={{ 
                            background: 'rgba(255, 255, 255, 0.05)',
                            padding: '10px',
                            borderRadius: '8px',
                            fontSize: '14px'
                        }}>
                            <strong>Required permissions:</strong> admin<br/>
                            <strong>Current role:</strong> user
                        </div>
                    )}
                </div>
            )}
            
            {!error && !loading && (
                <div 
                    className="table-responsive" 
                    style={{ 
                        borderRadius: '15px', 
                        overflow: 'auto',
                        maxHeight: '70vh',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        scrollbarWidth: 'thin',
                        scrollbarColor: 'rgba(103, 177, 164, 0.5) rgba(255, 255, 255, 0.1)'
                    }}
                >
                    <Table 
                        striped 
                        bordered 
                        hover
                        style={{
                            background: 'rgba(255, 255, 255, 0.02)',
                            color: 'white',
                            margin: 0,
                            minWidth: '1200px',
                            width: '100%'
                        }}
                    >
                <thead>
                    <tr style={{ background: 'rgba(103, 177, 164, 0.2)' }}>
                        <th style={{ 
                            color: '#ffffff', 
                            borderColor: 'rgba(255, 255, 255, 0.3)',
                            padding: '15px 10px',
                            fontSize: '14px',
                            fontWeight: '600',
                            textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                        }}>Name</th>
                        <th style={{ 
                            color: '#ffffff', 
                            borderColor: 'rgba(255, 255, 255, 0.3)',
                            padding: '15px 10px',
                            fontSize: '14px',
                            fontWeight: '600',
                            textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                        }}>Email</th>
                        <th style={{ 
                            color: '#ffffff', 
                            borderColor: 'rgba(255, 255, 255, 0.3)',
                            padding: '15px 10px',
                            fontSize: '14px',
                            fontWeight: '600',
                            textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                        }}>Phone</th>
                        <th style={{ 
                            color: '#ffffff', 
                            borderColor: 'rgba(255, 255, 255, 0.3)',
                            padding: '15px 10px',
                            fontSize: '14px',
                            fontWeight: '600',
                            textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                        }}>Unit</th>
                        <th style={{ 
                            color: '#ffffff', 
                            borderColor: 'rgba(255, 255, 255, 0.3)',
                            padding: '15px 10px',
                            fontSize: '14px',
                            fontWeight: '600',
                            textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                        }}>Message</th>
                        <th style={{ 
                            color: '#ffffff', 
                            borderColor: 'rgba(255, 255, 255, 0.3)',
                            padding: '15px 10px',
                            fontSize: '14px',
                            fontWeight: '600',
                            textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                        }}>Status</th>
                        <th style={{ 
                            color: '#ffffff', 
                            borderColor: 'rgba(255, 255, 255, 0.3)',
                            padding: '15px 10px',
                            fontSize: '14px',
                            fontWeight: '600',
                            textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                        }}>Priority</th>
                        <th style={{ 
                            color: '#ffffff', 
                            borderColor: 'rgba(255, 255, 255, 0.3)',
                            padding: '15px 10px',
                            fontSize: '14px',
                            fontWeight: '600',
                            textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                        }}>Updated By</th>
                        <th style={{ 
                            color: '#ffffff', 
                            borderColor: 'rgba(255, 255, 255, 0.3)',
                            padding: '15px 10px',
                            fontSize: '14px',
                            fontWeight: '600',
                            textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                        }}>Updated At</th>
                        <th style={{ 
                            color: '#ffffff', 
                            borderColor: 'rgba(255, 255, 255, 0.3)',
                            padding: '15px 10px',
                            fontSize: '14px',
                            fontWeight: '600',
                            textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                        }}>Comment</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(contacts) && contacts.map((contact) => (
                        <tr 
                            key={contact._id} 
                            onClick={() => handleRowClick(contact)} 
                                                    style={{
                            cursor: "pointer",
                            borderColor: 'rgba(255, 255, 255, 0.2)',
                            transition: 'all 0.3s ease',
                            backgroundColor: 'rgba(255, 255, 255, 0.02)'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(103, 177, 164, 0.15)';
                            e.currentTarget.style.transform = 'translateY(-1px)';
                            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                        >
                            <td style={{ 
                                padding: '12px 10px',
                                borderColor: 'rgba(255, 255, 255, 0.2)',
                                color: '#e0e0e0',
                                fontWeight: '500',
                                backgroundColor: 'rgba(255, 255, 255, 0.02)'
                            }}>
                                {contact.firstName && contact.lastName 
                                    ? `${contact.firstName} ${contact.lastName}` 
                                    : contact.name || 'N/A'
                                }
                            </td>
                            <td style={{ 
                                padding: '12px 10px',
                                borderColor: 'rgba(255, 255, 255, 0.2)',
                                color: '#e0e0e0',
                                backgroundColor: 'rgba(255, 255, 255, 0.02)'
                            }}>
                                {contact.email}
                            </td>
                            <td style={{ 
                                padding: '12px 10px',
                                borderColor: 'rgba(255, 255, 255, 0.2)',
                                color: '#e0e0e0',
                                backgroundColor: 'rgba(255, 255, 255, 0.02)'
                            }}>
                                {contact.phone || 'N/A'}
                            </td>
                            <td style={{ 
                                padding: '12px 10px',
                                borderColor: 'rgba(255, 255, 255, 0.2)',
                                color: '#e0e0e0',
                                backgroundColor: 'rgba(255, 255, 255, 0.02)'
                            }}>
                                {contact.interestedUnit || 'N/A'}
                            </td>
                            <td style={{ 
                                maxWidth: '200px', 
                                overflow: 'hidden', 
                                textOverflow: 'ellipsis', 
                                whiteSpace: 'nowrap',
                                padding: '12px 10px',
                                borderColor: 'rgba(255, 255, 255, 0.2)',
                                color: '#e0e0e0',
                                backgroundColor: 'rgba(255, 255, 255, 0.02)'
                            }}>
                                {contact.message}
                            </td>
                            <td style={{ 
                                padding: '12px 10px',
                                borderColor: 'rgba(255, 255, 255, 0.2)',
                                color: '#e0e0e0',
                                backgroundColor: 'rgba(255, 255, 255, 0.02)'
                            }}>
                                <span
                                    className={`badge ${contact.status === "Resolved"
                                        ? "bg-success"
                                        : contact.status === "Pending"
                                            ? "bg-warning"
                                            : contact.status === "In Progress"
                                                ? "bg-info"
                                                : "bg-secondary"
                                        }`}
                                    style={{ fontSize: '12px', padding: '6px 10px', fontWeight: '600' }}
                                >
                                    {contact.status}
                                </span>
                            </td>
                            <td style={{ 
                                padding: '12px 10px',
                                borderColor: 'rgba(255, 255, 255, 0.2)',
                                color: '#e0e0e0',
                                backgroundColor: 'rgba(255, 255, 255, 0.02)'
                            }}>
                                <span
                                    className={`badge ${contact.priority === "High"
                                        ? "bg-danger"
                                        : contact.priority === "Medium"
                                            ? "bg-warning"
                                            : "bg-success"
                                        }`}
                                    style={{ fontSize: '12px', padding: '6px 10px', fontWeight: '600' }}
                                >
                                    {contact.priority || 'N/A'}
                                </span>
                            </td>
                            <td style={{ 
                                padding: '12px 10px',
                                borderColor: 'rgba(255, 255, 255, 0.2)',
                                color: '#e0e0e0',
                                backgroundColor: 'rgba(255, 255, 255, 0.02)'
                            }}>
                                {contact.updatedBy?.username || "N/A"}
                            </td>
                            <td style={{ 
                                padding: '12px 10px',
                                borderColor: 'rgba(255, 255, 255, 0.2)',
                                color: '#e0e0e0',
                                fontSize: '13px',
                                backgroundColor: 'rgba(255, 255, 255, 0.02)'
                            }}>
                                {contact.updatedAt ? new Date(contact.updatedAt).toLocaleString() : "N/A"}
                            </td>
                            <td style={{ 
                                maxWidth: '150px', 
                                overflow: 'hidden', 
                                textOverflow: 'ellipsis', 
                                whiteSpace: 'nowrap',
                                padding: '12px 10px',
                                borderColor: 'rgba(255, 255, 255, 0.2)',
                                color: '#e0e0e0',
                                backgroundColor: 'rgba(255, 255, 255, 0.02)'
                            }}>
                                {contact.comment || 'N/A'}
                            </td>
                        </tr>
                    ))}
                    {Array.isArray(contacts) && contacts.length === 0 && (
                        <tr>
                            <td 
                                colSpan={10} 
                                style={{
                                    textAlign: 'center',
                                    color: '#e0e0e0',
                                    padding: '60px 20px',
                                    fontSize: '18px',
                                    fontWeight: '500',
                                    backgroundColor: 'rgba(255, 255, 255, 0.02)'
                                }}
                            >
                                📭 No contacts found
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
                </div>
            )}



            {/* 🔹 Pagination Controls */}
            {!error && !loading && (pagination.totalPages > 1 || pagination.totalItems > 10) && (
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    marginTop: '20px',
                    gap: '10px'
                }}>
                    <Button
                        variant="outline-light"
                        onClick={() => handlePageChange(pagination.currentPage - 1)}
                        disabled={pagination.currentPage <= 1}
                        style={{
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            borderRadius: '8px',
                            padding: '8px 16px',
                            color: 'white',
                            background: 'rgba(255, 255, 255, 0.1)'
                        }}
                    >
                        Previous
                    </Button>
                    
                    <span style={{ 
                        color: 'white', 
                        padding: '8px 16px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                        border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}>
                        Page {pagination.currentPage} of {pagination.totalPages} (Total: {pagination.totalItems})
                    </span>
                    
                    <Button
                        variant="outline-light"
                        onClick={() => handlePageChange(pagination.currentPage + 1)}
                        disabled={pagination.currentPage >= pagination.totalPages}
                        style={{
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            borderRadius: '8px',
                            padding: '8px 16px',
                            color: 'white',
                            background: 'rgba(255, 255, 255, 0.1)'
                        }}
                    >
                        Next
                    </Button>
                </div>
            )}

            {/* 🔹 Update Contact Modal */}
            <Modal 
                show={showModal} 
                onHide={handleCloseModal}
                style={{ backdropFilter: 'blur(10px)' }}
            >
                <Modal.Header 
                    closeButton
                    style={{
                        background: 'linear-gradient(135deg, #67b1a4 0%, #4a9b8a 100%)',
                        color: 'white',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                >
                    <Modal.Title style={{ color: 'white', fontWeight: '600' }}>
                        Update Contact Status
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label style={{ color: 'white', fontWeight: '500', marginBottom: '8px' }}>
                                Status
                            </Form.Label>
                            <Form.Select 
                                value={status} 
                                onChange={(e) => setStatus(e.target.value)}
                                style={{
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                    borderRadius: '10px',
                                    color: 'white',
                                    padding: '12px 16px'
                                }}
                            >
                                <option value="Pending" style={{ background: '#2d2d2d', color: 'white' }}>Pending</option>
                                <option value="In Progress" style={{ background: '#2d2d2d', color: 'white' }}>In Progress</option>
                                <option value="Resolved" style={{ background: '#2d2d2d', color: 'white' }}>Resolved</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label style={{ color: 'white', fontWeight: '500', marginBottom: '8px' }}>
                                Comment
                            </Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={3} 
                                value={comment} 
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Enter your comment here..."
                                style={{
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                    borderRadius: '10px',
                                    color: 'white',
                                    padding: '12px 16px'
                                }}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer style={{ 
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                    <Button 
                        variant="outline-light" 
                        onClick={handleCloseModal}
                        style={{
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            borderRadius: '10px',
                            padding: '8px 20px'
                        }}
                    >
                        Cancel
                    </Button>
                    <Button 
                        variant="primary" 
                        onClick={handleUpdate}
                        style={{
                            background: 'linear-gradient(135deg, #67b1a4 0%, #4a9b8a 100%)',
                            border: 'none',
                            borderRadius: '10px',
                            padding: '8px 20px',
                            fontWeight: '600'
                        }}
                    >
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
                </div>
            </div>
        </div>
        </>
    );
};

export default Callback;
