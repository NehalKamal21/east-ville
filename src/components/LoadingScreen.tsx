// src/components/LoadingScreen.tsx
import React from "react";

const LoadingScreen: React.FC = () => {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        animation: "fadeIn 0.3s ease-in",
        flexDirection: "column",
      }}
    >
      <img
        src="/ajna-logo.jpg"
        alt="Ajna"
        style={{
          width: "150px",
          height: "150px",
          objectFit: "contain",
          animation: "pulse 2s infinite ease-in-out",
        }}
      />
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.1); opacity: 1; }
            100% { transform: scale(1); opacity: 0.8; }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingScreen;
