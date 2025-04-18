// TODO: Define proper props interface
import React from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import MapContainer from "../components/map/MapContainer";

const GOOGLE_MAPS_API_KEY = 'AIzaSyD-S37CD9We5WgqiDCNrS6ZjBirzZk4k2U';

const GoogleMapWrapper: React.FC = () => {

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: ["places", "maps"],
  });

  if (!isLoaded) return <p>Loading Google Maps...</p>;

  return <MapContainer isLoaded />;
};

export default GoogleMapWrapper;
