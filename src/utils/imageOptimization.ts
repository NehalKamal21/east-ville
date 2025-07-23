// Image optimization utilities

export interface ImageSize {
  width: number;
  height: number;
  quality?: number;
}

export interface ResponsiveImage {
  src: string;
  srcSet?: string;
  sizes?: string;
  placeholder?: string;
}

// Generate responsive image srcSet for different screen sizes
export const generateSrcSet = (
  baseSrc: string,
  sizes: ImageSize[],
  format: 'webp' | 'jpg' | 'png' = 'webp'
): string => {
  return sizes
    .map(size => {
      const width = size.width;
      const quality = size.quality || 80;
      // In a real implementation, you'd have a CDN or image service
      // For now, we'll use the original image
      return `${baseSrc} ${width}w`;
    })
    .join(', ');
};

// Generate sizes attribute for responsive images
export const generateSizes = (breakpoints: { [key: string]: string }): string => {
  return Object.entries(breakpoints)
    .map(([media, size]) => `${media} ${size}`)
    .join(', ');
};

// Create a low-quality placeholder URL
export const createPlaceholderUrl = (src: string, width: number = 20): string => {
  // In a real implementation, you'd generate a tiny version of the image
  // For now, we'll use a data URL with a simple gradient
  return `data:image/svg+xml;base64,${btoa(`
    <svg width="${width}" height="${width}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f0f0f0"/>
          <stop offset="100%" stop-color="#e0e0e0"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)"/>
    </svg>
  `)}`;
};

// Preload critical images
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to preload image: ${src}`));
    img.src = src;
  });
};

// Preload multiple images
export const preloadImages = async (srcs: string[]): Promise<void> => {
  const promises = srcs.map(src => preloadImage(src));
  await Promise.allSettled(promises);
};

// Get image dimensions
export const getImageDimensions = (src: string): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = () => reject(new Error(`Failed to get dimensions for: ${src}`));
    img.src = src;
  });
};

// Optimize image loading based on connection speed
export const getOptimalImageQuality = (): number => {
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
      return 60;
    } else if (connection.effectiveType === '3g') {
      return 75;
    }
  }
  return 85; // Default quality for fast connections
};

// Generate responsive image object
export const createResponsiveImage = (
  src: string,
  alt: string,
  priority: boolean = false
): ResponsiveImage => {
  const placeholder = createPlaceholderUrl(src);
  
  return {
    src,
    placeholder,
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  };
};

// Image loading strategies
export const ImageLoadingStrategy = {
  EAGER: 'eager', // Load immediately
  LAZY: 'lazy',   // Load when in viewport
  PRIORITY: 'priority', // Load with high priority
} as const;

export type ImageLoadingStrategyType = typeof ImageLoadingStrategy[keyof typeof ImageLoadingStrategy];

// Determine loading strategy based on image importance and position
export const getLoadingStrategy = (
  isAboveFold: boolean,
  isCritical: boolean = false
): ImageLoadingStrategyType => {
  if (isCritical || isAboveFold) {
    return ImageLoadingStrategy.PRIORITY;
  }
  return ImageLoadingStrategy.LAZY;
}; 