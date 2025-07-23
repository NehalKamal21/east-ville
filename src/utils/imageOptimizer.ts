// Image optimization utilities

export interface ImageOptimizationOptions {
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png';
  maxWidth?: number;
  maxHeight?: number;
}

// Check if WebP is supported
export const isWebPSupported = (): boolean => {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
};

// Get optimized image format
export const getOptimizedFormat = (): string => {
  return isWebPSupported() ? 'webp' : 'jpeg';
};

// Create optimized image URL
export const createOptimizedImageUrl = (
  originalSrc: string,
  options: ImageOptimizationOptions = {}
): string => {
  const { quality = 0.8, format = getOptimizedFormat(), maxWidth, maxHeight } = options;
  
  // For now, return the original source
  // In a production environment, you would use a CDN or image optimization service
  // like Cloudinary, ImageKit, or Next.js Image Optimization
  return originalSrc;
};

// Preload image with optimization
export const preloadOptimizedImage = (
  src: string,
  options: ImageOptimizationOptions = {}
): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      console.log(`✅ Optimized image loaded: ${src}`);
      resolve(img);
    };
    
    img.onerror = () => {
      console.error(`❌ Failed to load optimized image: ${src}`);
      reject(new Error(`Failed to load: ${src}`));
    };
    
    // Set crossOrigin for CORS
    img.crossOrigin = 'anonymous';
    
    // Use optimized URL if available
    const optimizedSrc = createOptimizedImageUrl(src, options);
    img.src = optimizedSrc;
  });
};

// Batch preload with optimization
export const preloadOptimizedImages = (
  sources: string[],
  options: ImageOptimizationOptions = {}
): Promise<HTMLImageElement[]> => {
  const promises = sources.map(src => preloadOptimizedImage(src, options));
  return Promise.allSettled(promises).then(results => {
    const successful: HTMLImageElement[] = [];
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        successful.push(result.value);
      } else {
        console.warn(`Failed to preload: ${sources[index]}`);
      }
    });
    return successful;
  });
};

// Image loading performance monitoring
export const monitorImageLoadPerformance = (src: string): Promise<number> => {
  return new Promise((resolve) => {
    const startTime = performance.now();
    
    const img = new Image();
    img.onload = () => {
      const loadTime = performance.now() - startTime;
      console.log(`📊 Image load time for ${src}: ${loadTime.toFixed(2)}ms`);
      resolve(loadTime);
    };
    
    img.onerror = () => {
      console.warn(`⚠️ Failed to load image for performance monitoring: ${src}`);
      resolve(0);
    };
    
    img.crossOrigin = 'anonymous';
    img.src = src;
  });
}; 