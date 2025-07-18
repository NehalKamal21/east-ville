import React, { useState, useRef, useCallback, useMemo } from "react";
import { GoogleMap } from "@react-google-maps/api";
import MapPolygon from "./MapPolygon";
import MapInfoWindow from "./MapInfoWindow";
import MapPath from "./MapPath";
import { containerStyle, eastVilleLocation, locations } from "../../utils/helpers";
import MapMarkers from "./MapMarkers";
import "../../styles/main.scss";

interface MapContainerProps {
  isLoaded: boolean;
}

const MapContainer: React.FC<MapContainerProps> = ({ isLoaded }) => {
  const [animatedPath, setAnimatedPath] = useState<google.maps.LatLngLiteral[]>([]);
  const animationRef = useRef<number | null>(null);
  // @ts-ignore
  const [destination, setDestination] = useState<google.maps.LatLngLiteral | null>(null);
  const [routeDetails, setRouteDetails] = useState<{ distance: string; duration: string; steps: string[] } | null>(null);

  // Memoize map center calculation to prevent recalculation on every render
  const mapCenter = useMemo(() => {
    const sumLat = locations.reduce((acc, loc) => acc + loc.position.lat, 0);
    const sumLng = locations.reduce((acc, loc) => acc + loc.position.lng, 0);

    return {
      lat: sumLat / locations.length,
      lng: sumLng / locations.length,
    };
  }, []);

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
            steps: leg.steps.map((step) => step.instructions),
          });
        } else {
          console.error("Error fetching directions:", status);
        }
      }
    );
  }, [isLoaded]);

  // Function to animate the polyline
  const animatePolyline = useCallback((route: google.maps.LatLngLiteral[]) => {
    let index = 0;
    setAnimatedPath([]);
    if (animationRef.current) {
      clearInterval(animationRef.current);
    }
    animationRef.current = window.setInterval(() => {
      if (index < route.length) {
        setAnimatedPath((prevPath) => [...prevPath, route[index]]);
        index++;
      } else {
        if (animationRef.current) {
          clearInterval(animationRef.current);
          animationRef.current = null;
        }
      }
    }, 10);
  }, []);

  // Handle marker click to change destination
  const handleMarkerClick = useCallback((position: google.maps.LatLngLiteral) => {
    setDestination(position);
    fetchDirections(position);
  }, [fetchDirections]);

  // Memoize map options to prevent recreation on every render
  const mapOptions = useMemo(() => ({
    mapTypeId: "roadmap",
    disableDefaultUI: true,
    zoomControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
    streetViewControl: false,
    rotateControl: false,
    draggable: false,
    keyboardShortcuts: false,
    scrollwheel: false,
    gestureHandling: "none" as const,
  }), []);

  return (
    <div className="map-container">
      <GoogleMap 
        mapContainerStyle={containerStyle} 
        center={mapCenter} 
        zoom={13.5} 
        options={mapOptions}
      >
        <MapPolygon />
        <MapInfoWindow />
        <MapPath animatedPath={animatedPath} />
        <MapMarkers handleMarkerClick={handleMarkerClick} routeDetails={routeDetails} />
      </GoogleMap>
    </div>
  );
};

export default MapContainer;
