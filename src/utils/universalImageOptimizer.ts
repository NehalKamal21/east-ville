// Universal Image Optimizer for all application images

import { loadingManager } from './loadingManager';

// Image optimization settings
const IMAGE_SETTINGS = {
  // Quality settings for different image types
  quality: {
    critical: 0.9,
    high: 0.8,
    normal: 0.7,
    low: 0.6,
  },
  
  // Format preferences
  formats: ['webp', 'avif', 'jpg', 'png'],
  
  // Sizes for responsive images
  sizes: {
    thumbnail: 150,
    small: 300,
    medium: 600,
    large: 1200,
    xlarge: 2400,
  },
  
  // Preload settings
  preload: {
    critical: true,
    high: true,
    normal: false,
    low: false,
  },
};

// Image cache for avoiding duplicate loads
const imageCache = new Map<string, Promise<void>>();

// Preload a single image with caching
export const preloadImageWithCache = (src: string): Promise<void> => {
  if (imageCache.has(src)) {
    return imageCache.get(src)!;
  }

  const preloadPromise = new Promise<void>((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      console.log(`✅ Image preloaded: ${src}`);
      resolve();
    };
    
    img.onerror = () => {
      console.warn(`⚠️ Failed to preload: ${src}`);
      reject(new Error(`Failed to preload: ${src}`));
    };
    
    img.crossOrigin = 'anonymous';
    img.src = src;
  });

  imageCache.set(src, preloadPromise);
  return preloadPromise;
};

// Preload multiple images with progress tracking and caching
export const preloadImagesWithCache = async (
  images: string[],
  onProgress?: (loaded: number, total: number) => void
): Promise<void> => {
  let loaded = 0;
  const total = images.length;
  
  const promises = images.map(async (src) => {
    try {
      await preloadImageWithCache(src);
      loaded++;
      onProgress?.(loaded, total);
    } catch (error) {
      console.warn(`Failed to preload image: ${src}`, error);
      loaded++;
      onProgress?.(loaded, total);
    }
  });
  
  await Promise.allSettled(promises);
};

// Get optimized image source based on device and connection
export const getOptimizedImageSrc = (
  src: string,
  size: keyof typeof IMAGE_SETTINGS.sizes = 'large',
  format?: string
): string => {
  // For now, return the original source
  // In a production environment, you would implement:
  // 1. CDN URL transformation
  // 2. Format conversion (WebP/AVIF)
  // 3. Size optimization
  // 4. Quality adjustment based on connection speed
  
  return src;
};

// Register image with loading manager and preload if needed
export const registerAndPreloadImage = async (
  id: string,
  src: string,
  priority: 'critical' | 'high' | 'normal' = 'normal',
  shouldPreload: boolean = true
): Promise<void> => {
  // Register with loading manager
  loadingManager.registerItem(id, src, 'image', priority);
  
  // Preload if needed
  if (shouldPreload && IMAGE_SETTINGS.preload[priority]) {
    try {
      await preloadImageWithCache(src);
      loadingManager.markLoaded(id);
    } catch (error) {
      console.warn(`Failed to preload image: ${src}`, error);
      loadingManager.markError(id);
    }
  }
};

// Batch register and preload images
export const batchRegisterAndPreload = async (
  images: Array<{
    id: string;
    src: string;
    priority?: 'critical' | 'high' | 'normal';
    preload?: boolean;
  }>,
  onProgress?: (loaded: number, total: number) => void
): Promise<void> => {
  let loaded = 0;
  const total = images.length;
  
  const promises = images.map(async (image) => {
    try {
      await registerAndPreloadImage(
        image.id,
        image.src,
        image.priority,
        image.preload
      );
      loaded++;
      onProgress?.(loaded, total);
    } catch (error) {
      console.warn(`Failed to process image: ${image.src}`, error);
      loaded++;
      onProgress?.(loaded, total);
    }
  });
  
  await Promise.allSettled(promises);
};

// Optimize image loading based on connection speed
export const getConnectionAwareSettings = () => {
  const connection = (navigator as any).connection;
  
  if (!connection) {
    return {
      quality: IMAGE_SETTINGS.quality.normal,
      preload: true,
      format: 'webp',
    };
  }
  
  const { effectiveType, downlink } = connection;
  
  // Adjust settings based on connection
  if (effectiveType === '4g' && downlink > 10) {
    return {
      quality: IMAGE_SETTINGS.quality.high,
      preload: true,
      format: 'webp',
    };
  } else if (effectiveType === '3g' || downlink > 1.5) {
    return {
      quality: IMAGE_SETTINGS.quality.normal,
      preload: true,
      format: 'webp',
    };
  } else {
    return {
      quality: IMAGE_SETTINGS.quality.low,
      preload: false,
      format: 'jpg',
    };
  }
};

// Clear image cache
export const clearImageCache = (): void => {
  imageCache.clear();
};

// Get cache statistics
export const getCacheStats = () => {
  return {
    size: imageCache.size,
    entries: Array.from(imageCache.keys()),
  };
};

// Preload critical images with connection awareness
export const preloadCriticalImagesOptimized = async (): Promise<void> => {
  const settings = getConnectionAwareSettings();
  
  console.log('🚀 Starting optimized critical image preloading...', settings);
  
  const criticalImages = [
    '/ajna-logo.jpg',
    '/icons/360-degrees-icon.png',
    '/map-pin-icon.png',
    '/assets/masterplan/image_1.png',
  ];
  
  try {
    await preloadImagesWithCache(criticalImages, (loaded, total) => {
      console.log(`Critical images: ${loaded}/${total}`);
    });
    
    console.log('✅ Critical images preloaded with optimization');
  } catch (error) {
    console.warn('⚠️ Some critical images failed to preload:', error);
  }
};

// Export settings for use in components
export { IMAGE_SETTINGS }; 