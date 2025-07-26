import React, { useState, useEffect, useRef } from 'react';
import ResponsiveImage from './ResponsiveImage';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
  threshold?: number;
  rootMargin?: string;
  sizes?: string;
  aspectRatio?: number;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  style = {},
  placeholder,
  onLoad,
  onError,
  threshold = 0.1,
  rootMargin = '200px',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  aspectRatio,
  objectFit = 'cover',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasIntersected) {
            setIsVisible(true);
            setHasIntersected(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [threshold, rootMargin, hasIntersected]);

  return (
    <div
      ref={containerRef}
      className={`lazy-image-container ${className}`}
      style={style}
    >
      {isVisible ? (
        <ResponsiveImage
          src={src}
          alt={alt}
          className="lazy-image"
          placeholder={placeholder}
          onLoad={onLoad}
          onError={onError}
          sizes={sizes}
          aspectRatio={aspectRatio}
          objectFit={objectFit}
          loading="lazy"
        />
      ) : (
        <div className="lazy-image-placeholder">
          {placeholder && (
            <img
              src={placeholder}
              alt=""
              className="placeholder-image"
              style={{
                width: '100%',
                height: '100%',
                objectFit,
                filter: 'blur(10px)',
                transform: 'scale(1.1)',
                opacity: 0.7,
              }}
            />
          )}
          <div className="lazy-image-spinner">
            <div className="spinner"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LazyImage; 