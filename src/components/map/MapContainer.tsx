import React, { useState, useRef, useCallback, useMemo, useEffect } from "react";
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
  const mapRef = useRef<google.maps.Map | null>(null);

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

  // Function to center the map on East Ville location
  const centerMap = useCallback(() => {
    
    if (mapRef.current) {
      try {
        // Use eastVilleLocation if available, otherwise use mapCenter as fallback
        const centerLocation = eastVilleLocation || mapCenter;
        
        mapRef.current.panTo(centerLocation);
        mapRef.current.setZoom(13.5);
      } catch (error) {
        console.error('Error centering map:', error);
      }
    } else {
      console.error('Map reference is null');
    }
  }, [mapCenter]);

  // Function to handle map load
  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  // Alternative approach: use onLoad with proper typing
  const handleMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  // Direct function approach
  const onMapLoadDirect = (map: google.maps.Map) => {
    mapRef.current = map;
  };

  // Monitor map reference
  useEffect(() => {
    // Check if map loads after a delay
    const timer = setTimeout(() => {
      if (!mapRef.current) {
        // Map still not loaded after timeout
      }
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [mapRef.current]);

  // Memoize map options to prevent recreation on every render
  const mapOptions = useMemo(() => ({
    mapTypeId: "satellite",
    disableDefaultUI: true,
    zoomControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
    streetViewControl: false,
    rotateControl: false,
    draggable: true,
    keyboardShortcuts: false,
    scrollwheel: false,
    gestureHandling: "auto" as const,
  }), []);

  return (
    <div className="map-container">
      <GoogleMap 
        mapContainerStyle={containerStyle} 
        center={mapCenter} 
        zoom={13.5} 
        options={mapOptions}
        onLoad={onMapLoadDirect}
        onUnmount={() => {
          mapRef.current = null;
        }}
      >
        <MapPolygon />
        <MapInfoWindow />
        <MapPath animatedPath={animatedPath} />
        <MapMarkers handleMarkerClick={handleMarkerClick} routeDetails={routeDetails} />
      </GoogleMap>
      
      {/* Center Button */}
      <button
        onClick={centerMap}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          backgroundColor: 'white',
          border: '2px solid #ccc',
          borderRadius: '8px',
          padding: '12px',
          cursor: 'pointer',
          boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: '44px',
          minHeight: '44px',
          transition: 'all 0.2s ease'
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = 'scale(0.95)';
          e.currentTarget.style.backgroundColor = '#f0f0f0';
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.backgroundColor = 'white';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.backgroundColor = 'white';
        }}
        title="Center on East Ville"
      >
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
        </svg>
      </button>
    </div>
  );
};

export default MapContainer;
