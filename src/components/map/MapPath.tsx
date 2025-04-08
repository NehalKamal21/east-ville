import React from "react";
import { Polyline } from "@react-google-maps/api";

interface MapPathProps {
    animatedPath: google.maps.LatLngLiteral[];
}

const MapPath: React.FC<MapPathProps> = ({ animatedPath }) => {
    if (animatedPath.length === 0) return null;

    return (
        <>
            <Polyline
                path={animatedPath}
                options={{
                    strokeColor: "#FFF", // White color for main path
                    strokeOpacity: 1,
                    strokeWeight: 3, // Main thickness
                    geodesic: true,
                    zIndex: 2, // Above other elements
                }}
            />

            {/* Glowing Outer Layer
            <Polyline
                path={animatedPath}
                options={{
                    strokeColor: "#0025", // Light gray for glow
                    strokeOpacity: 0.5, // Semi-transparent glow
                    strokeWeight: 10, // Wider glow effect
                    geodesic: true,
                    zIndex: 1,
                }}
            /> */}

            {/* Softest Outer Glow */}
            {/* <Polyline
                path={animatedPath}
                options={{
                    strokeColor: "#785545",
                    strokeOpacity: 0.3,
                    strokeWeight: 8, // Widest glow effect
                    geodesic: true,
                    zIndex: 0,
                }}
            /> */}

           

        </>
    );
};

export default MapPath;
