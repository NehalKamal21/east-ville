import React, { useState } from "react";
// @ts-ignore
import { Pannellum } from "pannellum-react";
import { Spinner } from "react-bootstrap";
import Image1 from "../assets/1.jpg";
import Image2 from "../assets/3.jpg";

interface Panorama {
    image: string;
    hotspots: {
        pitch: number;
        yaw: number;
        target: string;
    }[];
}

const panoramaData: { panoramas: { [key: string]: Panorama } } = {
    "panoramas": {
        "location1": {
            "image": Image1,
            "hotspots": [
                {
                    "pitch": 0,
                    "yaw": 290,
                    "target": "location2",
                }
            ]
        },
        "location2": {
            "image": Image2,
            "hotspots": [
                {
                    "pitch": 0,
                    "yaw": -100,
                    "target": "location1",
                }
            ]
        }
    }
};

const PanoramaViewer: React.FC = () => {
    const [currentLocation, setCurrentLocation] = useState("location1");
    const [currentImage, setCurrentImage] = useState(panoramaData.panoramas["location1"].image);
    const [loading, setLoading] = useState(false);

    // Function to handle hotspot click (change panorama with transition)
    const handleHotspotClick = (targetLocation: string) => {
        setLoading(true);
        setTimeout(() => {
            setCurrentLocation(targetLocation);
            setCurrentImage(panoramaData.panoramas[targetLocation].image);
            setLoading(false);
        }, 800); // Smooth transition delay
    };

    return (
        <div className="w-100 vh-100 position-relative">
            {loading && (
                <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex align-items-center justify-content-center z-3">
                    <Spinner animation="border" variant="light" />
                </div>
            )}

            <Pannellum
                width="100%"
                height="100vh"
                image={currentImage}
                pitch={0}
                yaw={0}
                hfov={110}
                autoLoad
                showControls
            >
                {/* Dynamically generate hotspots from JSON */}
                {panoramaData.panoramas[currentLocation].hotspots.map((hotspot, index) => (
                    <Pannellum.Hotspot
                        key={index}
                        type="custom"
                        pitch={hotspot.pitch}
                        yaw={hotspot.yaw}
                        handleClick={() => handleHotspotClick(hotspot.target)}
                    />
                ))}
            </Pannellum>
        </div>
    );
};

export default PanoramaViewer;
