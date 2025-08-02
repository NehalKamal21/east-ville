import React, { useRef, useState, useEffect, useMemo } from "react";
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";
import { MarkersPlugin } from "@photo-sphere-viewer/markers-plugin";
import "@photo-sphere-viewer/core/index.css";
import "@photo-sphere-viewer/markers-plugin/index.css";

import { useParams, useNavigate, useLocation } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";

// Simple hotspot configuration for letters A-M
const panoramaHotspots: Record<string, {
  id: string;
  position: { yaw: number; pitch: number };
  tooltip: string;
  target: string;
}> = {
  A: { id: 'A', position: { yaw: 0, pitch: 0 }, tooltip: 'Go to B', target: 'B' },
  B: { id: 'B', position: { yaw: 0, pitch: 0 }, tooltip: 'Go to C', target: 'C' },
  C: { id: 'C', position: { yaw: 0, pitch: 0 }, tooltip: 'Go to D', target: 'D' },
  D: { id: 'D', position: { yaw: 0, pitch: 0 }, tooltip: 'Go to E', target: 'E' },
  E: { id: 'E', position: { yaw: 0, pitch: 0 }, tooltip: 'Go to F', target: 'F' },
  F: { id: 'F', position: { yaw: 0, pitch: 0 }, tooltip: 'Go to G', target: 'G' },
  G: { id: 'G', position: { yaw: 0, pitch: 0 }, tooltip: 'Go to H', target: 'H' },
  H: { id: 'H', position: { yaw: 0, pitch: 0 }, tooltip: 'Go to I', target: 'I' },
  I: { id: 'I', position: { yaw: 0, pitch: 0 }, tooltip: 'Go to J', target: 'J' },
  J: { id: 'J', position: { yaw: 0, pitch: 0 }, tooltip: 'Go to K', target: 'K' },
  K: { id: 'K', position: { yaw: 0, pitch: 0 }, tooltip: 'Go to L', target: 'L' },
  L: { id: 'L', position: { yaw: 0, pitch: 0 }, tooltip: 'Go to M', target: 'M' },
  M: { id: 'M', position: { yaw: 0, pitch: 0 }, tooltip: 'Go to A', target: 'A' }
};

const IconPanoramaViewer: React.FC = () => {
  const { iconId } = useParams<{ iconId: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);
  const [showFloorPlan, setShowFloorPlan] = useState(false);
  const [customPanoramaConfig, setCustomPanoramaConfig] = useState<any>(null);
  const [currentLetter, setCurrentLetter] = useState<string>('A');

  const viewerRef = useRef<any>(null);

  useEffect(() => {
    const storedConfig = localStorage.getItem('panoramaConfig');
    if (storedConfig) {
      try {
        const config = JSON.parse(storedConfig);
        setCustomPanoramaConfig(config);
        localStorage.removeItem('panoramaConfig');
      } catch (error) {
        console.error('Error parsing panorama config:', error);
        localStorage.removeItem('panoramaConfig');
      }
    }
    setLoading(false);
  }, []);

  const getPanoramaImage = useMemo(() => {
    // First check URL params
    if (iconId) {
      const letter = iconId.split('-')[1];
      if (letter) {
        setCurrentLetter(letter);
        const imagePath = `/360Ext/${letter}.jpg`;
        return imagePath;
      }
    }
    
    // Fallback to localStorage config
    if (customPanoramaConfig) {
      const iconId = customPanoramaConfig.iconId;
      if (iconId) {
        const letter = iconId.split('-')[1];
        if (letter) {
          setCurrentLetter(letter);
          const imagePath = `/360Ext/${letter}.jpg`;
          return imagePath;
        }
      }
    }
    
    const fallbackPath = "/360Ext/A.jpg";
    setCurrentLetter('A');
    return fallbackPath;
  }, [iconId, customPanoramaConfig]);

  const getCurrentPanoramaImage = useMemo(() => {
    return getPanoramaImage;
  }, [getPanoramaImage]);

  // Reset image loading when image changes
  useEffect(() => {
    setImageLoading(true);
  }, [getCurrentPanoramaImage]);

  // Get hotspot for current letter
  const currentHotspot = useMemo(() => {
    return panoramaHotspots[currentLetter];
  }, [currentLetter]);

  const handleHotspotClick = (hotspot: any) => {
    if (hotspot.target) {
      // Navigate to another panorama
      const newConfig = {
        iconId: `360-${hotspot.target}`,
        clusterId: hotspot.target,
        floorId: 'groundFloor',
        location: 'location1'
      };
      localStorage.setItem('panoramaConfig', JSON.stringify(newConfig));
      navigate(`/exterior/360-${hotspot.target}`);
    }
  };

  const onReady = (viewer: any) => {
    viewerRef.current = viewer;
    const markersPlugin = viewer.getPlugin(MarkersPlugin);

    // Create marker from hotspot
    if (currentHotspot) {
      const marker = {
        id: currentHotspot.id,
        position: currentHotspot.position,
        image: "/arrow-down-marker.png",
        width: 32,
        height: 32,
        anchor: "bottom center",
        tooltip: currentHotspot.tooltip,
        data: currentHotspot,
        size: { width: 32, height: 32 },
      };

      markersPlugin.setMarkers([marker]);

      // Add click event listener
      markersPlugin.addEventListener('select-marker', (e: any) => {
        const hotspot = e.marker?.data;
        if (hotspot) {
          handleHotspotClick(hotspot);
        }
      });
    }

    setImageLoading(false);
  };

  const toggleFloorPlan = () => {
    setShowFloorPlan(!showFloorPlan);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  const currentImage = getCurrentPanoramaImage;

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
          key={currentImage} // Force re-render when image changes
          ref={viewerRef}
          src={currentImage}
          height="100%"
          width="100%"
          defaultZoomLvl={0}
          moveSpeed={1.5}
          mousewheel={true}
          touchmoveTwoFingers={true}
          mousewheelCtrlKey={true}
          plugins={[[MarkersPlugin, {}]]}
          navbar={[
            'autorotate',
            'zoom',
            'move',
            'fullscreen'
          ]}
          onReady={onReady}
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