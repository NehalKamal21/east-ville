import React from "react";
import { Polygon } from "@react-google-maps/api";
import { polygonCoordinates } from "../../helpers/helpers";

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
          fillColor: "rgba(0, 0, 0, 0.2)", // Shadow color
          fillOpacity: 0.4,
          strokeColor: "rgba(0, 0, 0, 0.4)",
          strokeWeight: 4,
          zIndex: 1,
        }}
      />

      {/* Main Polygon */}
      <Polygon
        paths={polygonCoordinates}
        options={{
          fillColor: "linear-gradient(135deg, #00FF00 50%, #158000 100%)",
          fillOpacity: 0.6,
          strokeColor: "#158000",
          strokeOpacity: 1,
          strokeWeight: 2,
          zIndex: 2,
        }}
      />
    </>
  );
};

export default MapPolygon;
