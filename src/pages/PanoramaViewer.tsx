import React, { useRef, useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";
import { MarkersPlugin } from "@photo-sphere-viewer/markers-plugin";
import "@photo-sphere-viewer/core/index.css";
import "@photo-sphere-viewer/markers-plugin/index.css";

import Image1 from "../assets/1.jpg";
import Image2 from "../assets/3.jpg";
import { renderSVG } from "../utils/renderSVG";
import { useParams } from "react-router-dom";

interface Hotspot {
    pitch: number;
    yaw: number;
    target: string;
}

interface Panorama {
    id: string,
    name: string,
    image: string;
    hotspots: Hotspot[];
}

const panoramaData: { panoramas: Record<string, Panorama> } = {
    panoramas: {
        location1: {
            id: 'pano-1',
            name: 'Panorama 1',
            image: Image1,
            hotspots: [{ pitch: 0, yaw: 290, target: "location2" }],
        },
        location2: {
            id: 'pano-2',
            name: 'Panorama 3',
            image: Image2,
            hotspots: [{ pitch: 0, yaw: -100, target: "location1" }],
        },
    },
};

const PanoramaViewer: React.FC = () => {
    const { clusterId, FloorId } = useParams<{ clusterId: string; FloorId: string }>();
    const Floors = [
        { value: "GF", key: "groundFloor" },
        { value: "1F", key: "firstFloor" },
        { value: "2F", key: "secondFloor" },
        { value: "RF", key: "Roof" },
    ];
    const defaultSelected = Floors.find((f) => f.key === FloorId) || Floors[0];

    const [currentLocation, setCurrentLocation] = useState("location1");
    const [loading, setLoading] = useState(false);
    const [rooms, setRooms] = useState<{ name: string; dimensions: string }[]>([]);
    const [showFloorPlan, setShowFloorPlan] = useState(false);
    const [floorSVG, setFloorSvg] = useState<React.ReactNode>(null);

    const viewerRef = useRef<any>(null);

    const handleHotspotClick = (targetLocation: string) => {
        setLoading(true);
        setTimeout(() => {
            setCurrentLocation(targetLocation);
        }, 100); // allow fade-out
        setTimeout(() => {
            setLoading(false);
        }, 900); // allow fade-in
    };

    const onReady = (viewer: any) => {
        viewerRef.current = viewer;
        const markersPlugin = viewer.getPlugin(MarkersPlugin);

        const hotspots = panoramaData.panoramas[currentLocation]?.hotspots ?? [];

        const markers = hotspots
            .filter(
                (h) =>
                    typeof h.pitch === "number" &&
                    !isNaN(h.pitch) &&
                    typeof h.yaw === "number" &&
                    !isNaN(h.yaw)
            )
            .map((hotspot, index) => ({
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
    };

    // Optional: Preload the next image
    useEffect(() => {
        const next = panoramaData.panoramas[currentLocation]?.hotspots?.[0]?.target;
        if (next) {
            const preloadImg = new Image();
            preloadImg.src = panoramaData.panoramas[next].image;
        }
    }, [currentLocation]);
    useEffect(() => {
        setRooms(JSON.parse(localStorage.getItem("rooms") || "[]"))
        setFloorSvg(renderSVG(clusterId || "", defaultSelected));
    }, [])
    return (
        <div className="w-100 vh-100 position-relative bg-black">
            {loading && (
                <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex align-items-center justify-content-center z-3">
                    <Spinner animation="border" variant="light" />
                </div>
            )}

            <div
                style={{
                    opacity: loading ? 0 : 1,
                    transition: "opacity 0.6s ease-in-out",
                    // width: "100%",
                    // height: "100vh",
                }}
            >
                <ReactPhotoSphereViewer
                    key={currentLocation}
                    src={panoramaData.panoramas[currentLocation].image}
                    height="100vh"
                    width="100%"
                    plugins={[[MarkersPlugin, {}]]}
                    onReady={onReady}
                />
                {/* Room Navigation Buttons */}
                <div
                    className="position-absolute start-0 w-100 p-3 d-flex justify-content-center gap-2"
                    style={{ background: "rgba(0,0,0,0.5)", zIndex: 10, bottom: '40px' }}
                >
                    {rooms.map((room: any) => (
                        <button
                            key={room.id}
                            className="btn btn-light btn-sm"
                            onClick={() => handleHotspotClick(room.panorama)}
                        >
                            {room.name}
                        </button>
                    ))}
                </div>
            </div>
            {/* Floor Plan Toggle Button (bottom-right) */}
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
                onClick={() => setShowFloorPlan(!showFloorPlan)}
            >
                <img
                    src="/floorPlan.png"
                    alt="Floor Plan Icon"
                    style={{ width: 40, height: 40, objectFit: "contain" }}
                />
            </div>

            {/* Floor Plan Panel */}
            {showFloorPlan && (
                <div
                    className="position-absolute mt-3 ms-3 p-3 bg-white shadow"
                    style={{
                        zIndex: 30,
                        width: "300px",
                        maxHeight: "80vh",
                        overflow: "auto",
                        borderRadius: "12px",
                        bottom: '100px',
                        right: '75px',
                    }}
                >
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <strong>Floor Plan</strong>
                        <button className="btn btn-sm btn-close" onClick={() => setShowFloorPlan(false)} />
                    </div>
                    {floorSVG}
                </div>
            )}

        </div>
    );
};

export default PanoramaViewer;
