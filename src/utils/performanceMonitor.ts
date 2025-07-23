// Performance monitoring utilities for image loading

export interface ImageLoadMetrics {
  src: string;
  loadTime: number;
  size: number;
  timestamp: number;
}

export interface PerformanceMetrics {
  totalImages: number;
  averageLoadTime: number;
  slowImages: ImageLoadMetrics[];
  cacheHitRate: number;
}

class PerformanceMonitor {
  private imageMetrics: ImageLoadMetrics[] = [];
  private cacheHits = 0;
  private cacheMisses = 0;

  // Track image load performance
  trackImageLoad(src: string, loadTime: number, size: number) {
    const metric: ImageLoadMetrics = {
      src,
      loadTime,
      size,
      timestamp: Date.now(),
    };

    this.imageMetrics.push(metric);

    // Log slow images (over 2 seconds)
    if (loadTime > 2000) {
      console.warn(`Slow image load detected: ${src} took ${loadTime}ms`);
    }

    // Keep only last 100 metrics to prevent memory issues
    if (this.imageMetrics.length > 100) {
      this.imageMetrics = this.imageMetrics.slice(-100);
    }
  }

  // Track cache hits/misses
  trackCacheHit(hit: boolean) {
    if (hit) {
      this.cacheHits++;
    } else {
      this.cacheMisses++;
    }
  }

  // Get performance metrics
  getMetrics(): PerformanceMetrics {
    const totalImages = this.imageMetrics.length;
    const averageLoadTime = totalImages > 0 
      ? this.imageMetrics.reduce((sum, metric) => sum + metric.loadTime, 0) / totalImages 
      : 0;
    
    const slowImages = this.imageMetrics.filter(metric => metric.loadTime > 2000);
    const cacheHitRate = (this.cacheHits + this.cacheMisses) > 0 
      ? this.cacheHits / (this.cacheHits + this.cacheMisses) 
      : 0;

    return {
      totalImages,
      averageLoadTime,
      slowImages,
      cacheHitRate,
    };
  }

  // Log performance report
  logPerformanceReport() {
    const metrics = this.getMetrics();
    console.group('📊 Image Loading Performance Report');
    console.log(`Total images loaded: ${metrics.totalImages}`);
    console.log(`Average load time: ${metrics.averageLoadTime.toFixed(2)}ms`);
    console.log(`Cache hit rate: ${(metrics.cacheHitRate * 100).toFixed(1)}%`);
    console.log(`Slow images (>2s): ${metrics.slowImages.length}`);
    
    if (metrics.slowImages.length > 0) {
      console.group('🐌 Slow Images:');
      metrics.slowImages.forEach(metric => {
        console.log(`${metric.src}: ${metric.loadTime}ms`);
      });
      console.groupEnd();
    }
    console.groupEnd();
  }

  // Clear metrics
  clear() {
    this.imageMetrics = [];
    this.cacheHits = 0;
    this.cacheMisses = 0;
  }
}

// Global performance monitor instance
export const performanceMonitor = new PerformanceMonitor();

// Utility function to measure image load time
export const measureImageLoad = (src: string): Promise<number> => {
  return new Promise((resolve) => {
    const startTime = performance.now();
    const img = new Image();
    
    img.onload = () => {
      const loadTime = performance.now() - startTime;
      performanceMonitor.trackImageLoad(src, loadTime, 0); // Size not available
      resolve(loadTime);
    };
    
    img.onerror = () => {
      const loadTime = performance.now() - startTime;
      console.error(`Failed to load image: ${src}`);
      resolve(loadTime);
    };
    
    img.src = src;
  });
};

// Network performance utilities
export const getNetworkInfo = () => {
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    return {
      effectiveType: connection.effectiveType,
      downlink: connection.downlink,
      rtt: connection.rtt,
      saveData: connection.saveData,
    };
  }
  return null;
};

// Connection-aware image loading strategy
export const getOptimalImageStrategy = () => {
  const networkInfo = getNetworkInfo();
  
  if (!networkInfo) {
    return { quality: 85, preload: true };
  }
  
  switch (networkInfo.effectiveType) {
    case 'slow-2g':
    case '2g':
      return { quality: 60, preload: false };
    case '3g':
      return { quality: 75, preload: true };
    case '4g':
    default:
      return { quality: 85, preload: true };
  }
};

// Export for global access in development
if (process.env.NODE_ENV === 'development') {
  (window as any).performanceMonitor = performanceMonitor;
  (window as any).getNetworkInfo = getNetworkInfo;
} 