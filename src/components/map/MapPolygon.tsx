import React from "react";
import { Polygon } from "@react-google-maps/api";
import { polygonCoordinates } from  "../../utils/helpers";

const MapPolygon: React.FC = () => {
  return (
    <>
      {/* Shadow Polygon (Larger, Semi-transparent) */}
      <Polygon
        paths={polygonCoordinates.map((point) => ({
          lat: point.lat + 0.0001, // Offset for 3D depth
          lng: point.lng + 0.0001,
        }))}
        options={{
          fillColor: "#67b1a4", // Shadow color
          fillOpacity: 0.6,
          strokeColor: "#67b1a4",
          strokeWeight: 4,
          zIndex: 1,
        }}
      />

      {/* Main Polygon */}
      <Polygon
        paths={polygonCoordinates}
        options={{
          fillColor: "linear-gradient(135deg, #67b1a4 50%, #67b1a4 100%)",
          fillOpacity: 0.6,
          strokeColor: "#67b1a4",
          strokeOpacity: 1,
          strokeWeight: 2,
          zIndex: 2,
        }}
      />
    </>
  );
};

export default MapPolygon;
