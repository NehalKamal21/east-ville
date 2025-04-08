import React, { useState, useRef, useCallback } from "react";
import { GoogleMap } from "@react-google-maps/api";
import MapPolygon from "./MapPolygon";
import MapInfoWindow from "./MapInfoWindow";
import MapPath from "./MapPath";
import { containerStyle, eastVilleLocation, locations } from "../../helpers/helpers";
import MapMarkers from "./MapMarkers";

interface MapContainerProps {
  isLoaded: boolean;
}

const MapContainer: React.FC<MapContainerProps> = ({ isLoaded }) => {
  const [animatedPath, setAnimatedPath] = useState<google.maps.LatLngLiteral[]>([]);
  const animationRef = useRef<number | null>(null);
  const [destination, setDestination] = useState<google.maps.LatLngLiteral | null>(null);
  const [routeDetails, setRouteDetails] = useState<{ distance: string; duration: string; steps: string[] } | null>(null);

  // Function to calculate center
  const calculateCenter = (points: { position: { lat: number; lng: number }, title: string }[]) => {
    const sumLat = points.reduce((acc, loc) => acc + loc.position.lat, 0);
    const sumLng = points.reduce((acc, loc) => acc + loc.position.lng, 0);

    return {
      lat: sumLat / points.length,
      lng: sumLng / points.length,
    };
  };

  const mapCenter = calculateCenter(locations);

  // Function to fetch directions dynamically
  const fetchDirections = useCallback((dest: google.maps.LatLngLiteral) => {
    if (!isLoaded || !window.google) return;

    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin: eastVilleLocation,
        destination: dest,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result?.routes[0]) {
          const routePath = result.routes[0].overview_path.map((point) => ({
            lat: point.lat(),
            lng: point.lng(),
          }));
          animatePolyline(routePath);

          // Extract route details
          const leg = result.routes[0].legs[0];
          setRouteDetails({
            distance: leg.distance?.text || "Unknown",
            duration: leg.duration?.text || "Unknown",
            steps: leg.steps.map((step) => step.instructions), // Extract step-by-step instructions
          });
        } else {
          console.error("Error fetching directions:", status);
        }
      }
    );
  }, [isLoaded]);

  // Function to animate the polyline
  const animatePolyline = (route: google.maps.LatLngLiteral[]) => {
    let index = 0;
    setAnimatedPath([]);
    animationRef.current = null;
    animationRef.current = window.setInterval(() => {
      if (index < route.length) {
        setAnimatedPath((prevPath) => [...prevPath, route[index]]);
        index++;
      } else {
        clearInterval(animationRef.current!);
      }
    }, 10);
  };

  // Handle marker click to change destination
  const handleMarkerClick = (position: google.maps.LatLngLiteral) => {
    setDestination(position);
    fetchDirections(position);
  };

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={mapCenter} zoom={13.5} options={{
      mapTypeId: "satellite", // 🌍 Set map to Satellite mode
      disableDefaultUI: true, // Hides all default controls
      zoomControl: false, // Disables zoom buttons
      mapTypeControl: false, // Disables the map type switcher
      fullscreenControl: false, // Disables fullscreen button
      streetViewControl: false, // Disables Street View
      rotateControl: false, // Disables rotate option
      draggable: false, // Disables dragging
      keyboardShortcuts: false, // Disables keyboard shortcuts
      scrollwheel: false, // Disables zoom on scroll
      gestureHandling: "none", // Disables all gestures
    }}>
      < MapPolygon />
      <MapInfoWindow />
      <MapPath animatedPath={animatedPath} />
      <MapMarkers handleMarkerClick={handleMarkerClick} routeDetails={routeDetails} />
    </GoogleMap >
  );
};

export default MapContainer;
