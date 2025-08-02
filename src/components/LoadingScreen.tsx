// src/components/LoadingScreen.tsx
import React, { useState, useEffect } from "react";

interface LoadingScreenProps {
  onLoadComplete?: () => void;
  imagesToLoad?: string[];
  showProgress?: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  onLoadComplete, 
  imagesToLoad = [], 
  showProgress = false 
}) => {
  const [loadedImages, setLoadedImages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (imagesToLoad.length === 0) {
      // If no images to load, complete immediately
      setIsLoading(false);
      onLoadComplete?.();
      return;
    }

    let completedImages = 0;
    const totalImages = imagesToLoad.length;

    const preloadImage = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          completedImages++;
          setLoadedImages(completedImages);
          
          if (completedImages === totalImages) {
            setIsLoading(false);
            onLoadComplete?.();
          }
          resolve();
        };
        img.onerror = () => {
          console.warn(`Failed to load image: ${src}`);
          completedImages++;
          setLoadedImages(completedImages);
          
          if (completedImages === totalImages) {
            setIsLoading(false);
            onLoadComplete?.();
          }
          resolve(); // Continue even if some images fail
        };
        img.src = src;
      });
    };

    // Preload all images
    Promise.all(imagesToLoad.map(preloadImage));
  }, [imagesToLoad, onLoadComplete]);

  const progressPercentage = imagesToLoad.length > 0 
    ? Math.round((loadedImages / imagesToLoad.length) * 100) 
    : 100;

  return (
    <div className="loading-screen">
      <video
        src="/ajna.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="loading-video"
      />
      
      {showProgress && imagesToLoad.length > 0 && (
        <div className="loading-progress">
          <div className="progress-container">
            <div 
              className="progress-bar" 
              style={{ width: `${progressPercentage}%` }}
            />
            <span className="progress-text">
              Loading... {progressPercentage}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

LoadingScreen.displayName = 'LoadingScreen';

export default LoadingScreen;
