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
  const [rooms, setRooms] = useState<{ name: string; dimensions: string; target: string }[]>([]);
  const [showFloorPlan, setShowFloorPlan] = useState(false);
  const [floorSVG, setFloorSvg] = useState<React.ReactNode>(null);
  const [selectedPanorama, setSelectedPanorama] = useState<any>(null);
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

  // Memoize panorama data
  const panoramaDataForCluster = useMemo(() => {
    if (!clusterName) return {};
    const floorKey = selectedFloor.key as keyof typeof panoramaData[typeof clusterName];
    return panoramaData[clusterName]?.[floorKey] || {};
  }, [clusterName, selectedFloor.key]);

  // Get the specific panorama image based on configuration
  const getPanoramaImage = useMemo(() => {
    // For cluster panorama, use the standard panorama data structure
    const currentPanoramaData = (panoramaDataForCluster as any)[currentLocation];
    return currentPanoramaData?.imgName || "/panos/ClusterA/groundFloor/01.jpg";
  }, [panoramaDataForCluster, currentLocation]);

  // Get current panorama image
  const getCurrentPanoramaImage = useMemo(() => {
    return getPanoramaImage;
  }, [getPanoramaImage]);

  // Handle room navigation
  const handleRoomNavigation = (target: string) => {
    console.log(`🔄 Navigating to room: ${target}`);
    setCurrentLocation(target);
  };

  // Generate room list for navigation buttons
  useEffect(() => {
    if (clusterName && selectedFloor.key) {
      // Get villa details for this cluster and floor
      const clusterVillaDetails = (villaDetails as any)[clusterPrefix]?.[selectedFloor.key] || [];
      
      // Get panorama data for this cluster and floor
      const clusterPanoramaData = panoramaDataForCluster;
      
      // Combine villa details with additional rooms from panorama data
      const allRooms = [...clusterVillaDetails];
      
      // Add any additional rooms from panorama data that aren't in villa details
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
    }
  }, [clusterName, selectedFloor.key, clusterPrefix, panoramaDataForCluster]);

  // Handle hotspot clicks
  const handleHotspotClick = (hotspot: Hotspot) => {
    console.log(`🎯 Hotspot clicked: ${hotspot.target}`);
    
    if (selectedPanorama && selectedPanorama[hotspot.target]) {
      setCurrentLocation(hotspot.target);
    }
  };

  // Toggle floor plan
  const toggleFloorPlan = () => {
    setShowFloorPlan(!showFloorPlan);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  const currentImage = getCurrentPanoramaImage;
  const currentPanoramaData = selectedPanorama?.[currentLocation];

  if (!currentImage) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="alert alert-danger">No panorama image found</div>
      </div>
    );
  }

  return (
    <div className="panorama-viewer-container">
      {/* Room Navigation Buttons */}
      <div className="room-navigation-buttons">
        {rooms.map((room, index) => (
          <button
            key={index}
            className={`room-button ${currentLocation === room.target ? 'active' : ''}`}
            onClick={() => handleRoomNavigation(room.target)}
            style={{
              position: 'absolute',
              top: `${20 + (index * 60)}px`,
              right: '20px',
              zIndex: 10,
              padding: '8px 16px',
              backgroundColor: currentLocation === room.target ? '#007bff' : 'rgba(0,0,0,0.7)',
              color: 'white',
              border: 'none',
              borderRadius: '20px',
              fontSize: '12px',
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              minWidth: '120px',
              textAlign: 'center'
            }}
          >
            {room.name}
          </button>
        ))}
      </div>

      {/* Floor Plan Button */}
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

      {/* Panorama Viewer */}
      <div style={{ width: '100vw', height: '100vh' }}>
        <ReactPhotoSphereViewer
          ref={viewerRef}
          src={currentImage}
          height="100%"
          plugins={[
            [
              MarkersPlugin,
              {
                markers: currentPanoramaData?.hotspots?.map((hotspot: Hotspot, index: number) => ({
                  id: `hotspot-${index}`,
                  position: { pitch: hotspot.pitch, yaw: hotspot.yaw },
                  html: `<div class="hotspot-marker">📍</div>`,
                  data: { target: hotspot.target },
                })) || [],
              },
            ],
          ]}
          onReady={() => {
            console.log('✅ Cluster Panorama viewer ready, current location:', currentLocation, 'image:', currentImage);
          }}
        />
      </div>

      {/* Floor Plan Modal */}
      {showFloorPlan && (
        <div
          className="floor-plan-modal"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.8)',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onClick={toggleFloorPlan}
        >
          <div
            style={{
              maxWidth: '90%',
              maxHeight: '90%',
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '10px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Floor Plan</h3>
            <img
              src="/floor-plan/twinhouse_ground.jpg"
              alt="Floor Plan"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
            <button
              onClick={toggleFloorPlan}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer'
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClusterPanoramaViewer; 