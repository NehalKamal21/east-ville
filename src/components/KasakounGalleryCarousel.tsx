import React, { useState, useEffect } from "react";
import { Modal, Carousel, Tabs, Tab } from "react-bootstrap";
import ProgressiveImage from './ProgressiveImage';
import { preloadImages } from '../utils/imageOptimization';

interface KasakounGalleryCarouselProps {
    show: boolean;
    onClose: () => void;
    tabImages: string[][]; // Array of image arrays, one per tab
    tabTitles?: string[]; // Optional: titles for each tab
}

const KasakounGalleryCarousel: React.FC<KasakounGalleryCarouselProps> = React.memo(({
    show,
    onClose,
    tabImages,
    tabTitles = ["1 Bed Room", "2 Bed Room", "Corridor", "Entrance", "Kasakoun", "Studio"],
}) => {
    const [activeTab, setActiveTab] = useState<string>("0");
    const [preloadedImages, setPreloadedImages] = useState<Set<string>>(new Set());

    // Preload images for the active tab when modal opens
    useEffect(() => {
        if (show && tabImages.length > 0) {
            const activeTabIndex = parseInt(activeTab);
            const activeTabImages = tabImages[activeTabIndex] || [];
            
            const preloadTabImages = async () => {
                try {
                    await preloadImages(activeTabImages);
                    setPreloadedImages(new Set(activeTabImages));
                } catch (error) {
                    console.warn('Failed to preload some tab images:', error);
                }
            };
            preloadTabImages();
        }
    }, [show, activeTab, tabImages]);

    return (
        <Modal
            show={show}
            onHide={onClose}
            size="lg"
            centered
            dialogClassName="kasakoun-modal"
        >
            <Modal.Header closeButton className="border-0 text-white kasakoun-modal-header">
                <Modal.Title className="text-white">KASAKOUN Gallery</Modal.Title>
            </Modal.Header>
            <Modal.Body className="kasakoun-modal-body">
                <Tabs
                    id="kasakoun-gallery-tabs"
                    activeKey={activeTab}
                    onSelect={(k) => setActiveTab(k || "0")}
                    className="mb-3 justify-content-center kasakoun-tabs"
                    variant="pills"
                >
                    {tabImages.map((images, idx) => (
                        <Tab eventKey={String(idx)} title={tabTitles[idx] || `Tab ${idx + 1}`} key={idx}>
                            <Carousel fade className="kasakoun-carousel">
                                {images.map((img, imgIdx) => (
                                    <Carousel.Item key={imgIdx}>
                                        <ProgressiveImage
                                            src={img}
                                            alt={`Tab ${idx + 1} Slide ${imgIdx + 1}`}
                                            className="d-block mx-auto kasakoun-carousel-img"
                                            priority={imgIdx === 0} // First image in each tab loads with priority
                                        />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </Tab>
                    ))}
                </Tabs>
            </Modal.Body>
        </Modal>
    );
});

KasakounGalleryCarousel.displayName = 'KasakounGalleryCarousel';

export default KasakounGalleryCarousel; 