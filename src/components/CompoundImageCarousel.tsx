import React from "react";
import { Modal, Carousel, Button } from "react-bootstrap";

interface CompoundImageCarouselProps {
    show: boolean;
    onClose: () => void;
    images: string[];
}

const CompoundImageCarousel: React.FC<CompoundImageCarouselProps> = ({
    show,
    onClose,
    images,
}) => {
    return (
        <Modal
            show={show}
            onHide={onClose}
            size="lg"
            centered
            dialogClassName="compound-carousel-modal"
            contentClassName="bg-dark"
        >
            <Modal.Header closeButton className="border-0 text-white">
                <Modal.Title className="text-white">Compound Gallery</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Carousel fade>
                    {images.map((img, idx) => (
                        <Carousel.Item key={idx}>
                            <img
                                src={img}
                                alt={`Slide ${idx + 1}`}
                                className="d-block w-100"
                                style={{ maxHeight: "80vh", objectFit: "cover" }}
                            />
                        </Carousel.Item>
                    ))}
                </Carousel>
            </Modal.Body>
        </Modal>
    );
};

export default CompoundImageCarousel;
// Usage example: