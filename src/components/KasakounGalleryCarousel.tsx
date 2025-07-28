import React, { useState } from "react";
import { Modal, Carousel, Tabs, Tab } from "react-bootstrap";
import { useModal } from "../utils/ModalContext";

interface KasakounGalleryCarouselProps {
    tabImages: string[][]; // Array of image arrays, one per tab
    tabTitles?: string[]; // Optional: titles for each tab
}

const KasakounGalleryCarousel: React.FC<KasakounGalleryCarouselProps> = React.memo(({
    tabImages,
    tabTitles = ["1 Bed Room", "2 Bed Room", "Corridor", "Entrance", "Kasakoun", "Studio"],
}) => {
    const { activeModal, closeModal } = useModal();
    const show = activeModal === 'kasakoun';
    const [activeTab, setActiveTab] = useState<string>("0");
    return (
        <Modal
            show={show}
            onHide={closeModal}
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
                                        <img
                                            src={img}
                                            alt={`Tab ${idx + 1} Slide ${imgIdx + 1}`}
                                            className="d-block mx-auto kasakoun-carousel-img"
                                            loading="lazy"
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