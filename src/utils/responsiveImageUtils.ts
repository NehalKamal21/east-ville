// Utility functions for responsive image handling

export interface ImageFormat {
  type: 'avif' | 'webp' | 'jpeg' | 'png';
  extension: string;
  mimeType: string;
  quality: number;
}

export interface ImageSize {
  width: number;
  height?: number;
  suffix: string;
}

// Supported image formats in order of preference
export const SUPPORTED_FORMATS: ImageFormat[] = [
  { type: 'avif', extension: '.avif', mimeType: 'image/avif', quality: 80 },
  { type: 'webp', extension: '.webp', mimeType: 'image/webp', quality: 85 },
  { type: 'jpeg', extension: '.jpg', mimeType: 'image/jpeg', quality: 90 },
  { type: 'png', extension: '.png', mimeType: 'image/png', quality: 90 },
];

// Standard responsive image sizes
export const RESPONSIVE_SIZES: ImageSize[] = [
  { width: 400, suffix: '_400w' },
  { width: 800, suffix: '_800w' },
  { width: 1200, suffix: '_1200w' },
  { width: 1600, suffix: '' }, // Default size
  { width: 2400, suffix: '_2400w' },
];

// Generate srcSet for a specific format
export const generateSrcSet = (baseSrc: string, format: ImageFormat): string => {
  return RESPONSIVE_SIZES
    .map(size => {
      const baseName = baseSrc.replace(/\.[^/.]+$/, '');
      const formatExt = format.extension;
      const sizeSuffix = size.suffix;
      return `${baseName}${sizeSuffix}${formatExt} ${size.width}w`;
    })
    .join(', ');
};

// Generate picture sources for all supported formats
export const generatePictureSources = (baseSrc: string, sizes: string = '100vw') => {
  return SUPPORTED_FORMATS.map(format => ({
    type: format.mimeType,
    srcSet: generateSrcSet(baseSrc, format),
    sizes,
  }));
};

// Check if browser supports specific image format
export const supportsImageFormat = (format: string): boolean => {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  
  try {
    const dataURL = canvas.toDataURL(`image/${format}`);
    return dataURL.startsWith(`data:image/${format}`);
  } catch {
    return false;
  }
};

// Get optimal format based on browser support
export const getOptimalFormat = (): ImageFormat => {
  for (const format of SUPPORTED_FORMATS) {
    if (supportsImageFormat(format.type)) {
      return format;
    }
  }
  return SUPPORTED_FORMATS[SUPPORTED_FORMATS.length - 1]; // Fallback to PNG
};

// Calculate optimal image size based on viewport and container
export const calculateOptimalSize = (
  containerWidth: number,
  devicePixelRatio: number = 1,
  maxWidth: number = 2400
): number => {
  const targetWidth = containerWidth * devicePixelRatio;
  const optimalSize = RESPONSIVE_SIZES.find(size => size.width >= targetWidth);
  return optimalSize ? optimalSize.width : maxWidth;
};

// Generate responsive sizes attribute
export const generateSizes = (
  breakpoints: { maxWidth: number; width: string }[] = [
    { maxWidth: 768, width: '100vw' },
    { maxWidth: 1200, width: '50vw' },
    { maxWidth: Infinity, width: '33vw' },
  ]
): string => {
  return breakpoints
    .map(({ maxWidth, width }) => 
      maxWidth === Infinity 
        ? width 
        : `(max-width: ${maxWidth}px) ${width}`
    )
    .join(', ');
};

// Preload responsive image variants
export const preloadResponsiveImage = async (
  baseSrc: string,
  format: ImageFormat,
  priority: boolean = false
): Promise<void> => {
  const srcSet = generateSrcSet(baseSrc, format);
  const urls = srcSet.split(', ').map(src => src.split(' ')[0]);
  
  const preloadPromises = urls.map(url => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject(new Error(`Failed to preload: ${url}`));
      img.src = url;
    });
  });

  if (priority) {
    // Load first image immediately
    await preloadPromises[0];
  }
  
  await Promise.allSettled(preloadPromises);
};

// Optimize image loading based on connection
export const getConnectionAwareSettings = () => {
  const connection = (navigator as any).connection;
  
  if (!connection) {
    return {
      quality: 'high',
      preloadCount: 2,
      format: getOptimalFormat(),
    };
  }

  const { effectiveType, saveData } = connection;
  
  if (saveData) {
    return {
      quality: 'low',
      preloadCount: 1,
      format: SUPPORTED_FORMATS[1], // WebP
    };
  }

  switch (effectiveType) {
    case 'slow-2g':
    case '2g':
      return {
        quality: 'low',
        preloadCount: 1,
        format: SUPPORTED_FORMATS[1], // WebP
      };
    case '3g':
      return {
        quality: 'medium',
        preloadCount: 2,
        format: getOptimalFormat(),
      };
    case '4g':
    default:
      return {
        quality: 'high',
        preloadCount: 3,
        format: getOptimalFormat(),
      };
  }
};

// Generate placeholder data URL
export const generatePlaceholder = (width: number = 400, height: number = 300): string => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    // Create a subtle gradient placeholder
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#f0f0f0');
    gradient.addColorStop(1, '#e0e0e0');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }
  
  return canvas.toDataURL('image/jpeg', 0.1);
};

// Debounce function for performance optimization
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle function for scroll-based optimizations
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}; 