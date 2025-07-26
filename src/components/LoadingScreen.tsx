// src/components/LoadingScreen.tsx
import React, { useState, useEffect } from "react";
import { loadingManager } from "../utils/loadingManager";
import ResponsiveImage from "./ResponsiveImage";

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = React.memo(({ onLoadingComplete }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [stats, setStats] = useState(loadingManager.getStats());

  useEffect(() => {
    // Subscribe to loading state changes
    const unsubscribe = loadingManager.subscribe((loading) => {
      setIsLoading(loading);
      setStats(loadingManager.getStats());
      
      if (!loading) {
        // Add a small delay to ensure smooth transition
        setTimeout(() => {
          onLoadingComplete?.();
        }, 500);
      }
    });

    // Update progress periodically
    const progressInterval = setInterval(() => {
      setProgress(loadingManager.getCriticalProgress());
    }, 100);

    return () => {
      unsubscribe();
      clearInterval(progressInterval);
    };
  }, [onLoadingComplete]);

  // Don't render if not loading
  if (!isLoading) {
    return null;
  }

  return (
    <div className="loading-screen">
      <div className="loading-content">
        <ResponsiveImage
          src="/ajna-logo.jpg"
          alt="Ajna"
          className="loading-logo"
          priority={true}
          loading="eager"
          fallbackOnly={true}
        />
        
        {/* Progress bar */}
        <div className="loading-progress-container">
          <div className="loading-progress-bar">
            <div 
              className="loading-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="loading-progress-text">
            Loading... {progress}%
          </div>
        </div>

        {/* Loading stats (only in development) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="loading-stats">
            <small>
              Critical: {stats.criticalLoaded}/{stats.critical} | 
              Total: {stats.loaded}/{stats.total}
            </small>
          </div>
        )}
      </div>
    </div>
  );
});

LoadingScreen.displayName = 'LoadingScreen';

export default LoadingScreen;
