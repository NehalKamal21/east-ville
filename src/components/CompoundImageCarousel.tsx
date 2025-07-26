import React, { useState, useEffect } from 'react';
import { Modal, Carousel } from 'react-bootstrap';
import ResponsiveImage from './ResponsiveImage';

interface CompoundImageCarouselProps {
  show: boolean;
  onClose: () => void;
  images: string[];
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

const CompoundImageCarousel: React.FC<CompoundImageCarouselProps> = ({
  show,
  onClose,
  images,
  alt = 'Compound Images',
  className = '',
  style = {},
  interval = 5000,
  indicators = true,
  controls = true,
  fade = true,
  pause = 'hover',
  onSelect,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelect = (selectedIndex: number) => {
    setActiveIndex(selectedIndex);
    onSelect?.(selectedIndex);
  };

  // Determine if an image should be loaded eagerly based on its position relative to active index
  const shouldLoadEagerly = (index: number) => {
    const isActive = index === activeIndex;
    const isAdjacent = Math.abs(index - activeIndex) <= 1;
    const isFirst = index === 0; // Always load first image eagerly
    return isActive || isAdjacent || isFirst;
  };

  if (!images || images.length === 0) {
    return (
      <Modal show={show} onHide={onClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Compound Gallery</Modal.Title>
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
        <Modal.Title>Compound Gallery</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Carousel
          activeIndex={activeIndex}
          onSelect={handleSelect}
          interval={interval}
          indicators={indicators}
          controls={controls}
          fade={fade}
          pause={pause}
          className="compound-carousel"
        >
          {images.map((image, index) => (
            <Carousel.Item key={index} className="compound-carousel-item">
              <ResponsiveImage
                src={image}
                alt={`${alt} ${index + 1}`}
                className="compound-carousel-image"
                priority={shouldLoadEagerly(index)}
                loading={shouldLoadEagerly(index) ? 'eager' : 'lazy'}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                aspectRatio={16/9}
                objectFit="cover"
                fallbackOnly={true} // Use fallback mode until optimized images are available
              />
              {/* <Carousel.Caption className="compound-carousel-caption">
                <h5>{`${alt} ${index + 1}`}</h5>
                <p>{`Image ${index + 1} of ${images.length}`}</p>
              </Carousel.Caption> */}
            </Carousel.Item>
          ))}
        </Carousel>
      </Modal.Body>
    </Modal>
  );
};

export default CompoundImageCarousel;