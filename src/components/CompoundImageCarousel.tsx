import React, { useState, useEffect } from "react";
import { Modal, Carousel } from "react-bootstrap";
import ProgressiveImage from './ProgressiveImage';
import { preloadImages } from '../utils/imageOptimization';

interface CompoundImageCarouselProps {
    show: boolean;
    onClose: () => void;
    images: string[];
}

const CompoundImageCarousel: React.FC<CompoundImageCarouselProps> = React.memo(({
    show,
    onClose,
    images,
}) => {
    const [preloadedImages, setPreloadedImages] = useState<Set<string>>(new Set());

    // Preload images when modal opens
    useEffect(() => {
        if (show && images.length > 0) {
            const preloadCarouselImages = async () => {
                try {
                    await preloadImages(images);
                    setPreloadedImages(new Set(images));
                } catch (error) {
                    console.warn('Failed to preload some carousel images:', error);
                }
            };
            preloadCarouselImages();
        }
    }, [show, images]);

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
                            <ProgressiveImage
                                src={img}
                                alt={`Slide ${idx + 1}`}
                                className="d-block w-100"
                                style={{ maxHeight: "80vh", objectFit: "cover" }}
                                priority={idx === 0} // First image loads with priority
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