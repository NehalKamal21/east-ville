import React, { useState, useEffect, useRef } from 'react';
import { performanceMonitor, measureImageLoad } from '../utils/performanceMonitor';
import { loadingManager } from '../utils/loadingManager';

interface ProgressiveImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
  priority?: boolean;
}

const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  src,
  alt,
  className,
  style,
  placeholder,
  onLoad,
  onError,
  priority = false,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(placeholder || '');
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Register with loading manager if priority
    if (priority) {
      const itemId = `progressive-${src}`;
      loadingManager.registerItem(itemId, src, 'image', 'critical');
    }

    if (priority) {
      // Load immediately for priority images
      setCurrentSrc(src);
    } else {
      // Use intersection observer for lazy loading
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && imgRef.current) {
              setCurrentSrc(src);
              observer.unobserve(entry.target);
            }
          });
        },
        {
          rootMargin: '200px', // Start loading 200px before the image comes into view
          threshold: 0.1,
        }
      );

      if (imgRef.current) {
        observer.observe(imgRef.current);
      }

      return () => {
        if (imgRef.current) {
          observer.unobserve(imgRef.current);
        }
      };
    }
  }, [src, priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    
    // Mark as loaded in loading manager if priority
    if (priority) {
      const itemId = `progressive-${src}`;
      loadingManager.markLoaded(itemId);
    }
    
    // Track performance metrics
    if (src && !priority) {
      measureImageLoad(src).then(loadTime => {
        console.log(`Image loaded: ${src} in ${loadTime.toFixed(2)}ms`);
      });
    }
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  return (
    <div
      className={`progressive-image-container ${className || ''}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* Low-quality placeholder */}
      {placeholder && !isLoaded && (
        <img
          src={placeholder}
          alt={`${alt} placeholder`}
          className="progressive-image-placeholder"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'blur(10px)',
            transform: 'scale(1.1)',
            opacity: 0.7,
          }}
        />
      )}
      
      {/* Main image */}
      <img
        ref={imgRef}
        src={currentSrc}
        alt={alt}
        className="progressive-image-main"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out',
        }}
        onLoad={handleLoad}
        onError={handleError}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
      />
      
      {/* Loading spinner */}
      {!isLoaded && !hasError && (
        <div
          className="progressive-image-spinner"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '40px',
            height: '40px',
            border: '3px solid rgba(255, 255, 255, 0.3)',
            borderTop: '3px solid #67b1a4',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }}
        />
      )}
      
      {/* Error state */}
      {hasError && (
        <div
          className="progressive-image-error"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#666',
            fontSize: '14px',
            textAlign: 'center',
          }}
        >
          Failed to load image
        </div>
      )}
    </div>
  );
};

export default ProgressiveImage; 