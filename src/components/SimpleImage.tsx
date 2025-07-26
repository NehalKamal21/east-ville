import React, { useState, useEffect, useRef } from 'react';
import { preloadImage } from '../utils/comprehensiveImagePreloader';
import { loadingManager } from '../utils/loadingManager';

interface SimpleImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
  priority?: boolean;
  aspectRatio?: number;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
}

const SimpleImage: React.FC<SimpleImageProps> = ({
  src,
  alt,
  className = '',
  style = {},
  placeholder,
  onLoad,
  onError,
  priority = false,
  aspectRatio,
  objectFit = 'cover',
  loading = 'lazy',
  decoding = 'async',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string>('');
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (priority) {
      const itemId = `simple-${src}`;
      loadingManager.registerItem(itemId, src, 'image', 'critical');
    }

    const loadImage = async () => {
      try {
        console.log(`🔄 Loading simple image: ${src}`);
        await preloadImage(src);

        if (priority) {
          setCurrentSrc(src);
        } else {
          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting && imgRef.current) {
                  setCurrentSrc(src);
                  observer.unobserve(entry.target);
                }
              });
            },
            { rootMargin: '200px', threshold: 0.1 }
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
      } catch (error) {
        console.warn(`⚠️ Failed to preload simple image: ${src}`, error);
        setCurrentSrc(src); // Fallback to direct loading
      }
    };

    loadImage();
  }, [src, priority]);

  const handleLoad = () => {
    console.log(`✅ Simple image loaded: ${src}`);
    setIsLoaded(true);
    if (priority) {
      loadingManager.markLoaded(`simple-${src}`);
    }
    onLoad?.();
  };

  const handleError = (error: any) => {
    console.error(`❌ Simple image failed to load: ${src}`, error);
    setHasError(true);
    onError?.();
  };

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    ...style,
  };

  if (aspectRatio) {
    containerStyle.aspectRatio = aspectRatio.toString();
  }

  const imageStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit,
    opacity: isLoaded ? 1 : 0,
    transition: 'opacity 0.3s ease-in-out',
  };

  if (!currentSrc) {
    return (
      <div className={`simple-image-container ${className}`} style={containerStyle}>
        {placeholder && (
          <img
            src={placeholder}
            alt=""
            className="simple-image-placeholder"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit,
              filter: 'blur(10px)',
              transform: 'scale(1.1)',
              opacity: 0.7,
            }}
          />
        )}
        <div className="simple-image-spinner">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className={`simple-image-container simple-image-error ${className}`} style={containerStyle}>
        <div className="error-message">
          <p>Failed to load image</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`simple-image-container ${className}`} style={containerStyle}>
      {placeholder && !isLoaded && (
        <img
          src={placeholder}
          alt=""
          className="simple-image-placeholder"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit,
            filter: 'blur(10px)',
            transform: 'scale(1.1)',
            opacity: 0.7,
          }}
        />
      )}
      
      <img
        ref={imgRef}
        src={currentSrc}
        alt={alt}
        className="simple-image-main"
        style={imageStyle}
        onLoad={handleLoad}
        onError={handleError}
        loading={priority ? 'eager' : loading}
        decoding={decoding}
      />

      {!isLoaded && (
        <div className="simple-image-spinner">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
};

export default SimpleImage; 