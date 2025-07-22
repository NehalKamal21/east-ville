import React, { useMemo } from "react";
import { InfoWindow, Marker } from "@react-google-maps/api";
import logo from "../../assets/ajna.webp";
import { eastVilleLocation } from  "../../utils/helpers";

const MapInfoWindow: React.FC = () => {
  // Create marker icon using the same Flaticon pin
  const markerIcon = useMemo(() => {
    if (typeof google === 'undefined') {
      return undefined;
    }

    return {
      url: '/map-pin-icon.png',
      scaledSize: new google.maps.Size(60, 60),
      anchor: new google.maps.Point(20, 40), // Anchor at bottom center of pin
    };
  }, []);

  return (
    <>
      {/* <Marker 
        key={eastVilleLocation.lat} 
        position={eastVilleLocation} 
        title="Ajna"
        icon={markerIcon}
      /> */}

      <InfoWindow
        position={{
          lat: eastVilleLocation.lat + 0.005, // Slightly move up
          lng: eastVilleLocation.lng,
        }}
      >
        <div
          className="p-3 bg-white text-center rounded shadow"
          style={{ maxWidth: "220px", cursor: "pointer" }}
          onClick={() => (window.location.href = "/")}
        >
          <img src={logo} alt="Ajna" className="img-fluid" style={{ maxWidth: '150px' }} />
        </div>
      </InfoWindow>
    </>
  );
};

export default MapInfoWindow;
