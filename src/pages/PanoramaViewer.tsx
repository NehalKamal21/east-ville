import React, { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { Spinner } from "react-bootstrap";
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";
import { MarkersPlugin } from "@photo-sphere-viewer/markers-plugin";
import "@photo-sphere-viewer/core/index.css";
import "@photo-sphere-viewer/markers-plugin/index.css";

import { renderSVG } from "../utils/renderSVG";
import { useParams } from "react-router-dom";

interface Hotspot {
  pitch: number;
  yaw: number;
  target: string;
}

import { panoramaData } from "../utils/panoData";
import LoadingScreen from "../components/LoadingScreen";

const PanoramaViewer: React.FC = () => {
  const { clusterId, FloorId } = useParams<{ clusterId: string; FloorId: string }>();

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

  const viewerRef = useRef<any>(null);

  // Memoize cluster name calculation
  const clusterName = useMemo(() => {
    if (clusterId?.includes("A")) return "ClusterA";
    if (clusterId?.includes("B")) return "ClusterB";
    if (clusterId?.includes("T")) return "ClusterTW";
    return null;
  }, [clusterId]);

  // Check for custom panorama configuration from 360 icons
  useEffect(() => {
    const storedConfig = localStorage.getItem('panoramaConfig');
    if (storedConfig) {
      try {
        const config = JSON.parse(storedConfig);
        setCustomPanoramaConfig(config);
        setCurrentLocation(config.location || 'location1');
        setIsFromMasterPlan(true); // Set flag when coming from master plan
        localStorage.removeItem('panoramaConfig'); // Clear after reading
      } catch (error) {
        console.error('Error parsing panorama config:', error);
      }
    }
  }, []);

  // Memoize panorama data
  const panoramaDataForCluster = useMemo(() => {
    if (!clusterName) return {};
    const floorKey = defaultSelected.key as keyof typeof panoramaData[typeof clusterName];
    return panoramaData[clusterName]?.[floorKey] || {};
  }, [clusterName, defaultSelected.key]);

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

  const handleHotspotClick = useCallback((targetLocation: string) => {
    setLoading(true);
    setTimeout(() => {
      setCurrentLocation(targetLocation);
    }, 100);
    setTimeout(() => {
      setLoading(false);
    }, 900);
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
        image: "/marker-icon.png",
        width: 32,
        height: 32,
        anchor: "bottom center",
        tooltip: `Go to ${hotspot.target}`,
        data: { target: hotspot.target },
        size: { width: 32, height: 32 },
      }));

    markersPlugin.setMarkers(markers);

    markersPlugin.addEventListener("select-marker", (e: any) => {
      const target = e.marker?.data?.target;
      if (target) handleHotspotClick(target);
    });
  }, [selectedPanorama, currentLocation, handleHotspotClick]);

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
    setRooms(JSON.parse(localStorage.getItem("rooms") || "[]"));
    setFloorSvg(renderSVG(clusterId || "", defaultSelected));
  }, [clusterId, defaultSelected]);

  const getRandomLocation = useCallback((): string => {
    const locations = ["location1", "location2"];
    const index = Math.floor(Math.random() * locations.length);
    return locations[index];
  }, []);

  const toggleFloorPlan = useCallback(() => {
    setShowFloorPlan(prev => !prev);
  }, []);

  return (
    <div className="w-100 vh-100 position-relative bg-black">
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
                onClick={() => handleHotspotClick(getRandomLocation())}
              >
                {room.name}
              </button>
            ))}
          </div>
        )}
      </div>
      {!isFromMasterPlan && (
        <div
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
        </div>
      )}
      {showFloorPlan && (
        <div
          className="position-absolute mt-3 ms-3 p-3 bg-white shadow"
          style={{
            zIndex: 30,
            width: "300px",
            maxHeight: "400px",
            overflow: "auto",
          }}
        >
          {floorSVG}
        </div>
      )}
    </div>
  );
};

export default PanoramaViewer;
