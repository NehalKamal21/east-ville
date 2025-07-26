import React, { useState, useEffect } from 'react';
import { Modal, Carousel, Tabs, Tab } from 'react-bootstrap';
import ResponsiveImage from './ResponsiveImage';

interface KasakounGalleryCarouselProps {
  show: boolean;
  onClose: () => void;
  tabImages: string[][]; // Array of image arrays, one per tab
  tabTitles?: string[]; // Optional: titles for each tab
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  interval?: number;
  indicators?: boolean;
  controls?: boolean;
  fade?: boolean;
  pause?: 'hover' | false;
  onSelect?: (index: number) => void;
}

const KasakounGalleryCarousel: React.FC<KasakounGalleryCarouselProps> = ({
  show,
  onClose,
  tabImages,
  tabTitles = ["1 Bed Room", "2 Bed Room", "Corridor", "Entrance", "Kasakoun", "Studio"],
  alt = 'Kasakoun Gallery',
  className = '',
  style = {},
  interval = 4000,
  indicators = true,
  controls = true,
  fade = true,
  pause = 'hover',
  onSelect,
}) => {
  const [activeTab, setActiveTab] = useState<string>("0");
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelect = (selectedIndex: number) => {
    setActiveIndex(selectedIndex);
    onSelect?.(selectedIndex);
  };

  const currentTabImages = tabImages[parseInt(activeTab)] || [];

  if (!tabImages || tabImages.length === 0) {
    return (
      <Modal show={show} onHide={onClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>KASAKOUN Gallery</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="no-images-message">
            <p>No gallery images available</p>
          </div>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>KASAKOUN Gallery</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs
          id="kasakoun-gallery-tabs"
          activeKey={activeTab}
          onSelect={(k) => {
            setActiveTab(k || "0");
            setActiveIndex(0); // Reset to first image when changing tabs
          }}
          className="mb-3"
        >
          {tabTitles.map((title, index) => (
            <Tab key={index} eventKey={index.toString()} title={title}>
              {tabImages[index] && tabImages[index].length > 0 ? (
                <Carousel
                  activeIndex={activeIndex}
                  onSelect={handleSelect}
                  interval={interval}
                  indicators={indicators}
                  controls={controls}
                  fade={fade}
                  pause={pause}
                  className="kasakoun-carousel"
                >
                  {tabImages[index].map((image, imageIndex) => (
                    <Carousel.Item key={imageIndex} className="kasakoun-carousel-item">
                      <ResponsiveImage
                        src={image}
                        alt={`${title} ${imageIndex + 1}`}
                        className="kasakoun-carousel-image"
                        priority={imageIndex === 0}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                        aspectRatio={4/3}
                        objectFit="cover"
                        fallbackOnly={true} // Use fallback mode until optimized images are available
                      />
                      {/* <Carousel.Caption className="kasakoun-carousel-caption">
                        <h5>{`${title} ${imageIndex + 1}`}</h5>
                        <p>{`Gallery Image ${imageIndex + 1} of ${tabImages[index].length}`}</p>
                      </Carousel.Caption> */}
                    </Carousel.Item>
                  ))}
                </Carousel>
              ) : (
                <div className="no-images-message">
                  <p>No images available for {title}</p>
                </div>
              )}
            </Tab>
          ))}
        </Tabs>
      </Modal.Body>
    </Modal>
  );
};

export default KasakounGalleryCarousel; 