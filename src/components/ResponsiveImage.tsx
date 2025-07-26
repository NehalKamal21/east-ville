import React, { useState, useEffect, useRef } from 'react';
import { lazyLoadingOptimizer, ImageLoadMetrics } from '../utils/lazyLoadingOptimizer';
import { generateSrcSet, generateSizes, supportsImageFormat } from '../utils/responsiveImageUtils';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  sizes?: string;
  aspectRatio?: number;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  fallbackOnly?: boolean;
  imageType?: string; // New prop for optimization
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
  loading = 'lazy',
  sizes,
  aspectRatio,
  objectFit = 'cover',
  fallbackOnly = false,
  imageType,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [webpSupported, setWebpSupported] = useState(false);
  const [avifSupported, setAvifSupported] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const loadStartTime = useRef<number>(Date.now());

  // Get lazy loading configuration
  const lazyConfig = lazyLoadingOptimizer.getConfig(src, imageType);

  useEffect(() => {
    // Detect browser support for modern formats
    const detectSupport = () => {
      setWebpSupported(supportsImageFormat('webp'));
      setAvifSupported(supportsImageFormat('avif'));
    };
    detectSupport();
  }, []);

  const handleLoad = () => {
    const loadTime = Date.now() - loadStartTime.current;
    console.log(`✅ ResponsiveImage loaded: ${src} in ${loadTime}ms`);
    
    setIsLoaded(true);
    
    // Record metrics for performance monitoring
    const metrics: ImageLoadMetrics = {
      src,
      loadTime,
      size: (imgRef.current?.naturalWidth || 0) * (imgRef.current?.naturalHeight || 0) * 4, // Rough estimate
      cacheHit: false, // Could be enhanced with actual cache detection
      timestamp: Date.now(),
    };
    lazyLoadingOptimizer.recordImageLoad(metrics);
    
    onLoad?.();
  };

  const handleError = (error: any) => {
    console.error(`❌ ResponsiveImage failed to load: ${src}`, error);
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

  // Generate responsive sources if not in fallback mode
  const generateSources = () => {
    if (fallbackOnly) return null;

    const sources = [];
    const optimalSizes = sizes || generateSizes();

    // AVIF source (highest quality)
    if (avifSupported) {
      const avifFormat = { type: 'avif' as const, extension: '.avif', mimeType: 'image/avif', quality: 80 };
      const avifSrcSet = generateSrcSet(src, avifFormat);
      sources.push(
        <source
          key="avif"
          type="image/avif"
          srcSet={avifSrcSet}
          sizes={optimalSizes}
        />
      );
    }

    // WebP source
    if (webpSupported) {
      const webpFormat = { type: 'webp' as const, extension: '.webp', mimeType: 'image/webp', quality: 85 };
      const webpSrcSet = generateSrcSet(src, webpFormat);
      sources.push(
        <source
          key="webp"
          type="image/webp"
          srcSet={webpSrcSet}
          sizes={optimalSizes}
        />
      );
    }

    return sources;
  };

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

  const sources = generateSources();
  const shouldUsePicture = sources && sources.length > 0;

  return (
    <div className={`responsive-image-container ${className}`} style={containerStyle}>
      {placeholder && !isLoaded && (
        <img
          src={placeholder}
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
      
      {shouldUsePicture ? (
        <picture>
          {sources}
          <img
            ref={imgRef}
            src={src}
            alt={alt}
            className="responsive-image-main"
            style={imageStyle}
            onLoad={handleLoad}
            onError={handleError}
            loading={priority ? 'eager' : loading}
            decoding="async"
            sizes={sizes || generateSizes()}
          />
        </picture>
      ) : (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className="responsive-image-main"
          style={imageStyle}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? 'eager' : loading}
          decoding="async"
          sizes={sizes || generateSizes()}
        />
      )}

      {!isLoaded && (
        <div className="responsive-image-spinner">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
};

export default ResponsiveImage; 