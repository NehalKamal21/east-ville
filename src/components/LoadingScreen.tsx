// src/components/LoadingScreen.tsx
import React from "react";

const LoadingScreen: React.FC = React.memo(() => {
  return (
    <div className="loading-screen">
      <img
        src="/ajna-logo.jpg"
        alt="Ajna"
        className="loading-logo"
      />
    </div>
  );
});

LoadingScreen.displayName = 'LoadingScreen';

export default LoadingScreen;
