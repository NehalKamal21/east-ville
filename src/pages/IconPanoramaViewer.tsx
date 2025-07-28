import React, { useRef, useState, useEffect, useMemo } from "react";
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";
import "@photo-sphere-viewer/core/index.css";

import { useParams, useNavigate, useLocation } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";

const IconPanoramaViewer: React.FC = () => {
  const { iconId } = useParams<{ iconId: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);
  const [showFloorPlan, setShowFloorPlan] = useState(false);
  const [customPanoramaConfig, setCustomPanoramaConfig] = useState<any>(null);

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
    if (customPanoramaConfig) {
      const iconId = customPanoramaConfig.iconId;
      if (iconId) {
        const letter = iconId.split('-')[1];
        if (letter) {
          const imagePath = `/360Ext/${letter}.jpg`;
          return imagePath;
        }
      }
    }
    const fallbackPath = "/360Ext/A.jpg";
    return fallbackPath;
  }, [customPanoramaConfig]);

  const getCurrentPanoramaImage = useMemo(() => {
    return getPanoramaImage;
  }, [getPanoramaImage]);



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
          onReady={() => {
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