// src/components/LoadingScreen.tsx
import React from "react";

const LoadingScreen: React.FC = React.memo(() => {
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
    </div>
  );
});

LoadingScreen.displayName = 'LoadingScreen';

export default LoadingScreen;
