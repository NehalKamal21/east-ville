import { JSX } from "react";

import AGroundFloor from "../SVGs/ClusterA/AGroundFloor";
import AFirstFloor from "../SVGs/ClusterA/AFirstFloor";
import ASecondFloor from "../SVGs/ClusterA/ASecondFloor";
import ARoof from "../SVGs/ClusterA/ARoof";

import BGroundFloor from "../SVGs/ClusterB/BGroundFloor";
import BFirstFloor from "../SVGs/ClusterB/BFirstFloor";
import BSecondFloor from "../SVGs/ClusterB/BSecondFloor";
import BRoof from "../SVGs/ClusterB/BRoof";

// import TWGroundFloor from "../SVGs/ClusterTW/TWGroundFloor";
import TWFirstFloor from "../SVGs/ClusterTW/TWFirstFloor";
import TWSecondFloor from "../SVGs/ClusterTW/TWSecondFloor";
import TWRoof from "../SVGs/ClusterTW/TWRoof";

export const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

// Interface for panorama icon configuration
interface PanoramaIconConfig {
  top?: string;
  bottom?: string;
  left: string;
  location: string;
  title?: string;
}

// Reusable PanoramaIcon component
const PanoramaIcon: React.FC<{
  config: PanoramaIconConfig;
  clusterId: string;
  floorId: string;
  onLocationChange?: (location: string) => void;
}> = ({ config, clusterId, floorId, onLocationChange }) => {
  const handleClick = () => {
    if (onLocationChange) {
      // If we're in panorama view, just change the location
      onLocationChange(config.location);
    } else {
      // If we're not in panorama view, set the panorama config for when user navigates
      const panoramaConfig = {
        clusterId,
        floorId,
        location: config.location
      };
      localStorage.setItem('panoramaConfig', JSON.stringify(panoramaConfig));
    }
  };

  return (
    <div 
      className="panorama-icon"
      style={{
        position: 'absolute',
        top: config.top,
        bottom: config.bottom,
        left: config.left,
        transform: 'translateX(-50%)',
        zIndex: 10,
        width: '25px',
        height: '25px',
        cursor: 'pointer',
        transition: 'all 0.3s ease-in-out',
        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateX(-50%) scale(1.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateX(-50%) scale(1)';
      }}
      onClick={handleClick}
      title={config.title || "View 360° Panorama"}
    >
      <img 
        src="/icons/button.png" 
        alt="360° View" 
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '2px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
        }}
      />
    </div>
  );
};

// Configuration for panorama icons by cluster and floor
const panoramaIconConfigs: Record<string, PanoramaIconConfig[]> = {
  "TWGroundFloor": [
    { top: '75px', left: '50%', location: 'location1' },
    { bottom: '60px', left: '60%', location: 'location2' },
    { bottom: '26px', left: '46%', location: 'location4' },
    // { bottom: '60px', left: '35%', location: 'location3' }
  ],
  // Add configurations for other clusters/floors as needed
  "AGroundFloor": [
    { top: '50px', left: '30%', location: 'location1' },
    { top: '50px', left: '70%', location: 'location2' }
  ],
  "BGroundFloor": [
    { top: '60px', left: '40%', location: 'location1' },
    { bottom: '40px', left: '60%', location: 'location2' }
  ]
};

// Helper function to render panorama icons for a specific cluster and floor
const renderPanoramaIcons = (clusterId: string, floorKey: string, onLocationChange?: (location: string) => void): JSX.Element[] => {
  const configKey = `${clusterId}${capitalize(floorKey)}`;
  const configs = panoramaIconConfigs[configKey] || [];
  
  return configs.map((config, index) => (
    <PanoramaIcon
      key={`panorama-icon-${index}`}
      config={config}
      clusterId={clusterId}
      floorId={floorKey}
      onLocationChange={onLocationChange}
    />
  ));
};
  
export const renderImgs = (clusterId: string, selectedFloor: { value: string, key: string }, onLocationChange?: (location: string) => void) => {
  const map: Record<string, JSX.Element> = {
    AGroundFloor: <AGroundFloor />,
    AFirstFloor: <AFirstFloor />,
    ASecondFloor: <ASecondFloor />,
    ARoof: <ARoof />,
    BGroundFloor: <BGroundFloor />,
    BFirstFloor: <BFirstFloor />,
    BSecondFloor: <BSecondFloor />,
    BRoof: <BRoof />,
    TWGroundFloor: <div style={{ 
      position: 'relative',
      width: '100%', 
      height: '100%',
      minHeight: '300px'
    }}>
      <div style={{ 
        backgroundImage: 'url(/floor-plan/twinhouse_ground.jpg)', 
        backgroundSize: 'contain', 
        backgroundRepeat: 'no-repeat', 
        backgroundPosition: 'center',
        width: '100%', 
        height: '100%',
        minHeight: '300px'
      }} />
      {renderPanoramaIcons('TW', 'groundFloor', onLocationChange)}
    </div>,
    TWFirstFloor: <TWFirstFloor />,
    TWSecondFloor: <TWSecondFloor />,
    TWRoof: <TWRoof />,
  };

  const prefix = clusterId?.startsWith("A")
    ? "A"
    : clusterId?.startsWith("B")
      ? "B"
      : clusterId?.startsWith("T")
        ? "TW"
        : "";
  return map[`${prefix}${capitalize(selectedFloor.key)}`] || null;
};
  