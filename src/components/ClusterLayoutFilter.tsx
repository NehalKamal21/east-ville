import React, { useState } from "react";
import { Button, Modal, Image } from "react-bootstrap";

interface ClusterLayoutFilterProps {
    layoutImage: string;
    area: number;
    bedroomCount: number;
}

const ClusterLayoutFilter: React.FC<ClusterLayoutFilterProps> = ({ layoutImage, area, bedroomCount }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div
                className="p-3 text-white rounded shadow"
                style={{
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    backdropFilter: "blur(4px)",
                    maxWidth: 200,
                    position: "fixed",
                    top: "100px",
                    left: "20px",
                    zIndex: 1050
                }}
            >
                <h5 className="text-center">Unit Filter</h5>
                <h6 className="text-center">Area= {area} m</h6>
                <h6 className="text-center">Bedroom count= {bedroomCount}</h6>
                <Button variant="light" className="w-100" onClick={() => setShowModal(true)}>
                    Availability
                </Button>
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Check Villas Availability</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Image src={layoutImage} alt="Cluster Layout" fluid />
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ClusterLayoutFilter;
