import { useState, useCallback, useEffect } from 'react';

interface ImagePreloaderState {
  isPreloaded: boolean;
  isPreloading: boolean;
  error: string | null;
}

export const useImagePreloader = (imageSrc: string | null) => {
  const [state, setState] = useState<ImagePreloaderState>({
    isPreloaded: false,
    isPreloading: false,
    error: null,
  });

  const preloadImage = useCallback(async (src: string): Promise<void> => {
    try {
      console.log(`🔄 Preloading image: ${src}`);
      
      // Simple image preloading without complex optimization
      await new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          console.log(`✅ Image preloaded successfully: ${src}`);
          resolve();
        };
        img.onerror = () => {
          console.error(`❌ Failed to preload image: ${src}`);
          reject(new Error(`Failed to load: ${src}`));
        };
        img.crossOrigin = 'anonymous';
        img.src = src;
      });
    } catch (error) {
      console.error(`❌ Failed to preload image: ${src}`, error);
      throw error;
    }
  }, []);

  useEffect(() => {
    if (!imageSrc) {
      setState({
        isPreloaded: false,
        isPreloading: false,
        error: null,
      });
      return;
    }

    setState(prev => ({
      ...prev,
      isPreloading: true,
      error: null,
    }));

    preloadImage(imageSrc)
      .then(() => {
        setState({
          isPreloaded: true,
          isPreloading: false,
          error: null,
        });
      })
      .catch((error) => {
        setState({
          isPreloaded: false,
          isPreloading: false,
          error: error.message,
        });
      });
  }, [imageSrc, preloadImage]);

  return state;
};

// Batch preloader for multiple images
export const useBatchImagePreloader = (imageSrcs: string[]) => {
  const [preloadedImages, setPreloadedImages] = useState<Set<string>>(new Set());
  const [isPreloading, setIsPreloading] = useState(false);

  const preloadImages = useCallback(async (srcs: string[]) => {
    setIsPreloading(true);
    const newPreloaded = new Set<string>();

    const promises = srcs.map(async (src) => {
      try {
        await new Promise<void>((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            newPreloaded.add(src);
            resolve();
          };
          img.onerror = () => reject(new Error(`Failed to preload: ${src}`));
          img.crossOrigin = 'anonymous';
          img.src = src;
        });
      } catch (error) {
        console.warn(`Failed to preload image: ${src}`, error);
      }
    });

    await Promise.allSettled(promises);
    setPreloadedImages(newPreloaded);
    setIsPreloading(false);
  }, []);

  useEffect(() => {
    if (imageSrcs.length > 0) {
      preloadImages(imageSrcs);
    }
  }, [imageSrcs, preloadImages]);

  return {
    preloadedImages,
    isPreloading,
    preloadImages,
  };
}; 