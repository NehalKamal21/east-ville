import React, { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { ToggleButton, ToggleButtonGroup, Card } from "react-bootstrap";
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";
import { MarkersPlugin } from "@photo-sphere-viewer/markers-plugin";
import "@photo-sphere-viewer/core/index.css";
import "@photo-sphere-viewer/markers-plugin/index.css";

import { renderImgs } from "../utils/renderImg";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { validatePanoramaImage } from "../utils/helpers";

interface Hotspot {
  pitch: number;
  yaw: number;
  target: string;
  tooltip?: string;
}

import { panoramaData } from "../utils/panoData";
import { villaDetails } from "../utils/villaDetails";
import LoadingScreen from "../components/LoadingScreen";

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
  const [panoramaImagesLoaded, setPanoramaImagesLoaded] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);
  const [rooms, setRooms] = useState<{ name: string; dimensions: string }[]>([]);
  const [showFloorPlan, setShowFloorPlan] = useState(false);
  const [floorSVG, setFloorSvg] = useState<React.ReactNode>(null);
  const [selectedPanorama, setSelectedPanorama] = useState<any>(null);
  const [customPanoramaConfig, setCustomPanoramaConfig] = useState<any>(null);
  const [isFromMasterPlan, setIsFromMasterPlan] = useState(false);
  const [selectedFloor, setSelectedFloor] = useState(defaultSelected);

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

  // Get panorama image paths for preloading
  const panoramaImagePaths = useMemo(() => {
    if (!clusterName || !selectedFloor) return [];
    
    const clusterData = panoramaData[clusterName];
    if (!clusterData) return [];
    
    const floorData = clusterData[selectedFloor.key as keyof typeof clusterData];
    if (!floorData) return [];
    
    const imagePaths: string[] = [];
    Object.values(floorData).forEach((location: any) => {
      if (location.imgName) {
        imagePaths.push(location.imgName);
      }
    });
    
    return imagePaths;
  }, [clusterName, selectedFloor]);

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

  // Memoize panorama data
  const panoramaDataForCluster = useMemo(() => {
    if (!clusterName) return {};
    const floorKey = selectedFloor.key as keyof typeof panoramaData[typeof clusterName];
    return panoramaData[clusterName]?.[floorKey] || {};
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

  // Validate current image when it changes
  useEffect(() => {
    const currentImage = getPanoramaImage || (selectedPanorama && selectedPanorama[currentLocation]?.imgName);
    
    if (currentImage) {
      setImageError(null);
      
      // Special handling for the problematic B-51 Master Bedroom 1 image
      if (currentImage === '/panos/ClusterB/firstFloor/01.jpg') {
        console.warn('Loading potentially problematic image: B-51 Master Bedroom 1');
        
        validatePanoramaImage(currentImage).then(validation => {
          if (!validation.isValid) {
            console.error('Image validation failed for B-51 Master Bedroom 1:', validation.issues);
            setImageError(`Image validation failed: ${validation.issues.join(', ')}`);
          }
        }).catch(error => {
          console.error('Error validating B-51 Master Bedroom 1 image:', error);
          setImageError('Failed to validate image');
        });
      }
    }
  }, [getPanoramaImage, selectedPanorama, currentLocation]);

  const handleHotspotClick = useCallback((targetLocation: string) => {
    setLoading(true);
    setImageError(null); // Clear any previous errors
    // Hide floor plan when changing location
    setShowFloorPlan(false);
    setTimeout(() => {
      setCurrentLocation(targetLocation);
    }, 100);
    setTimeout(() => {
      setLoading(false);
    }, 900);
    // Fallback timeout to ensure loading state doesn't get stuck
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const onReady = useCallback((viewer: any) => {
    viewerRef.current = viewer;
    const markersPlugin = viewer.getPlugin(MarkersPlugin);

    const hotspots = selectedPanorama[currentLocation]?.hotspots ?? [];

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
        tooltip: hotspot.tooltip || `Go to ${hotspot.target}`,
        data: { target: hotspot.target },
        size: { width: 32, height: 32 },
      }));

    markersPlugin.setMarkers(markers);

    markersPlugin.addEventListener("select-marker", (e: any) => {
      const target = e.marker?.data?.target;
      if (target) handleHotspotClick(target);
    });
    
    console.log('Panorama loaded successfully:', currentLocation);
  }, [selectedPanorama, currentLocation, handleHotspotClick]);

  const handlePanoramaLoadComplete = () => {
    setPanoramaImagesLoaded(true);
  };


  useEffect(() => {
    setSelectedPanorama(panoramaDataForCluster);
  }, [panoramaDataForCluster]);

  // Preload next image
  useEffect(() => {
    const next = selectedPanorama && selectedPanorama[currentLocation]?.hotspots?.[0]?.target;
    if (next && selectedPanorama) {
      const preloadImg = new Image();
      preloadImg.src = selectedPanorama[next].imgName;
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
    // Reset panorama images loaded state
    setPanoramaImagesLoaded(false);
    // Navigate to the new floor panorama
    if (clusterId) {
      navigate(`/clusterView/${clusterId}/${floor.key}/image`);
    }
  }, [clusterId, navigate]);

  // Show error message if image failed to load
  if (imageError) {
    return (
      <div className="w-100 vh-100 position-relative bg-black d-flex align-items-center justify-content-center">
        <div className="alert alert-danger m-4" style={{ maxWidth: '500px' }}>
          <h3>❌ Image Loading Error</h3>
          <p>{imageError}</p>
          <div className="mt-3">
            <button 
              className="btn btn-primary me-2"
              onClick={() => {
                setImageError(null);
                setLoading(true);
              }}
            >
              Retry
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => navigate(-1)}
            >
              Go Back
            </button>
          </div>
          {imageError.includes('B-51 Master Bedroom 1') && (
            <div className="mt-3 p-3 bg-warning bg-opacity-10 border border-warning rounded">
              <h6>⚠️ Known Issue with B-51 Master Bedroom 1</h6>
              <p className="mb-2">This image may have format or aspect ratio issues causing black diamonds.</p>
              <a href="/specific-validator" className="btn btn-sm btn-warning">
                Check Image Details
              </a>
            </div>
          )}
        </div>
      </div>
    );
  }

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
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-60 d-flex align-items-center justify-content-center z-3">
          <LoadingScreen />
        </div>
      )}

      <div
        style={{
          opacity: loading ? 0 : 1,
          transition: "opacity 0.6s ease-in-out",
        }}
      >
        <ReactPhotoSphereViewer
          key={currentLocation}
          src={getPanoramaImage || (selectedPanorama && selectedPanorama[currentLocation]?.imgName)}
          height="100vh"
          width="100%"
          plugins={[[MarkersPlugin, {}]]}
          onReady={onReady}
          defaultYaw={0}
          defaultPitch={0}
          defaultZoomLvl={1}
        />

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
                onClick={() => handleHotspotClick(room.target)}
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
