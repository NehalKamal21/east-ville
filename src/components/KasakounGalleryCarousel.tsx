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
  tabTitles = [],
  alt = 'Kasakoun Images',
  className = '',
  style = {},
  interval = 5000,
  indicators = true,
  controls = true,
  fade = true,
  pause = 'hover',
  onSelect,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeIndices, setActiveIndices] = useState<number[]>(new Array(tabImages.length).fill(0));

  const handleTabSelect = (tabIndex: number) => {
    setActiveTab(tabIndex);
    // Reset active index for the new tab
    setActiveIndices(prev => {
      const newIndices = [...prev];
      newIndices[tabIndex] = 0;
      return newIndices;
    });
  };

  const handleCarouselSelect = (imageIndex: number, tabIndex: number) => {
    setActiveIndices(prev => {
      const newIndices = [...prev];
      newIndices[tabIndex] = imageIndex;
      return newIndices;
    });
    onSelect?.(imageIndex);
  };

  // Determine if an image should be loaded eagerly based on its position relative to active index
  const shouldLoadEagerly = (imageIndex: number, tabIndex: number) => {
    const activeIndex = activeIndices[tabIndex];
    const isActive = imageIndex === activeIndex;
    const isAdjacent = Math.abs(imageIndex - activeIndex) <= 1;
    const isFirst = imageIndex === 0; // Always load first image eagerly
    return isActive || isAdjacent || isFirst;
  };

  if (!tabImages || tabImages.length === 0) {
    return (
      <Modal show={show} onHide={onClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>KASAKOUN Gallery</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="no-images-message">
            <p>No images available</p>
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
          activeKey={activeTab}
          onSelect={(k) => handleTabSelect(Number(k))}
          className="kasakoun-tabs"
        >
          {tabTitles.map((title, index) => (
            <Tab key={index} eventKey={index} title={title}>
              {tabImages[index] && tabImages[index].length > 0 ? (
                <Carousel
                  activeIndex={activeIndices[index]}
                  onSelect={(selectedIndex) => handleCarouselSelect(selectedIndex, index)}
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
                        priority={shouldLoadEagerly(imageIndex, index)}
                        loading={shouldLoadEagerly(imageIndex, index) ? 'eager' : 'lazy'}
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