import React from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import MapContainer from "../components/map/MapContainer";

const GOOGLE_MAPS_API_KEY = 'AIzaSyAL52vLYsvaei_MKXRaRg0aPNLlJyKDGWs';

const GoogleMapWrapper: React.FC = () => {

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  if (!isLoaded) return <p>Loading Google Maps...</p>;

  return <MapContainer isLoaded />;
};

export default GoogleMapWrapper;
