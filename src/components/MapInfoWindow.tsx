import React from "react";
import { InfoWindow, Marker } from "@react-google-maps/api";
import { Box, Image } from "@chakra-ui/react";
import logo from "../assets/ajna.webp";
import { eastVilleLocation } from "./helpers";

const MapInfoWindow: React.FC = () => {
  return (
    <>
      <Marker
        key={eastVilleLocation.lat}
        position={eastVilleLocation}
        title={'Ajna'}
      />
      <InfoWindow
        position={{
          lat: eastVilleLocation.lat + 0.005, // Slightly move up
          lng: eastVilleLocation.lng,
        }}>
        <Box color="white" p={6} borderRadius={15} background={'white'} textAlign="center" maxW="220px">
          <Image src={logo} alt="Ajna" width="100%" fit="contain" />
        </Box>
      </InfoWindow>
    </>
  );
};

export default MapInfoWindow;
