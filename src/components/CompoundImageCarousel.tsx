import React from "react";
import { Modal, Carousel } from "react-bootstrap";
import { useModal } from "../utils/ModalContext";

interface CompoundImageCarouselProps {
    images: string[];
}

const CompoundImageCarousel: React.FC<CompoundImageCarouselProps> = React.memo(({
    images,
}) => {
    const { activeModal, closeModal } = useModal();
    const show = activeModal === 'compound';
    return (
        <Modal
            show={show}
            onHide={closeModal}
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
                                loading="lazy"
                            />
                        </Carousel.Item>
                    ))}
                </Carousel>
            </Modal.Body>
        </Modal>
    );
});

CompoundImageCarousel.displayName = 'CompoundImageCarousel';

export default CompoundImageCarousel;
// Usage example: