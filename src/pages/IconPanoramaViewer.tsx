import React, { useRef, useState, useEffect, useMemo } from "react";
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";
import { MarkersPlugin } from "@photo-sphere-viewer/markers-plugin";
import "@photo-sphere-viewer/core/index.css";
import "@photo-sphere-viewer/markers-plugin/index.css";

import { useParams, useNavigate, useLocation } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";

// Hotspot configuration for letters A-M - each letter can have multiple hotspots
const panoramaHotspots: Record<string, Array<{
  id: string;
  position: { yaw: number | string; pitch: number | string };
  target: string;
}>> = {
  A: [
    { id: 'A-to-D', position: { yaw: "50deg", pitch: "0deg" }, target: 'D' },
    { id: 'A-to-C', position: { yaw: "130deg", pitch: "0deg" }, target: 'C' },
    { id: 'A-to-I', position: { yaw: "87deg", pitch: "0deg" }, target: 'I' }
  ],
  B: [
    { id: 'B-to-F', position: { yaw: "87deg", pitch: "0deg" }, target: 'F' },
    { id: 'B-to-D', position: { yaw: "130deg", pitch: "0deg" }, target: 'D' }
  ],
  C: [
    { id: 'C-to-A', position: { yaw: "10deg", pitch: "0deg" }, target: 'A' },
    { id: 'C-to-H', position: { yaw: "90deg", pitch: "0deg" }, target: 'H' }
  ],
  D: [
    { id: 'D-to-B', position: { yaw: "30deg", pitch: "0deg" }, target: 'B' },
    { id: 'D-to-A', position: { yaw: "150deg", pitch: "0deg" }, target: 'A' },
    { id: 'D-to-I', position: { yaw: "87deg", pitch: "0deg" }, target: 'I' }
 ],
  E: [
    { id: 'E-to-L', position: { yaw: "-40deg", pitch: "0deg" }, target: 'L' },
    { id: 'E-to-F', position: { yaw: "30deg", pitch: "0deg" }, target: 'F' },
    { id: 'E-to-D', position: { yaw: "-10deg", pitch: "0deg" }, target: 'D' }
  ],
  F: [
    { id: 'F-to-I', position: { yaw: "170deg", pitch: "0deg" }, target: 'I' },
    { id: 'F-to-E', position: { yaw: "150deg", pitch: "0deg" }, target: 'E' },
    { id: 'F-to-D', position: { yaw: "200deg", pitch: "0deg" }, target: 'D' },
    { id: 'F-to-B', position: { yaw: "270deg", pitch: "0deg" }, target: 'B' }
  ],
  H: [
    { id: 'H-to-E', position: { yaw: "0deg", pitch: "0deg" }, target: 'E' },
    { id: 'H-to-G', position: { yaw: "-140deg", pitch: "35deg" }, target: 'G' },
    { id: 'H-to-J', position: { yaw: "-140deg", pitch: "0deg" }, target: 'J' },

    { id: 'H-to-L', position: { yaw: "50deg", pitch: "0deg" }, target: 'L' },
    { id: 'H-to-M', position: { yaw: "120deg", pitch: "25deg" }, target: 'M' },
    { id: 'H-to-K', position: { yaw: "140deg", pitch: "0deg" }, target: 'K' },
    { id: 'H-to-C', position: { yaw: "-30deg", pitch: "0deg" }, target: 'C' },
  ],
  I: [
    { id: 'I-to-F', position: { yaw: "0deg", pitch: "0deg" }, target: 'F' },
    { id: 'I-to-A', position: { yaw: "-120deg", pitch: "0deg" }, target: 'A' },
    { id: 'I-to-H', position: { yaw: "180deg", pitch: "0deg" }, target: 'H' }
  ],
  J: [
    { id: 'J-to-K', position: { yaw: "0deg", pitch: "0deg" }, target: 'K' },
    { id: 'J-to-G', position: { yaw: "-30deg", pitch: "45deg" }, target: 'G' },
    { id: 'J-to-H', position: { yaw: "10deg", pitch: "0deg" }, target: 'H' }
  ],
  K: [
    { id: 'K-to-H', position: { yaw: "160deg", pitch: "0deg" }, target: 'H' },
    { id: 'K-to-M', position: { yaw: "0deg", pitch: "18deg" }, target: 'M' }
  ],
  L: [
    { id: 'L-to-C', position: { yaw: "0deg", pitch: "0deg" }, target: 'C' },
    { id: 'L-to-E', position: { yaw: "60deg", pitch: "-6deg" }, target: 'E' }
  ]
};

const IconPanoramaViewer: React.FC = () => {
  const { iconId } = useParams<{ iconId: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState<string | null>(null);
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

  // Preload and validate image before rendering
  const validateImage = async (imagePath: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        // Check if image has correct aspect ratio (2:1 for 360 panoramas)
        const aspectRatio = img.width / img.height;
        if (Math.abs(aspectRatio - 2) > 0.1) {
          console.warn(`Image ${imagePath} has incorrect aspect ratio: ${aspectRatio}. Expected 2:1`);
        }
        resolve(true);
      };
      img.onerror = () => {
        console.error(`Failed to load image: ${imagePath}`);
        setImageError(`Failed to load panorama image: ${imagePath}`);
        resolve(false);
      };
      img.src = imagePath;
    });
  };

  const getPanoramaImage = useMemo(() => {
    // First check URL params
    if (iconId) {
      const letter = iconId.split('-')[1];
      if (letter) {
        setCurrentLetter(letter);
        const imagePath = `/360Ext/${letter.toUpperCase()}.jpg`;
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
          const imagePath = `/360Ext/${letter.toUpperCase()}.jpg`;
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

  // Get hotspots for current letter
  const currentHotspots = useMemo(() => {
    return panoramaHotspots[currentLetter] || [];
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

    // Create markers from hotspots
    if (currentHotspots && currentHotspots.length > 0) {
      const markers = currentHotspots.map(hotspot => ({
        id: hotspot.id,
        position: hotspot.position,
        image: "/arrow-down-marker.png",
        width: 32,
        height: 32,
        anchor: "bottom center",

        data: hotspot,
        size: { width: 32, height: 32 },
      }));

      markersPlugin.setMarkers(markers);

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
  // Validate image when it changes
  useEffect(() => {
    if (getCurrentPanoramaImage) {
      setImageError(null);
      validateImage(getCurrentPanoramaImage);
    }
  }, [getCurrentPanoramaImage]);

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

  if (imageError) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="alert alert-danger">
          <h3>❌ Image Loading Error</h3>
          <p>{imageError}</p>
          <button 
            className="btn btn-primary mt-2"
            onClick={() => {
              setImageError(null);
              setImageLoading(true);
            }}
          >
            Retry
          </button>
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