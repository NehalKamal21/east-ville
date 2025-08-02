import React, { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";
import { MarkersPlugin } from "@photo-sphere-viewer/markers-plugin";
import "@photo-sphere-viewer/core/index.css";
import "@photo-sphere-viewer/markers-plugin/index.css";

import { renderImgs } from "../utils/renderImg";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";

interface Hotspot {
  pitch: number;
  yaw: number;
  target: string;
  tooltip?: string;
}

import { panoramaData } from "../utils/panoData";
import { villaDetails } from "../utils/villaDetails";

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
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);
  const [rooms, setRooms] = useState<{ name: string; dimensions: string; target: string }[]>([]);
  const [showFloorPlan, setShowFloorPlan] = useState(false);
  const [floorSVG, setFloorSvg] = useState<React.ReactNode>(null);
  const [selectedPanorama, setSelectedPanorama] = useState<any>(null);
  const [selectedFloor, setSelectedFloor] = useState(defaultSelected);

  const viewerRef = useRef<any>(null);

  const clusterName = useMemo(() => {
    if (clusterId?.includes("A")) return "ClusterA";
    if (clusterId?.includes("B")) return "ClusterB";
    if (clusterId?.includes("T")) return "ClusterTW";
    return null;
  }, [clusterId]);

  const clusterPrefix = useMemo(() => {
    if (clusterId?.startsWith("A")) return "A";
    if (clusterId?.startsWith("B")) return "B";
    if (clusterId?.startsWith("T")) return "TW";
    return "";
  }, [clusterId]);

  const panoramaDataForCluster = useMemo(() => {
    if (!clusterName) return {};
    const floorKey = selectedFloor.key as keyof typeof panoramaData[typeof clusterName];
    return panoramaData[clusterName]?.[floorKey] || {};
  }, [clusterName, selectedFloor.key]);

  const getPanoramaImage = useMemo(() => {
    const currentPanoramaData = (panoramaDataForCluster as any)[currentLocation];
    const imagePath = currentPanoramaData?.imgName || "/panos/ClusterA/groundFloor/01.jpg";
    return imagePath;
  }, [panoramaDataForCluster, currentLocation, selectedFloor]);

  const getCurrentPanoramaImage = useMemo(() => {
    return getPanoramaImage;
  }, [getPanoramaImage]);

  const handleRoomNavigation = (target: string) => {
    setCurrentLocation(target);
  };

  const handleFloorChange = useCallback((floor: typeof Floors[0]) => {
    setSelectedFloor(floor);
    
    // Find the first available location for the new floor
    if (clusterName && panoramaData[clusterName as keyof typeof panoramaData]) {
      const floorData = panoramaData[clusterName as keyof typeof panoramaData][floor.key as keyof typeof panoramaData[typeof clusterName]];
      if (floorData) {
        const availableLocations = Object.keys(floorData);
        const firstLocation = availableLocations[0] || "location1";
        setCurrentLocation(firstLocation);
      } else {
        setCurrentLocation("location1"); // Fallback
      }
    } else {
      setCurrentLocation("location1"); // Fallback
    }
    
    setImageLoading(true); // Show loading while changing floors
    setShowFloorPlan(false); // Hide floor plan when changing floors
    
    // Navigate to the new floor panorama
    if (clusterId) {
      navigate(`/clusterView/${clusterId}/${floor.key}/image`);
    }
  }, [clusterId, navigate, clusterName]);

  useEffect(() => {
    if (clusterName && selectedFloor.key) {
      const clusterVillaDetails = (villaDetails as any)[clusterPrefix]?.[selectedFloor.key] || [];
      const clusterPanoramaData = panoramaDataForCluster;
      
      const allRooms = [...clusterVillaDetails];
      
      Object.keys(clusterPanoramaData).forEach(locationKey => {
        const existingRoom = allRooms.find((room: any) => room.target === locationKey);
        if (!existingRoom) {
          allRooms.push({
            name: `Room ${locationKey}`,
            dimensions: "N/A",
            target: locationKey
          });
        }
      });
      
      setRooms(allRooms);
      setSelectedPanorama(clusterPanoramaData);
      
      // Generate floor SVG
      const svg = renderImgs(clusterId || "", selectedFloor, handleRoomNavigation);
      setFloorSvg(svg);
    }
    setLoading(false);
  }, [clusterName, selectedFloor.key, clusterPrefix, panoramaDataForCluster, clusterId, selectedFloor]);

  // Separate effect to handle location validation
  useEffect(() => {
    if (selectedPanorama && typeof selectedPanorama === 'object' && !(currentLocation in selectedPanorama)) {
      const availableLocations = Object.keys(selectedPanorama);
      const firstLocation = availableLocations[0] || "location1";
      setCurrentLocation(firstLocation);
    }
  }, [selectedPanorama, currentLocation]);

  // Fallback to hide loading screen if onReady doesn't fire
  useEffect(() => {
    if (imageLoading) {
      const timeout = setTimeout(() => {
        setImageLoading(false);
      }, 5000); // 5 second timeout

      return () => clearTimeout(timeout);
    }
  }, [imageLoading]);

  const handleHotspotClick = (hotspot: Hotspot) => {
    if (selectedPanorama && selectedPanorama[hotspot.target]) {
      setCurrentLocation(hotspot.target);
    }
  };

  const toggleFloorPlan = () => {
    setShowFloorPlan(!showFloorPlan);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  const currentImage = getCurrentPanoramaImage;
  const currentPanoramaData = selectedPanorama?.[currentLocation];

  if (!currentImage) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="alert alert-danger">
          <h3>❌ Error</h3>
          <p>No panorama image found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="panorama-viewer-container">
      {imageLoading && <LoadingScreen />}

      {/* Floor Selection */}
      <div className="floor-selection-container">
        <div className="btn-group floor-toggle-group" role="group" aria-label="Floor selection">
          {Floors.map((floor) => (
            <button
              key={floor.key}
              id={`floor-${floor.key}`}
              type="button"
              className={`btn floor-toggle-button ${selectedFloor.key === floor.key ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleFloorChange(floor)}
            >
              {floor.value}
            </button>
          ))}
        </div>
      </div>

      <div className="room-navigation-buttons">
        {rooms.map((room, index) => (
          <button
            key={index}
            className={`room-button ${currentLocation === room.target ? 'active' : ''}`}
            onClick={() => handleRoomNavigation(room.target)}
          >
            {room.name}
          </button>
        ))}
      </div>

      {/* Panorama Viewer */}
      <div style={{ 
        width: '100vw', 
        height: '100vh',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <ReactPhotoSphereViewer
          key={`${selectedFloor.key}-${currentLocation}`}
          ref={viewerRef}
          src={currentImage}
          height="100%"
          width="100%"
          defaultZoomLvl={0}
          moveSpeed={1.5}
          mousewheel={true}
          touchmoveTwoFingers={true}
          mousewheelCtrlKey={true}
          navbar={[
            'autorotate',
            'zoom',
            'move',
            'fullscreen'
          ]}
          plugins={[
            [
              MarkersPlugin,
              {
                markers: currentPanoramaData?.hotspots?.map((hotspot: Hotspot, index: number) => ({
                  id: `hotspot-${index}`,
                  position: { pitch: hotspot.pitch, yaw: hotspot.yaw },
                  image: "/arrow-down-marker.png",
                  width: 32,
                  height: 32,
                  anchor: "bottom center",
                  tooltip: hotspot.tooltip || `Go to ${hotspot.target}`,
                  data: { target: hotspot.target },
                  size: { width: 32, height: 32 },
                })) || [],
              },
            ],
          ]}
          onReady={(viewer) => {
            // Set up hotspot click handling
            const markersPlugin = viewer.getPlugin(MarkersPlugin);
            markersPlugin.addEventListener("select-marker", (e: any) => {
              const target = e.marker?.data?.target;
              if (target) {
                handleHotspotClick({ pitch: 0, yaw: 0, target });
              }
            });
            
            setImageLoading(false);
          }}
        />
      </div>

        <button
          className="position-absolute end-0 m-3"
          style={{
            backgroundColor: "#000",
            padding: "clamp(6px, 1.5vw, 8px)",
            borderRadius: "8px",
            cursor: "pointer",
            zIndex: 20,
            bottom: 'clamp(60px, 12vh, 80px)',
            right: 'clamp(15px, 3vw, 20px)',
          }}
          onClick={toggleFloorPlan}
        >
          <img
            src="/floorPlan.png"
            alt="Floor Plan Icon"
            style={{ 
              width: 'clamp(30px, 8vw, 40px)', 
              height: 'clamp(30px, 8vw, 40px)', 
              objectFit: "contain" 
            }}
          />
        </button>
   
      {showFloorPlan && (
        <div
          className="floor-plan position-fixed bg-white shadow"
          style={{
            zIndex: 30,
            width: "clamp(250px, 80vw, 300px)",
            height: "clamp(200px, 60vh, 400px)",
            minHeight: "200px",
            overflow: "auto",
            bottom: 'clamp(80px, 15vh, 115px)',
            right: 'clamp(20px, 5vw, 80px)',
            padding: "clamp(10px, 2vw, 15px)",
            borderRadius: "8px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)"
          }}
        >
          <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <h6 style={{ marginBottom: "10px", textAlign: "center", fontWeight: "600" }}>Floor Plan</h6>
            <div style={{ flex: 1, overflow: "auto" }}>
              {floorSVG}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClusterPanoramaViewer; 