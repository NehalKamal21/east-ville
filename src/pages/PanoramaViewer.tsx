import React, { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { Spinner, ToggleButton, ToggleButtonGroup, Card } from "react-bootstrap";
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";
import { MarkersPlugin } from "@photo-sphere-viewer/markers-plugin";
import "@photo-sphere-viewer/core/index.css";
import "@photo-sphere-viewer/markers-plugin/index.css";

import { renderImgs } from "../utils/renderImg";
import { useParams, useNavigate, useLocation } from "react-router-dom";

interface Hotspot {
  pitch: number;
  yaw: number;
  target: string;
}

import { panoramaData } from "../utils/panoData";
import { villaDetails } from "../utils/villaDetails";
import LoadingScreen from "../components/LoadingScreen";
import { validateAndFixPanoramaData, isValidNavigationTarget } from "../utils/panoramaValidation";
import { testPanoramaData } from "../utils/testPanoramaData";
import { testPanoramaImages } from "../utils/debugPanorama";
import { useImagePreloader } from "../utils/useImagePreloader";

// Component for 360 icon panoramas (from master plan)
const IconPanoramaViewer: React.FC<{ iconId: string }> = ({ iconId }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  // Extract the letter from the icon ID (e.g., "A" from "360-A")
  const letter = iconId.split('-')[1];
  const imagePath = `/360Ext/${letter}.jpg`;
  
  console.log('🎯 Icon panorama viewer:', { iconId, letter, imagePath });
  
  const { isPreloaded } = useImagePreloader(imagePath);
  
  if (hasError) {
    return (
      <div className="d-flex align-items-center justify-content-center h-100 bg-dark text-white">
        <div className="text-center">
          <h4>Failed to load 360 panorama</h4>
          <p>Icon: {iconId}</p>
        </div>
      </div>
    );
  }
  
  if (!isPreloaded) {
    return (
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex align-items-center justify-content-center z-3">
        <div className="text-center text-white">
          <div className="spinner-border mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div>Loading 360 panorama...</div>
        </div>
      </div>
    );
  }
  
      return (
      <ReactPhotoSphereViewer
        src={imagePath}
        height="100vh"
        width="100%"
        plugins={[[MarkersPlugin, {}]]}
        onReady={() => setIsLoaded(true)}
        defaultYaw={0}
        defaultPitch={0}
        defaultZoomLvl={1}
      />
    );
};

// Component for cluster panoramas (from SVG)
const ClusterPanoramaViewer: React.FC = () => {
  const { clusterId, FloorId } = useParams<{ clusterId: string; FloorId: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const Floors = [
    { value: "GF", key: "groundFloor" },
    { value: "1F", key: "firstFloor" },
    { value: "2F", key: "secondFloor" },
    { value: "RF", key: "Roof" },
  ];

  const defaultSelected = useMemo(() =>
    Floors.find((f) => f.key === FloorId) || Floors[0],
    [FloorId]
  );

  const [currentLocation, setCurrentLocation] = useState("location1");
  const [loading, setLoading] = useState(false);
  const [rooms, setRooms] = useState<{ name: string; dimensions: string }[]>([]);
  const [showFloorPlan, setShowFloorPlan] = useState(false);
  const [floorSVG, setFloorSvg] = useState<React.ReactNode>(null);
  const [selectedPanorama, setSelectedPanorama] = useState<any>(null);
  const [customPanoramaConfig, setCustomPanoramaConfig] = useState<any>(null);
  const [selectedFloor, setSelectedFloor] = useState(defaultSelected);
  const [viewerKey, setViewerKey] = useState(0);

  const viewerRef = useRef<any>(null);

  // Memoize cluster name calculation
  const clusterName = useMemo(() => {
    if (clusterId?.includes("A")) return "ClusterA";
    if (clusterId?.includes("B")) return "ClusterB";
    if (clusterId?.includes("T")) return "ClusterTW";
    return null;
  }, [clusterId]);

  // Memoize cluster prefix for villa details
  const clusterPrefix = useMemo(() => {
    if (clusterId?.startsWith("A")) return "A";
    if (clusterId?.startsWith("B")) return "B";
    if (clusterId?.startsWith("T")) return "TW";
    return "";
  }, [clusterId]);

  // Check for custom panorama configuration from SVG clicks
  useEffect(() => {
    const storedConfig = localStorage.getItem('panoramaConfig');
    if (storedConfig) {
      try {
        const config = JSON.parse(storedConfig);
        console.log('📋 Loading panorama config from localStorage:', config);
        console.log('🔍 Setting current location to:', config.location || 'location1');
        setCustomPanoramaConfig(config);
        setCurrentLocation(config.location || 'location1');
        // Clear immediately after reading to minimize storage impact
        localStorage.removeItem('panoramaConfig');
      } catch (error) {
        console.error('Error parsing panorama config:', error);
        // Clear invalid data
        localStorage.removeItem('panoramaConfig');
      }
    }
  }, []);

  // Memoize panorama data with validation
  const panoramaDataForCluster = useMemo(() => {
    if (!clusterName) return {};
    const floorKey = selectedFloor.key as keyof typeof panoramaData[typeof clusterName];
    const rawData = panoramaData[clusterName]?.[floorKey] || {};
    
    // Validate and fix the panorama data
    const validatedData = validateAndFixPanoramaData({
      [clusterName]: {
        [floorKey]: rawData
      }
    });

    return validatedData[clusterName]?.[floorKey] || {};
  }, [clusterName, selectedFloor.key]);

  // Debug panorama data loading
  useEffect(() => {
    console.log('🔍 Cluster panorama data debug:', {
      clusterName,
      selectedFloor: selectedFloor?.key,
      panoramaDataForCluster: Object.keys(panoramaDataForCluster),
      currentLocation,
      customPanoramaConfig
    });
  }, [clusterName, selectedFloor, panoramaDataForCluster, currentLocation, customPanoramaConfig]);

  // Get the current panorama image source
  const getCurrentPanoramaImage = useMemo(() => {
    console.log('🖼️ Getting cluster panorama image...');
    console.log('📍 Current location:', currentLocation);
    console.log('📊 Selected panorama data keys:', selectedPanorama ? Object.keys(selectedPanorama) : []);
    console.log('🔍 Custom panorama config:', customPanoramaConfig);
    
    // Always use current location for image resolution (ignore custom config for image path)
    if (selectedPanorama && currentLocation) {
      const locationData = selectedPanorama[currentLocation];
      console.log('🔍 Looking up location data for:', currentLocation);
      console.log('📍 Location data found:', locationData);
      
      if (locationData?.imgName) {
        console.log('✅ Using panorama data image:', locationData.imgName, 'for location:', currentLocation);
        return locationData.imgName;
      } else {
        console.warn('⚠️ No image data found for location:', currentLocation);
        console.log('📍 Location data:', locationData);
      }
    }
    
    console.warn('❌ No panorama image found for location:', currentLocation);
    console.log('📊 Selected panorama data:', selectedPanorama);
    console.log('📍 Current location:', currentLocation);
    console.log('🔍 Available locations:', selectedPanorama ? Object.keys(selectedPanorama) : []);
    return '';
  }, [selectedPanorama, currentLocation]);

  // Use the custom image preloader hook
  const { isPreloaded, isPreloading, error } = useImagePreloader(getCurrentPanoramaImage);
  
  // Fallback: if preloading fails, still show the panorama
  const shouldShowPanorama = getCurrentPanoramaImage && (!loading && (isPreloaded || error));

  // Preload image function
  const preloadImage = useCallback((imageSrc: string) => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject(new Error(`Failed to load image: ${imageSrc}`));
      img.src = imageSrc;
    });
  }, []);

  const handleHotspotClick = useCallback(async (targetLocation: string) => {
    console.log('🚀 Navigating to:', targetLocation);
    
    // Validate that the target location exists in the current panorama data
    if (!selectedPanorama || !selectedPanorama[targetLocation as keyof typeof selectedPanorama]) {
      console.error('❌ Target location not found in panorama data:', targetLocation);
      console.log('📍 Available locations:', selectedPanorama ? Object.keys(selectedPanorama) : []);
      return;
    }
    
    console.log('✅ Target location validated, proceeding with navigation...');
    
    setLoading(true);
    // Hide floor plan when changing location
    setShowFloorPlan(false);
    
    // Destroy current viewer if it exists
    if (viewerRef.current) {
      try {
        viewerRef.current.destroy();
        viewerRef.current = null;
      } catch (error) {
        console.warn('⚠️ Error destroying viewer:', error);
      }
    }
    
    // Update current location
    setCurrentLocation(targetLocation);
    
    // Force a re-render by incrementing the viewer key
    setViewerKey(prev => prev + 1);
    
    // Force a re-render of the panorama viewer
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, [selectedPanorama]);

  // Enhanced room navigation that validates targets against panorama data
  const handleRoomNavigation = useCallback((targetLocation: string) => {
    console.log('🔍 Room navigation requested to:', targetLocation);
    console.log('📊 Current panorama data keys:', selectedPanorama ? Object.keys(selectedPanorama) : []);
    console.log('📍 Current location before navigation:', currentLocation);
    
    // Check if the target exists in the current panorama data
    if (selectedPanorama && targetLocation && selectedPanorama[targetLocation as keyof typeof selectedPanorama]) {
      console.log('✅ Target location found in panorama data, navigating...');
      console.log('🔍 Target location data:', selectedPanorama[targetLocation as keyof typeof selectedPanorama]);
      handleHotspotClick(targetLocation);
    } else {
      console.warn('❌ Target location not found in panorama data:', targetLocation);
      console.log('📍 Available locations:', selectedPanorama ? Object.keys(selectedPanorama) : []);
      
      // Try to find a fallback location
      const availableLocations = selectedPanorama ? Object.keys(selectedPanorama) : [];
      if (availableLocations.length > 0) {
        const fallbackLocation = availableLocations[0];
        console.log('🔄 Using fallback location:', fallbackLocation);
        handleHotspotClick(fallbackLocation);
      } else {
        console.error('🚨 No available panorama locations found!');
      }
    }
  }, [selectedPanorama, handleHotspotClick, currentLocation]);

  const onReady = useCallback((viewer: any) => {
    console.log('🎯 Panorama viewer ready!');
    console.log('📍 Current location:', currentLocation);
    console.log('🖼️ Image path:', getCurrentPanoramaImage);
    console.log('📊 Selected panorama data keys:', selectedPanorama ? Object.keys(selectedPanorama) : []);
    console.log('🔍 Custom config:', customPanoramaConfig);
    viewerRef.current = viewer;
    const markersPlugin = viewer.getPlugin(MarkersPlugin);

    const hotspots = selectedPanorama[currentLocation]?.hotspots ?? [];
    console.log('Available hotspots:', hotspots);

    const markers = hotspots
      .filter(
        (h: Hotspot) =>
          typeof h.pitch === "number" &&
          !isNaN(h.pitch) &&
          typeof h.yaw === "number" &&
          !isNaN(h.yaw)
      )
      .map((hotspot: Hotspot, index: number) => ({
        id: `marker-${index}`,
        position: { yaw: '45deg', pitch: '0deg' },
        longitude: hotspot.yaw * (Math.PI / 180),
        latitude: hotspot.pitch * (Math.PI / 180),
        image: "/arrow-down-marker.png",
        width: 32,
        height: 32,
        anchor: "bottom center",
        tooltip: `Go to ${hotspot.target}`,
        data: { target: hotspot.target },
        size: { width: 32, height: 32 },
      }));

    console.log('Setting markers:', markers);
    markersPlugin.setMarkers(markers);

    // Remove existing event listeners to prevent duplicates
    markersPlugin.removeEventListener("select-marker");
    
    markersPlugin.addEventListener("select-marker", (e: any) => {
      const target = e.marker?.data?.target;
      console.log('Marker clicked, target:', target);
      if (target) handleHotspotClick(target);
    });
  }, [selectedPanorama, currentLocation, handleHotspotClick, getCurrentPanoramaImage]);

  useEffect(() => {
    console.log('Setting selected panorama data:', panoramaDataForCluster);
    console.log('Available locations:', Object.keys(panoramaDataForCluster));
    setSelectedPanorama(panoramaDataForCluster);
    // Force a re-render when panorama data changes
    setViewerKey(prev => prev + 1);
  }, [panoramaDataForCluster]);

  // Debug current location changes
  useEffect(() => {
    console.log('Current location changed to:', currentLocation);
    console.log('Available locations:', selectedPanorama ? Object.keys(selectedPanorama) : []);
  }, [currentLocation, selectedPanorama]);

  // Debug viewer key changes
  useEffect(() => {
    console.log('Viewer key changed to:', viewerKey);
  }, [viewerKey]);

  // Run panorama data test on component mount
  useEffect(() => {
    testPanoramaData();
    testPanoramaImages();
  }, []);

  // Cleanup viewer when component unmounts or image source changes
  useEffect(() => {
    return () => {
      if (viewerRef.current) {
        try {
          viewerRef.current.destroy();
        } catch (error) {
          console.warn('Error destroying viewer:', error);
        }
        viewerRef.current = null;
      }
    };
  }, [getCurrentPanoramaImage]);

  // Preload adjacent panorama images for smoother navigation
  useEffect(() => {
    if (selectedPanorama && currentLocation) {
      const currentLocationData = selectedPanorama[currentLocation];
      if (currentLocationData?.hotspots) {
        // Preload all adjacent locations
        const adjacentLocations = currentLocationData.hotspots.map((h: Hotspot) => h.target);
        console.log('Preloading adjacent locations:', adjacentLocations);
        
        adjacentLocations.forEach((target: string) => {
          const targetData = selectedPanorama[target];
          if (targetData?.imgName) {
            console.log('Preloading adjacent image:', targetData.imgName);
            preloadImage(targetData.imgName)
              .then(() => console.log('✅ Preloaded adjacent image:', targetData.imgName))
              .catch(() => console.warn('⚠️ Failed to preload adjacent image:', targetData.imgName));
          }
        });
      }
    }
  }, [currentLocation, selectedPanorama, preloadImage]);

  useEffect(() => {
    // Create comprehensive room list that includes all panorama locations
    if (clusterPrefix && selectedFloor && selectedPanorama) {
      const cluster = villaDetails[clusterPrefix as keyof typeof villaDetails];
      const panoramaLocations = Object.keys(selectedPanorama);
      
      console.log('🏗️ Creating comprehensive room list...');
      console.log('📍 Panorama locations:', panoramaLocations);
      
      if (cluster) {
        const floorData = cluster[selectedFloor.key as keyof typeof cluster];
        if (floorData) {
          // Get rooms from villa details that have valid panorama targets
          const validVillaRooms = floorData.filter(room => {
            const hasValidTarget = room.target && panoramaLocations.includes(room.target);
            if (!hasValidTarget) {
              console.warn(`🏠 Villa room "${room.name}" has invalid target: ${room.target}`);
            }
            return hasValidTarget;
          });
          
          // Create additional room buttons for panorama locations without villa details
          const existingTargets = validVillaRooms.map(room => room.target);
          const missingLocations = panoramaLocations.filter(location => !existingTargets.includes(location));
          
          const additionalRooms = missingLocations.map(location => ({
            name: `Location ${location.replace('location', '')}`,
            dimensions: "Panorama View",
            target: location,
            id: `panorama-${location}`
          }));
          
          const allRooms = [...validVillaRooms, ...additionalRooms];
          
          console.log('✅ Valid villa rooms:', validVillaRooms.map(r => ({ name: r.name, target: r.target })));
          console.log('➕ Additional panorama locations:', additionalRooms.map(r => ({ name: r.name, target: r.target })));
          console.log('📋 Total available rooms:', allRooms.length);
          console.log('🎯 Final room list:', allRooms.map(r => ({ name: r.name, target: r.target, id: (r as any).id })));
          
          setRooms(allRooms.map(room => ({ ...room, dimensions: room.dimensions || "N/A" })));
        } else {
          // Fallback: create room buttons for all panorama locations
          const fallbackRooms = panoramaLocations.map(location => ({
            name: `Location ${location.replace('location', '')}`,
            dimensions: "Panorama View",
            target: location,
            id: `fallback-${location}`
          }));
          
          console.log('🔄 Using fallback room list:', fallbackRooms.map(r => ({ name: r.name, target: r.target })));
          setRooms(fallbackRooms);
        }
      } else {
        // Fallback: create room buttons for all panorama locations
        const fallbackRooms = panoramaLocations.map(location => ({
          name: `Location ${location.replace('location', '')}`,
          dimensions: "Panorama View",
          target: location,
          id: `fallback-${location}`
        }));
        
        console.log('🔄 Using fallback room list:', fallbackRooms.map(r => ({ name: r.name, target: r.target })));
        setRooms(fallbackRooms);
      }
    } else {
      setRooms([]);
    }
    setFloorSvg(renderImgs(clusterId || "", selectedFloor, handleHotspotClick));
  }, [clusterId, selectedFloor, clusterPrefix, selectedPanorama]);

  const getRandomLocation = useCallback((): string => {
    const locations = ["location1", "location2"];
    const index = Math.floor(Math.random() * locations.length);
    return locations[index];
  }, []);

  const toggleFloorPlan = useCallback(() => {
    setShowFloorPlan(prev => !prev);
  }, []);

  const handleFloorChange = useCallback((floor: typeof Floors[0]) => {
    setSelectedFloor(floor);
    // Reset to first location when changing floors
    setCurrentLocation("location1");
    // Hide floor plan when changing floors
    setShowFloorPlan(false);
    // Force a re-render by incrementing the viewer key
    setViewerKey(prev => prev + 1);
    // Navigate to the new floor panorama
    if (clusterId) {
      navigate(`/clusterView/${clusterId}/${floor.key}/image`);
    }
  }, [clusterId, navigate]);

  return (
    <div className="w-100 vh-100 position-relative bg-black">
      {/* Floor Panel - positioned below breadcrumb */}
      <div style={{ position: "fixed", top: "80px", left: "20px", zIndex: 999 }}>
        <div className="floor-panel-container">
          <Card className="p-3 bg-dark text-white shadow-lg rounded-4">
            <Card.Title className="text-center fs-6">Floors</Card.Title>

            <ToggleButtonGroup
              type="radio"
              name="floors"
              value={selectedFloor.key}
            >
              {Floors.map((floor) => (
                <ToggleButton
                  key={floor.key}
                  id={`floor-${floor.key}`}
                  value={floor.key}
                  variant="outline-light"
                  className="text-center"
                  onClick={() => handleFloorChange(floor)}
                >
                  {floor.value}
                </ToggleButton>
              ))} 
            </ToggleButtonGroup>
          </Card>
        </div>
      </div>

      {(loading || (isPreloading && !error)) && (
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex align-items-center justify-content-center z-3">
          <div className="text-center text-white">
            <div className="spinner-border mb-3" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div>
              {isPreloading ? 'Preloading panorama image...' : 'Loading panorama viewer...'}
            </div>
          </div>
        </div>
      )}

      <div
        style={{
          opacity: loading ? 0 : 1,
          transition: "opacity 0.6s ease-in-out",
        }}
      >
        {shouldShowPanorama ? (
          <>
            {/* Debug info */}
            {process.env.NODE_ENV === 'development' && (
              <div
                className="position-absolute top-0 end-0 p-2"
                style={{ background: "rgba(0,0,0,0.8)", zIndex: 1000, color: "white", fontSize: "10px" }}
              >
                <div>Key: {`${currentLocation}-${getCurrentPanoramaImage}-${viewerKey}`}</div>
                <div>Image: {getCurrentPanoramaImage}</div>
                <div>Preloaded: {isPreloaded ? 'Yes' : 'No'}</div>
              </div>
            )}

            {/* Debug room button visibility */}
            {process.env.NODE_ENV === 'development' && (
              <div
                className="position-absolute top-0 end-0 p-2"
                style={{ background: "rgba(0,0,0,0.8)", zIndex: 1000, color: "white", fontSize: "10px" }}
              >
                <div>selectedPanorama: {selectedPanorama ? 'loaded' : 'not loaded'}</div>
                <div>panoramaKeys: {selectedPanorama ? Object.keys(selectedPanorama).length : 0}</div>
                <div>rooms: {rooms.length}</div>
                <div>pathname: {location.pathname}</div>
              </div>
            )}

            <ReactPhotoSphereViewer
              key={`${currentLocation}-${getCurrentPanoramaImage}-${viewerKey}`}
              src={getCurrentPanoramaImage}
              height="100vh"
              width="100%"
              plugins={[[MarkersPlugin, {}]]}
              onReady={onReady}
              defaultYaw={0}
              defaultPitch={0}
              defaultZoomLvl={1}
            />
          </>
        ) : (
          <div className="d-flex align-items-center justify-content-center h-100 bg-dark text-white">
            <div className="text-center">
              <h4>No panorama image available</h4>
              <p>Location: {currentLocation}</p>
              <p>Cluster: {clusterName}</p>
              <p>Floor: {selectedFloor.key}</p>
              <p>Image Path: {getCurrentPanoramaImage || 'None'}</p>
              <p>Selected Panorama: {selectedPanorama ? 'Loaded' : 'Not Loaded'}</p>
              <p>Available Locations: {selectedPanorama ? Object.keys(selectedPanorama).join(', ') : 'None'}</p>
              <p>Custom Config: {customPanoramaConfig ? JSON.stringify(customPanoramaConfig) : 'None'}</p>
              <button 
                className="btn btn-primary mt-3"
                onClick={() => {
                  console.log('🔄 Manual refresh triggered');
                  setViewerKey(prev => prev + 1);
                  setCurrentLocation('location1');
                }}
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Debug panel - only show in development */}
        {process.env.NODE_ENV === 'development' && (
          <div
            className="position-absolute top-0 start-0 p-2"
            style={{ background: "rgba(0,0,0,0.8)", zIndex: 1000, color: "white", fontSize: "12px" }}
          >
            <div>Location: {currentLocation}</div>
            <div>Image: {getCurrentPanoramaImage}</div>
            <div>Cluster: {clusterName}</div>
            <div>Floor: {selectedFloor.key}</div>
            <div>Rooms: {rooms.length}</div>
          </div>
        )}

        {/* Room navigation buttons */}
        {selectedPanorama && Object.keys(selectedPanorama).length > 0 && (
          <div
            className="position-absolute start-0 w-100 p-2 p-md-3 d-flex justify-content-center gap-1 gap-md-2 flex-wrap room-navigation-container"
            style={{ 
              background: "rgba(0,0,0,0.7)", 
              zIndex: 10, 
              bottom: '20px',
              backdropFilter: 'blur(8px)',
              borderTop: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            {rooms.map((room: any, index: number) => (
              <button
                key={room.id || `room-${index}`}
                className="btn btn-light btn-sm room-navigation-btn"
                style={{
                  fontSize: '0.75rem',
                  padding: '0.375rem 0.75rem',
                  whiteSpace: 'nowrap',
                  minWidth: 'auto',
                  maxWidth: '120px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
                onClick={() => {
                  console.log('🎯 Room button clicked:', room.name, 'target:', room.target);
                  console.log('📍 Current location before navigation:', currentLocation);
                  console.log('📍 Available panorama locations:', Object.keys(selectedPanorama));
                  console.log('🖼️ Current image before navigation:', getCurrentPanoramaImage);
                  handleRoomNavigation(room.target);
                }}
                title={room.name}
              >
                {room.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <button
        className="position-absolute end-0 m-2 m-md-3 floor-plan-btn"
        style={{
          backgroundColor: "#000",
          padding: "8px",
          borderRadius: "8px",
          cursor: "pointer",
          zIndex: 20,
          bottom: '80px',
          border: '1px solid rgba(255,255,255,0.2)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
        }}
        onClick={toggleFloorPlan}
      >
        <img
          src="/floorPlan.png"
          alt="Floor Plan Icon"
          style={{ width: 40, height: 40, objectFit: "contain" }}
        />
      </button>

      {showFloorPlan && (
        <div
          className="position-fixed bg-white shadow floor-plan-modal"
          style={{
            zIndex: 30,
            width: "300px",
            maxHeight: "400px",
            overflow: "auto",
            bottom: '115px',
            right: '80px',
            borderRadius: '8px',
            border: '1px solid rgba(0,0,0,0.1)'
          }}
        >
          {floorSVG}
        </div>
      )}
    </div>
  );
};

// Main PanoramaViewer component that decides which viewer to use
const PanoramaViewer: React.FC = () => {
  const location = useLocation();
  const { iconId } = useParams<{ iconId?: string }>();
  
  // Check if this is a 360 icon panorama (from master plan)
  const isIconPanorama = location.pathname.startsWith("/exterior") && iconId;
  
  console.log('🎯 PanoramaViewer routing:', { 
    pathname: location.pathname, 
    iconId, 
    isIconPanorama 
  });
  
  if (isIconPanorama) {
    return <IconPanoramaViewer iconId={iconId} />;
  }
  
  // Otherwise, use the cluster panorama viewer
  return <ClusterPanoramaViewer />;
};

export default PanoramaViewer;
