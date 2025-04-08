import React from "react";
import { InfoWindow, Marker } from "@react-google-maps/api";
import logo from "../../assets/ajna.webp";
import { eastVilleLocation } from "../../helpers/helpers";

const MapInfoWindow: React.FC = () => {
  return (
    <>
      <Marker key={eastVilleLocation.lat} position={eastVilleLocation} title="Ajna" />

      <InfoWindow
        position={{
          lat: eastVilleLocation.lat + 0.005, // Slightly move up
          lng: eastVilleLocation.lng,
        }}
      >
        <div
          className="p-3 bg-white text-center rounded shadow"
          style={{ maxWidth: "220px", cursor: "pointer" }}
          onClick={() => (window.location.href = "/master-plan")}
        >
          <img src={logo} alt="Ajna" className="img-fluid" style={{ maxWidth: '150px' }} />
        </div>
      </InfoWindow>
    </>
  );
};

export default MapInfoWindow;
