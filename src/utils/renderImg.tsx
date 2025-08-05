import { JSX } from "react";

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
        src="/icons/360-degrees-icon.png" 
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
  
// Floor plan hotspot configuration - based on actual room data
const floorPlanHotspots: Record<string, Array<{ x: number; y: number; room: string; target: string }>> = {
  // Cluster A - Ground Floor (4 rooms)
  "AGroundFloor": [
    { x: 45, y: 38, room: "Reception / Dining", target: "location1" },
    { x: 59, y: 73, room: "Kitchen", target: "location2" },
    { x: 33, y: 75, room: "Lobby", target: "location3" },
    { x: 47, y: 84, room: "Toilet", target: "location4" }
  ],
  // Cluster A - First Floor (5 rooms)
  "AFirstFloor": [
    { x: 48, y: 23, room: "Master Bedroom 3", target: "location2" },
    { x: 38, y: 42, room: "Dressing", target: "location3" },
    { x: 38, y: 55, room: "M. Bathroom 3", target: "location4" },
    { x: 56, y: 80, room: "Master Bedroom 4", target: "location5" },
    { x: 31, y: 78, room: "M. Bathroom 4", target: "location6" }
  ],
  // Cluster A - Second Floor (5 rooms)
  "ASecondFloor": [
    { x: 45, y: 20, room: "Master Bedroom 1", target: "location1" },
    { x: 36, y: 35, room: "M. Bathroom 1", target: "location2" },
    { x: 44, y: 50, room: "Living Room", target: "location3" },
    { x: 58, y: 80, room: "Master Bedroom 2", target: "location4" },
    { x: 32, y: 80, room: "M. Bathroom 2", target: "location5" }
  ],
  // Cluster A - Roof (2 rooms)
  "ARoof": [
    { x: 36, y: 53, room: "Maids Room", target: "location1" },
    { x: 36, y: 42, room: "Maids Toilet", target: "location2" }
  ],
  // Cluster B - Ground Floor (4 rooms)
  "BGroundFloor": [
    { x: 48, y: 36, room: "Reception / Dining", target: "location1" },
    { x: 55, y: 82, room: "Kitchen", target: "location2" },
    { x: 47, y: 65, room: "Bar Area", target: "location3" },
    { x: 65, y: 65, room: "Toilet", target: "location4" }
  ],
  // Cluster B - First Floor (5 rooms)
  "BFirstFloor": [
    { x: 45, y: 22, room: "Master Bedroom 1", target: "location2" },
    { x: 38, y: 42, room: "Dressing", target: "location3" },
    { x: 38, y: 58, room: "M. Bathroom 1", target: "location3" },
    { x: 55, y: 80, room: "Master Bedroom 2", target: "location4" },
    { x: 36, y: 76, room: "M. Bathroom 2", target: "location5" }
  ],
  // Cluster B - Second Floor (6 rooms)
  "BSecondFloor": [
    { x: 45, y: 22, room: "Master Bedroom", target: "location1" },
    { x: 37, y: 42, room: "Dressing", target: "location2" },
    { x: 37, y: 57, room: "M. Bathroom", target: "location3" },
    { x: 55, y: 88, room: "Living Room", target: "location4" },
    { x: 37, y: 76, room: "Bathroom", target: "location5" },
    { x: 54, y: 50, room: "Kitchenette", target: "location6" }
  ],
  // Cluster B - Roof (2 rooms)
  "BRoof": [
    { x: 38, y: 62, room: "Maids Room", target: "location1" },
    { x: 38, y: 49, room: "Maids Toilet", target: "location2" }
  ],
  // Cluster TW - Ground Floor (3 rooms - Lobby has no target)
  "TWGroundFloor": [
    { x: 50, y: 36, room: "Reception / Dining", target: "location1" },
    { x: 60, y: 72, room: "Kitchen", target: "location2" },
    { x: 44, y: 80, room: "Toilet", target: "location4" }
  ],
  // Cluster TW - First Floor (6 rooms)
  "TWFirstFloor": [
    { x: 40, y: 25, room: "Master Bedroom 1", target: "location1" },
    { x: 70, y: 25, room: "M. Bathroom 1", target: "location2" },
    { x: 32, y: 52, room: "Master Bedroom 2", target: "location3" },
    { x: 27, y: 64, room: "M. Bathroom 2", target: "location4" },
    { x: 52, y: 84, room: "Master Bedroom 3", target: "location5" },
    { x: 27, y: 80, room: "M. Bathroom 3", target: "location6" }
  ],
  // Cluster TW - Second Floor (6 rooms)
  "TWSecondFloor": [
    { x: 36, y: 27, room: "Master Bedroom 4", target: "location1" },
    { x: 74, y: 26, room: "M. Bathroom 4", target: "location2" },
    { x: 60, y: 26, room: "Dressing", target: "location3" },
    { x: 43, y: 57, room: "Living Room", target: "location4" },
    { x: 50, y: 82, room: "Master Bedroom 5", target: "location5" },
    { x: 28, y: 80, room: "M. Bathroom 5", target: "location6" }
  ],
  // Cluster TW - Roof (2 rooms)
  "TWRoof": [
    { x: 40, y: 56, room: "Maids Room", target: "location1" },
    { x: 40, y: 44, room: "Maids Toilet", target: "location2" }
  ]
};

// Floor plan hotspot component
const FloorPlanWithHotspots: React.FC<{
  imageSrc: string;
  hotspots: Array<{ x: number; y: number; room: string; target: string }>;
  onLocationChange?: (location: string) => void;
}> = ({ imageSrc, hotspots, onLocationChange }) => {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <img 
        src={imageSrc} 
        alt="Floor Plan" 
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'contain' 
        }} 
      />
      {hotspots.map((hotspot, index) => (
        <div
          key={`hotspot-${index}`}
          style={{
            position: 'absolute',
            left: `${hotspot.x}%`,
            top: `${hotspot.y}%`,
            transform: 'translate(-50%, -50%)',
            width: 'clamp(20px, 4vw, 30px)', // Responsive size
            height: 'clamp(20px, 4vw, 30px)', // Responsive size
            cursor: 'pointer',
            zIndex: 10,
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
            minWidth: '20px', // Ensure minimum size
            minHeight: '20px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)';
          }}
          onClick={() => onLocationChange?.(hotspot.target)}
          title={hotspot.room}
        >
          <img 
            src="/icons/360-degrees-icon.png" 
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
      ))}
    </div>
  );
};

export const renderImgs = (clusterId: string, selectedFloor: { value: string, key: string }, onLocationChange?: (location: string) => void) => {
  const prefix = clusterId?.startsWith("A")
    ? "A"
    : clusterId?.startsWith("B")
      ? "B"
      : clusterId?.startsWith("T")
        ? "TW"
        : "";
  
  const floorKey = `${prefix}${capitalize(selectedFloor.key)}`;
  const hotspots = floorPlanHotspots[floorKey] || [];
  
  const map: Record<string, JSX.Element> = {
    AGroundFloor: <FloorPlanWithHotspots imageSrc="/floor-plan/clusterA/groundFloor.jpg" hotspots={hotspots} onLocationChange={onLocationChange} />,
    AFirstFloor: <FloorPlanWithHotspots imageSrc="/floor-plan/clusterA/firstFloor.jpg" hotspots={hotspots} onLocationChange={onLocationChange} />,
    ASecondFloor: <FloorPlanWithHotspots imageSrc="/floor-plan/clusterA/secondFloor.jpg" hotspots={hotspots} onLocationChange={onLocationChange} />,
    ARoof: <FloorPlanWithHotspots imageSrc="/floor-plan/clusterA/Roof.jpg" hotspots={hotspots} onLocationChange={onLocationChange} />,
    BGroundFloor: <FloorPlanWithHotspots imageSrc="/floor-plan/clusterB/groundFloor.jpg" hotspots={hotspots} onLocationChange={onLocationChange} />,
    BFirstFloor: <FloorPlanWithHotspots imageSrc="/floor-plan/clusterB/firstFloor.jpg" hotspots={hotspots} onLocationChange={onLocationChange} />,
    BSecondFloor: <FloorPlanWithHotspots imageSrc="/floor-plan/clusterB/secondFloor.jpg" hotspots={hotspots} onLocationChange={onLocationChange} />,
    BRoof: <FloorPlanWithHotspots imageSrc="/floor-plan/clusterB/Roof.jpg" hotspots={hotspots} onLocationChange={onLocationChange} />,
    TWGroundFloor: <FloorPlanWithHotspots imageSrc="/floor-plan/clusterTW/groundFloor.jpg" hotspots={hotspots} onLocationChange={onLocationChange} />,
    TWFirstFloor: <FloorPlanWithHotspots imageSrc="/floor-plan/clusterTW/firstFloor.jpg" hotspots={hotspots} onLocationChange={onLocationChange} />,
    TWSecondFloor: <FloorPlanWithHotspots imageSrc="/floor-plan/clusterTW/secondFloor.jpg" hotspots={hotspots} onLocationChange={onLocationChange} />,
    TWRoof: <FloorPlanWithHotspots imageSrc="/floor-plan/clusterTW/Roof.jpg" hotspots={hotspots} onLocationChange={onLocationChange} />,
  };

  return map[floorKey] || null;
};
  