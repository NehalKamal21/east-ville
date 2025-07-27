import React, { useRef, useState, useEffect, useMemo } from "react";
import { Spinner } from "react-bootstrap";
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";
import { MarkersPlugin } from "@photo-sphere-viewer/markers-plugin";
import "@photo-sphere-viewer/core/index.css";
import "@photo-sphere-viewer/markers-plugin/index.css";

import { useParams, useNavigate, useLocation } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";

interface Hotspot {
  pitch: number;
  yaw: number;
  target: string;
}

interface Room {
  name: string;
  dimensions: string;
  target: string;
}

import { panoramaData } from "../utils/panoData";
import { villaDetails } from "../utils/villaDetails";

const IconPanoramaViewer: React.FC = () => {
  const { iconId } = useParams<{ iconId: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const [currentLocation, setCurrentLocation] = useState("location1");
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [showFloorPlan, setShowFloorPlan] = useState(false);
  const [floorSVG, setFloorSvg] = useState<React.ReactNode>(null);
  const [selectedPanorama, setSelectedPanorama] = useState<any>(null);
  const [customPanoramaConfig, setCustomPanoramaConfig] = useState<any>(null);

  const viewerRef = useRef<any>(null);

  useEffect(() => {
    const storedConfig = localStorage.getItem('panoramaConfig');
    if (storedConfig) {
      try {
        const config = JSON.parse(storedConfig);
        setCustomPanoramaConfig(config);
        setCurrentLocation(config.location || 'location1');
        localStorage.removeItem('panoramaConfig');
      } catch (error) {
        console.error('Error parsing panorama config:', error);
        localStorage.removeItem('panoramaConfig');
      }
    }
    setLoading(false);
  }, []);

  const getPanoramaImage = useMemo(() => {
    if (customPanoramaConfig) {
      const iconId = customPanoramaConfig.iconId;
      if (iconId) {
        const letter = iconId.split('-')[1];
        if (letter) {
          const imagePath = `/360Ext/${letter}.jpg`;
          console.log('🖼️ Icon panorama image path:', imagePath);
          return imagePath;
        }
      }
    }
    const fallbackPath = "/360Ext/A.jpg";
    console.log('🖼️ Using fallback image path:', fallbackPath);
    return fallbackPath;
  }, [customPanoramaConfig]);

  const getCurrentPanoramaImage = useMemo(() => {
    return getPanoramaImage;
  }, [getPanoramaImage]);

  const handleRoomNavigation = (target: string) => {
    console.log(`🔄 Navigating to room: ${target}`);
    setCurrentLocation(target);
  };

  useEffect(() => {
    if (customPanoramaConfig) {
      let clusterId: string;
      if (customPanoramaConfig.clusterId === 'A') clusterId = 'ClusterA';
      else if (customPanoramaConfig.clusterId === 'B') clusterId = 'ClusterB';
      else if (customPanoramaConfig.clusterId === 'TW') clusterId = 'ClusterTW';
      else clusterId = 'ClusterA'; // fallback
      
      const clusterVillaDetails = (villaDetails as any)[customPanoramaConfig.clusterId]?.[customPanoramaConfig.floorKey] || [];
      const clusterPanoramaData = (panoramaData as any)[clusterId]?.[customPanoramaConfig.floorKey] || {};
      
      const allRooms: Room[] = clusterVillaDetails.map((room: any) => ({
        name: room.name,
        dimensions: room.dimensions,
        target: room.target || 'location1'
      }));
      
      Object.keys(clusterPanoramaData).forEach(locationKey => {
        const existingRoom = allRooms.find(room => room.target === locationKey);
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
  }, [customPanoramaConfig]);

  const handleHotspotClick = (hotspot: Hotspot) => {
    console.log(`🎯 Hotspot clicked: ${hotspot.target}`);
    
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



      {/* Panorama Viewer */}
      <div style={{ 
        width: '100vw', 
        height: '100vh',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <ReactPhotoSphereViewer
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
                  html: `<div class="hotspot-marker">📍</div>`,
                  data: { target: hotspot.target },
                })) || [],
              },
            ],
          ]}
          onReady={() => {
            console.log('✅ Icon Panorama viewer ready, current location:', currentLocation, 'image:', currentImage);
            console.log('🔍 Current panorama data:', currentPanoramaData);
            console.log('🖼️ Image source:', currentImage);
            setImageLoading(false);
          }}
        />
      </div>

      {showFloorPlan && (
        <div className="floor-plan-modal" onClick={toggleFloorPlan}>
          <div onClick={(e) => e.stopPropagation()}>
            <h3>Floor Plan</h3>
            <img
              src="/floor-plan/twinhouse_ground.jpg"
              alt="Floor Plan"
            />
            <button onClick={toggleFloorPlan}>×</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IconPanoramaViewer; 