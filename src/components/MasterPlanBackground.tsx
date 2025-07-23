import React, { useState, useEffect } from 'react';
import { preloadImage } from '../utils/comprehensiveImagePreloader';
import { loadingManager } from '../utils/loadingManager';

interface MasterPlanBackgroundProps {
  className?: string;
  style?: React.CSSProperties;
  onLoad?: () => void;
  onError?: () => void;
  children?: React.ReactNode;
}

const MasterPlanBackground: React.FC<MasterPlanBackgroundProps> = ({
  className = '',
  style = {},
  onLoad,
  onError,
  children,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isPreloading, setIsPreloading] = useState(true);
  
  const backgroundSrc = '/assets/masterplan/image_1.png';

  useEffect(() => {
    const preloadBackground = async () => {
      try {
        setIsPreloading(true);
        console.log('🔄 Preloading master plan background...');
        
        // Register with loading manager
        loadingManager.registerItem('master-plan-bg', backgroundSrc, 'image', 'critical');
        
        // Preload the image completely
        await preloadImage(backgroundSrc);
        
        // Mark as loaded in loading manager
        loadingManager.markLoaded('master-plan-bg');
        
        setIsLoaded(true);
        setIsPreloading(false);
        onLoad?.();
        
        console.log('✅ Master plan background preloaded successfully');
      } catch (error) {
        console.warn('⚠️ Failed to preload master plan background:', error);
        setHasError(true);
        setIsPreloading(false);
        onError?.();
      }
    };

    preloadBackground();
  }, [onLoad, onError]);

  if (isPreloading) {
    return (
      <div 
        className={`master-plan-background-loading ${className}`}
        style={{
          width: '100%',
          height: '100vh',
          backgroundColor: '#f3eae4',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...style,
        }}
      >
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading Master Plan...</p>
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div 
        className={`master-plan-background-error ${className}`}
        style={{
          width: '100%',
          height: '100vh',
          backgroundColor: '#f3eae4',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...style,
        }}
      >
        <div className="error-message">
          <p>Failed to load master plan background</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`master-plan-background-container ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        ...style,
      }}
    >
      <img
        src={backgroundSrc}
        alt="Master Plan Background"
        className="master-plan-background"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          zIndex: 0,
        }}
        onLoad={() => {
          setIsLoaded(true);
          onLoad?.();
        }}
        onError={() => {
          setHasError(true);
          onError?.();
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
};

export default MasterPlanBackground; 