import React, { useState, useEffect, useRef } from 'react';
import { preloadImage } from '../utils/comprehensiveImagePreloader';
import { loadingManager } from '../utils/loadingManager';
import { 
  generateSrcSet, 
  generatePictureSources, 
  getOptimalFormat,
  getConnectionAwareSettings,
  generatePlaceholder,
  SUPPORTED_FORMATS 
} from '../utils/responsiveImageUtils';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
  priority?: boolean;
  sizes?: string;
  aspectRatio?: number;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
  formats?: ('avif' | 'webp' | 'jpeg' | 'png')[];
  fallbackOnly?: boolean; // New prop to use only original format
}

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  className = '',
  style = {},
  placeholder,
  onLoad,
  onError,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  aspectRatio,
  objectFit = 'cover',
  loading = 'lazy',
  decoding = 'async',
  formats,
  fallbackOnly = false, // Default to false
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string>('');
  const [optimalFormats, setOptimalFormats] = useState<typeof SUPPORTED_FORMATS>([]);
  const imgRef = useRef<HTMLImageElement>(null);

  // Initialize optimal formats based on browser support and connection
  useEffect(() => {
    const connectionSettings = getConnectionAwareSettings();
    const supportedFormats = formats 
      ? SUPPORTED_FORMATS.filter(f => formats.includes(f.type))
      : SUPPORTED_FORMATS;
    
    setOptimalFormats(supportedFormats);
  }, [formats]);

  // Generate responsive image sources for optimal formats
  const generateOptimalSrcSet = (baseSrc: string, format: typeof SUPPORTED_FORMATS[0]) => {
    return generateSrcSet(baseSrc, format);
  };

  // Generate picture sources for different formats
  const generatePictureSourcesForFormats = (baseSrc: string) => {
    if (fallbackOnly) {
      // Only use the original image format
      return [];
    }
    
    return optimalFormats.map(format => ({
      type: format.mimeType,
      srcSet: generateOptimalSrcSet(baseSrc, format),
      sizes,
    }));
  };

  useEffect(() => {
    if (priority) {
      const itemId = `responsive-${src}`;
      loadingManager.registerItem(itemId, src, 'image', 'critical');
    }

    const loadImage = async () => {
      try {
        console.log(`🔄 Loading responsive image: ${src}`);
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
        console.warn(`⚠️ Failed to preload responsive image: ${src}`, error);
        setCurrentSrc(src); // Fallback to direct loading
      }
    };

    loadImage();
  }, [src, priority]);

  const handleLoad = () => {
    console.log(`✅ Responsive image loaded: ${src}`);
    setIsLoaded(true);
    if (priority) {
      loadingManager.markLoaded(`responsive-${src}`);
    }
    onLoad?.();
  };

  const handleError = (error: any) => {
    console.error(`❌ Responsive image failed to load: ${src}`, error);
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

  // Generate placeholder if not provided
  const finalPlaceholder = placeholder || generatePlaceholder(400, 300);

  if (!currentSrc) {
    return (
      <div className={`responsive-image-container ${className}`} style={containerStyle}>
        {finalPlaceholder && (
          <img
            src={finalPlaceholder}
            alt=""
            className="responsive-image-placeholder"
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
        <div className="responsive-image-spinner">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className={`responsive-image-container responsive-image-error ${className}`} style={containerStyle}>
        <div className="error-message">
          <p>Failed to load image</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`responsive-image-container ${className}`} style={containerStyle}>
      {finalPlaceholder && !isLoaded && (
        <img
          src={finalPlaceholder}
          alt=""
          className="responsive-image-placeholder"
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
      
      <picture>
        {generatePictureSourcesForFormats(src).map((source, index) => (
          <source
            key={`${source.type}-${index}`}
            type={source.type}
            srcSet={source.srcSet}
            sizes={source.sizes}
          />
        ))}
        <img
          ref={imgRef}
          src={currentSrc}
          alt={alt}
          className="responsive-image-main"
          style={imageStyle}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? 'eager' : loading}
          decoding={decoding}
          sizes={sizes}
        />
      </picture>

      {!isLoaded && (
        <div className="responsive-image-spinner">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
};

export default ResponsiveImage; 