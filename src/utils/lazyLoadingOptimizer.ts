// Utility for optimizing lazy loading strategies and monitoring performance

export interface LazyLoadingConfig {
  rootMargin: string;
  threshold: number;
  priority: 'critical' | 'high' | 'normal' | 'low';
  preload: boolean;
  placeholder: boolean;
}

export interface ImageLoadMetrics {
  src: string;
  loadTime: number;
  size: number;
  cacheHit: boolean;
  timestamp: number;
}

class LazyLoadingOptimizer {
  private metrics: ImageLoadMetrics[] = [];
  private configs: Map<string, LazyLoadingConfig> = new Map();

  // Default configurations for different image types
  private defaultConfigs = {
    critical: {
      rootMargin: '0px',
      threshold: 0,
      priority: 'critical' as const,
      preload: true,
      placeholder: false,
    },
    aboveFold: {
      rootMargin: '50px',
      threshold: 0.1,
      priority: 'high' as const,
      preload: true,
      placeholder: true,
    },
    belowFold: {
      rootMargin: '200px',
      threshold: 0.1,
      priority: 'normal' as const,
      preload: false,
      placeholder: true,
    },
    carousel: {
      rootMargin: '100px',
      threshold: 0.1,
      priority: 'normal' as const,
      preload: false,
      placeholder: true,
    },
    background: {
      rootMargin: '300px',
      threshold: 0.05,
      priority: 'low' as const,
      preload: false,
      placeholder: true,
    },
  };

  constructor() {
    this.initializeDefaultConfigs();
  }

  private initializeDefaultConfigs() {
    // Set default configurations for common image patterns
    this.setConfig('logo', this.defaultConfigs.critical);
    this.setConfig('hero', this.defaultConfigs.aboveFold);
    this.setConfig('gallery', this.defaultConfigs.belowFold);
    this.setConfig('carousel', this.defaultConfigs.carousel);
    this.setConfig('background', this.defaultConfigs.background);
  }

  // Get configuration for a specific image type or URL pattern
  getConfig(imageSrc: string, imageType?: string): LazyLoadingConfig {
    // Check for specific image type first
    if (imageType && this.configs.has(imageType)) {
      return this.configs.get(imageType)!;
    }

    // Check for URL patterns
    if (imageSrc.includes('/logo') || imageSrc.includes('logo')) {
      return this.defaultConfigs.critical;
    }
    if (imageSrc.includes('/hero') || imageSrc.includes('hero')) {
      return this.defaultConfigs.aboveFold;
    }
    if (imageSrc.includes('/gallery') || imageSrc.includes('gallery')) {
      return this.defaultConfigs.belowFold;
    }
    if (imageSrc.includes('/carousel') || imageSrc.includes('carousel')) {
      return this.defaultConfigs.carousel;
    }
    if (imageSrc.includes('/background') || imageSrc.includes('bg')) {
      return this.defaultConfigs.background;
    }

    // Default to below fold for unknown images
    return this.defaultConfigs.belowFold;
  }

  // Set custom configuration for specific image types
  setConfig(imageType: string, config: LazyLoadingConfig) {
    this.configs.set(imageType, config);
  }

  // Record image load metrics for performance monitoring
  recordImageLoad(metrics: ImageLoadMetrics) {
    this.metrics.push(metrics);
    
    // Keep only last 1000 metrics to prevent memory bloat
    if (this.metrics.length > 1000) {
      this.metrics = this.metrics.slice(-1000);
    }
  }

  // Get performance statistics
  getPerformanceStats() {
    if (this.metrics.length === 0) {
      return {
        totalImages: 0,
        averageLoadTime: 0,
        cacheHitRate: 0,
        totalSize: 0,
      };
    }

    const totalImages = this.metrics.length;
    const averageLoadTime = this.metrics.reduce((sum, m) => sum + m.loadTime, 0) / totalImages;
    const cacheHitRate = this.metrics.filter(m => m.cacheHit).length / totalImages;
    const totalSize = this.metrics.reduce((sum, m) => sum + m.size, 0);

    return {
      totalImages,
      averageLoadTime,
      cacheHitRate,
      totalSize,
    };
  }

  // Get recommendations for optimization
  getOptimizationRecommendations() {
    const stats = this.getPerformanceStats();
    const recommendations: string[] = [];

    if (stats.averageLoadTime > 2000) {
      recommendations.push('Consider implementing image compression or using WebP format');
    }

    if (stats.cacheHitRate < 0.3) {
      recommendations.push('Implement better caching strategies for frequently accessed images');
    }

    if (stats.totalSize > 10 * 1024 * 1024) { // 10MB
      recommendations.push('Total image size is large, consider lazy loading more aggressively');
    }

    return recommendations;
  }

  // Determine if an image should be preloaded based on its priority and position
  shouldPreload(imageSrc: string, imageType?: string): boolean {
    const config = this.getConfig(imageSrc, imageType);
    return config.preload;
  }

  // Get optimal loading strategy for carousel images
  getCarouselLoadingStrategy(activeIndex: number, totalImages: number) {
    const strategy = {
      eager: [] as number[],
      lazy: [] as number[],
    };

    // Load current and adjacent images eagerly
    for (let i = 0; i < totalImages; i++) {
      if (i === activeIndex || Math.abs(i - activeIndex) <= 1 || i === 0) {
        strategy.eager.push(i);
      } else {
        strategy.lazy.push(i);
      }
    }

    return strategy;
  }

  // Check if image is likely to be above the fold
  isAboveFold(imageSrc: string, imageType?: string): boolean {
    const config = this.getConfig(imageSrc, imageType);
    return config.priority === 'critical' || config.priority === 'high';
  }

  // Get optimal root margin based on image type and viewport
  getOptimalRootMargin(imageSrc: string, imageType?: string): string {
    const config = this.getConfig(imageSrc, imageType);
    
    // Adjust root margin based on viewport size
    if (typeof window !== 'undefined') {
      const viewportHeight = window.innerHeight;
      const isMobile = viewportHeight < 768;
      
      if (isMobile) {
        // Smaller root margin for mobile to save bandwidth
        return '100px';
      }
    }
    
    return config.rootMargin;
  }

  // Clear metrics (useful for testing or memory management)
  clearMetrics() {
    this.metrics = [];
  }

  // Export metrics for analysis
  exportMetrics(): ImageLoadMetrics[] {
    return [...this.metrics];
  }
}

// Create singleton instance
export const lazyLoadingOptimizer = new LazyLoadingOptimizer();

// Helper functions for common use cases
export const getLazyLoadingConfig = (imageSrc: string, imageType?: string) => {
  return lazyLoadingOptimizer.getConfig(imageSrc, imageType);
};

export const shouldPreloadImage = (imageSrc: string, imageType?: string) => {
  return lazyLoadingOptimizer.shouldPreload(imageSrc, imageType);
};

export const getCarouselStrategy = (activeIndex: number, totalImages: number) => {
  return lazyLoadingOptimizer.getCarouselLoadingStrategy(activeIndex, totalImages);
};

export const isImageAboveFold = (imageSrc: string, imageType?: string) => {
  return lazyLoadingOptimizer.isAboveFold(imageSrc, imageType);
};

export const getOptimalRootMargin = (imageSrc: string, imageType?: string) => {
  return lazyLoadingOptimizer.getOptimalRootMargin(imageSrc, imageType);
};

export default lazyLoadingOptimizer; 