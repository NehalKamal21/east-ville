// Loading Manager for tracking critical image loading
import { 
  registerAllImages, 
  preloadAllCriticalImages, 
  preloadRemainingImages 
} from './comprehensiveImagePreloader';
import { preloadCriticalImagesOptimized } from './universalImageOptimizer';

export interface LoadingItem {
  id: string;
  src: string;
  type: 'image' | 'component' | 'data';
  priority: 'critical' | 'high' | 'normal';
  loaded: boolean;
  error: boolean;
  startTime: number;
  loadTime?: number;
}

class LoadingManager {
  private loadingItems: Map<string, LoadingItem> = new Map();
  private listeners: Set<(isLoading: boolean) => void> = new Set();
  private criticalItems: Set<string> = new Set();
  private isInitialized = false;

  // Register a loading item
  registerItem(id: string, src: string, type: LoadingItem['type'], priority: LoadingItem['priority'] = 'normal') {
    const item: LoadingItem = {
      id,
      src,
      type,
      priority,
      loaded: false,
      error: false,
      startTime: Date.now(),
    };

    this.loadingItems.set(id, item);
    
    if (priority === 'critical') {
      this.criticalItems.add(id);
    }

    this.notifyListeners();
    return item;
  }

  // Mark an item as loaded
  markLoaded(id: string) {
    const item = this.loadingItems.get(id);
    if (item) {
      item.loaded = true;
      item.loadTime = Date.now() - item.startTime;
      console.log(`✅ Loaded: ${id} (${item.loadTime}ms)`);
      this.notifyListeners();
    }
  }

  // Mark an item as failed
  markError(id: string) {
    const item = this.loadingItems.get(id);
    if (item) {
      item.error = true;
      item.loadTime = Date.now() - item.startTime;
      console.warn(`❌ Failed to load: ${id} (${item.loadTime}ms)`);
      this.notifyListeners();
    }
  }

  // Check if all critical items are loaded
  isAllCriticalLoaded(): boolean {
    if (this.criticalItems.size === 0) return true;
    
    // Count loaded and error items
    let loadedOrErrorCount = 0;
    
    for (const id of this.criticalItems) {
      const item = this.loadingItems.get(id);
      if (item && (item.loaded || item.error)) {
        loadedOrErrorCount++;
      }
    }
    
    // Allow the app to proceed if at least 75% of critical items are handled (loaded or errored)
    const criticalProgress = loadedOrErrorCount / this.criticalItems.size;
    return criticalProgress >= 0.75;
  }

  // Check if all items are loaded
  isAllLoaded(): boolean {
    for (const item of this.loadingItems.values()) {
      if (!item.loaded && !item.error) {
        return false;
      }
    }
    return true;
  }

  // Get loading progress (0-100)
  getProgress(): number {
    if (this.loadingItems.size === 0) return 100;
    
    let loadedCount = 0;
    let totalCount = 0;
    
    for (const item of this.loadingItems.values()) {
      totalCount++;
      if (item.loaded || item.error) {
        loadedCount++;
      }
    }
    
    return Math.round((loadedCount / totalCount) * 100);
  }

  // Get critical loading progress
  getCriticalProgress(): number {
    if (this.criticalItems.size === 0) return 100;
    
    let loadedCount = 0;
    
    for (const id of this.criticalItems) {
      const item = this.loadingItems.get(id);
      if (item && (item.loaded || item.error)) {
        loadedCount++;
      }
    }
    
    return Math.round((loadedCount / this.criticalItems.size) * 100);
  }

  // Subscribe to loading state changes
  subscribe(listener: (isLoading: boolean) => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  // Notify all listeners
  private notifyListeners() {
    const isLoading = !this.isAllCriticalLoaded();
    this.listeners.forEach(listener => listener(isLoading));
  }

  // Initialize the loading manager
  initialize() {
    if (this.isInitialized) return;
    
    // Register critical images that need to be loaded before showing the app
    this.registerCriticalImages();
    this.isInitialized = true;
  }

  // Register critical images
  private registerCriticalImages() {
    // Master plan background and key images
    this.registerItem('master-plan-bg', '/assets/masterplan/image_1.png', 'image', 'critical');
    this.registerItem('ajna-logo', '/ajna-logo.jpg', 'image', 'critical');
    this.registerItem('360-icon', '/icons/360-degrees-icon.png', 'image', 'critical');
    this.registerItem('map-pin', '/map-pin-icon.png', 'image', 'critical');
    
    // Preload these critical images
    this.preloadCriticalImages();
  }

  // Preload critical images using comprehensive preloader
  private async preloadCriticalImages() {
    try {
      // Register all images with loading manager
      registerAllImages();
      
      // Preload critical images with optimization
      await preloadCriticalImagesOptimized();
      
      // Preload all critical images
      await preloadAllCriticalImages();
      
      // Start preloading remaining images in background
      preloadRemainingImages().catch((error: Error) => {
        console.warn('Background image preloading failed:', error);
      });
      
      console.log('🎉 Critical images preload completed');
    } catch (error) {
      console.warn('Some critical images failed to load:', error);
    }
  }

  // Get item ID by source
  private getItemIdBySrc(src: string): string {
    for (const [id, item] of this.loadingItems.entries()) {
      if (item.src === src) {
        return id;
      }
    }
    return '';
  }

  // Get loading statistics
  getStats() {
    const total = this.loadingItems.size;
    const loaded = Array.from(this.loadingItems.values()).filter(item => item.loaded).length;
    const errors = Array.from(this.loadingItems.values()).filter(item => item.error).length;
    const critical = this.criticalItems.size;
    const criticalLoaded = Array.from(this.criticalItems).filter(id => {
      const item = this.loadingItems.get(id);
      return item && item.loaded;
    }).length;

    return {
      total,
      loaded,
      errors,
      critical,
      criticalLoaded,
      progress: this.getProgress(),
      criticalProgress: this.getCriticalProgress(),
      isAllLoaded: this.isAllLoaded(),
      isAllCriticalLoaded: this.isAllCriticalLoaded(),
    };
  }

  // Clear all items (useful for testing)
  clear() {
    this.loadingItems.clear();
    this.criticalItems.clear();
    this.notifyListeners();
  }

  // Reset for new page load
  reset() {
    this.loadingItems.clear();
    this.criticalItems.clear();
    this.isInitialized = false;
    this.notifyListeners();
  }
}

// Global loading manager instance
export const loadingManager = new LoadingManager();

// Initialize on module load
if (typeof window !== 'undefined') {
  loadingManager.initialize();
}

// Export for global access in development
if (process.env.NODE_ENV === 'development') {
  (window as any).loadingManager = loadingManager;
} 