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

const PanoramaViewer: React.FC = () => {
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
  const [isFromMasterPlan, setIsFromMasterPlan] = useState(false);
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

  // Check for custom panorama configuration from 360 icons
  useEffect(() => {
    const storedConfig = localStorage.getItem('panoramaConfig');
    if (storedConfig) {
      try {
        const config = JSON.parse(storedConfig);
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

  // Get the specific panorama image based on configuration
  const getPanoramaImage = useMemo(() => {
    if (customPanoramaConfig) {
      // Use the 360 icon ID to get the corresponding image from public/360Ext
      const iconId = customPanoramaConfig.iconId; // e.g., "360-A", "360-B", etc.
      if (iconId) {
        // Extract the letter from the icon ID (e.g., "A" from "360-A")
        const letter = iconId.split('-')[1];
        if (letter) {
          return `/360Ext/${letter}.jpg`;
        }
      }

      // Fallback to the old method if no icon ID
      const clusterKey = `Cluster${customPanoramaConfig.clusterId}` as keyof typeof panoramaData;
      const floorKey = customPanoramaConfig.floorId;
      const locationKey = customPanoramaConfig.location;

      const clusterData = panoramaData[clusterKey] as any;
      const floorData = clusterData?.[floorKey] as any;
      return floorData?.[locationKey]?.imgName || null;
    }
    return null;
  }, [customPanoramaConfig]);

  // Get the current panorama image source
  const getCurrentPanoramaImage = useMemo(() => {
    // If we have a custom panorama config (from 360 icons), use that
    if (getPanoramaImage) {
      console.log('Using custom panorama image:', getPanoramaImage);
      return getPanoramaImage;
    }
    
    // Otherwise, get the image from the selected panorama data
    if (selectedPanorama && currentLocation) {
      const locationData = selectedPanorama[currentLocation];
      if (locationData?.imgName) {
        console.log('Using panorama data image:', locationData.imgName, 'for location:', currentLocation);
        return locationData.imgName;
      }
    }
    
    console.warn('No panorama image found for location:', currentLocation);
    console.log('Selected panorama data:', selectedPanorama);
    console.log('Current location:', currentLocation);
    // Fallback
    return '';
  }, [getPanoramaImage, selectedPanorama, currentLocation]);

  const handleHotspotClick = useCallback((targetLocation: string) => {
    console.log('Navigating to:', targetLocation);
    
    // Validate that the target location exists
    if (!selectedPanorama || !selectedPanorama[targetLocation]) {
      console.error('Target location not found:', targetLocation);
      return;
    }
    
    // Additional validation using the utility function
    if (!isValidNavigationTarget(panoramaData, clusterName || '', selectedFloor.key, targetLocation)) {
      console.error('Invalid navigation target:', targetLocation);
      return;
    }
    
    setLoading(true);
    // Hide floor plan when changing location
    setShowFloorPlan(false);
    
    // Destroy current viewer if it exists
    if (viewerRef.current) {
      try {
        viewerRef.current.destroy();
        viewerRef.current = null;
      } catch (error) {
        console.warn('Error destroying viewer:', error);
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
  }, [selectedPanorama, panoramaData, clusterName, selectedFloor.key]);

  const onReady = useCallback((viewer: any) => {
    console.log('Panorama viewer ready, current location:', currentLocation, 'image:', getCurrentPanoramaImage);
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
            console.log('Preloading image:', targetData.imgName);
            const preloadImg = new Image();
            preloadImg.onload = () => console.log('Preloaded:', targetData.imgName);
            preloadImg.onerror = () => console.error('Failed to preload:', targetData.imgName);
            preloadImg.src = targetData.imgName;
          }
        });
      }
    }
  }, [currentLocation, selectedPanorama]);

  useEffect(() => {
    // Get rooms for current floor from villaDetails
    if (clusterPrefix && selectedFloor) {
      const cluster = villaDetails[clusterPrefix as keyof typeof villaDetails];
      if (cluster) {
        const floorData = cluster[selectedFloor.key as keyof typeof cluster];
        if (floorData) {
          setRooms(floorData.map(room => ({ ...room, dimensions: room.dimensions || "N/A" })));
        } else {
          setRooms([]);
        }
      } else {
        setRooms([]);
      }
    } else {
      setRooms([]);
    }
    setFloorSvg(renderImgs(clusterId || "", selectedFloor, handleHotspotClick));
  }, [clusterId, selectedFloor, clusterPrefix]);

  useEffect(() => {
    // Set isFromMasterPlan based on the current route
    if (location.pathname === "/exterior") {
      setIsFromMasterPlan(true);
    } else {
      setIsFromMasterPlan(false);
    }
  }, [location.pathname]);

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
      {!isFromMasterPlan && <div style={{ position: "fixed", top: "80px", left: "20px", zIndex: 999 }}>
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
      }
      {loading && (
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex align-items-center justify-content-center z-3">
          <LoadingScreen />
        </div>
      )}

      <div
        style={{
          opacity: loading ? 0 : 1,
          transition: "opacity 0.6s ease-in-out",
        }}
      >
        {getCurrentPanoramaImage && !loading ? (
          <>
            {/* Debug info */}
            {process.env.NODE_ENV === 'development' && (
              <div
                className="position-absolute top-0 end-0 p-2"
                style={{ background: "rgba(0,0,0,0.8)", zIndex: 1000, color: "white", fontSize: "10px" }}
              >
                <div>Key: {`${currentLocation}-${getCurrentPanoramaImage}-${viewerKey}`}</div>
                <div>Image: {getCurrentPanoramaImage}</div>
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

        {/* Only show room buttons if not coming from master plan */}
        {!isFromMasterPlan && (
          <div
            className="position-absolute start-0 w-100 p-3 d-flex justify-content-center gap-2"
            style={{ background: "rgba(0,0,0,0.5)", zIndex: 10, bottom: '40px' }}
          >
            {rooms.map((room: any, index: number) => (
              <button
                key={room.id || `room-${index}`}
                className="btn btn-light btn-sm"
                onClick={() => {
                  console.log('Room button clicked:', room.name, 'target:', room.target);
                  handleHotspotClick(room.target);
                }}
              >
                {room.name}
              </button>
            ))}
          </div>
        )}
      </div>
      {!isFromMasterPlan && (
        <button
          className="position-absolute end-0 m-3"
          style={{
            backgroundColor: "#000",
            padding: "8px",
            borderRadius: "8px",
            cursor: "pointer",
            zIndex: 20,
            bottom: '80px',
          }}
          onClick={toggleFloorPlan}
        >
          <img
            src="/floorPlan.png"
            alt="Floor Plan Icon"
            style={{ width: 40, height: 40, objectFit: "contain" }}
          />
        </button>
      )}
      {showFloorPlan && (
        <div
          className="position-fixed bg-white shadow"
          style={{
            zIndex: 30,
            width: "300px",
            maxHeight: "400px",
            overflow: "auto",
            bottom: '115px',
            right: '80px'
          }}
        >
          {floorSVG}
        </div>
      )}
    </div>
  );
};

export default PanoramaViewer;
