import React, { useCallback, useEffect, useRef, useState } from "react";
import { GoogleMap, InfoWindow, Polygon, Polyline, useJsApiLoader } from "@react-google-maps/api";
import { Box, Text, Heading, Image } from "@chakra-ui/react";
import logo from './assets/ajna.webp';

const containerStyle: React.CSSProperties = {
    width: "100%",
    height: "100vh",
};

const center: google.maps.LatLngLiteral = {
    lat: 30.0445713211344,
    lng: 31.573031605237734,
};

const AlahlyClub: google.maps.LatLngLiteral = {
    lat: 30.03999123502394,
    lng: 31.55446235716312
};

const infoWindowPosition: google.maps.LatLngLiteral = {
    lat: 30.04620586690839,
    lng: 31.572817028510652,
}
// Define the polygon coordinates
const polygonCoordinates: google.maps.LatLngLiteral[] = [
    { lat: 30.04645, lng: 31.57102 },
    { lat: 30.04618, lng: 31.57436 },
    { lat: 30.04294, lng: 31.57501 },
    { lat: 30.03946, lng: 31.57583 },
    { lat: 30.03952, lng: 31.5737 },
    { lat: 30.0395, lng: 31.57049 },
    { lat: 30.04289, lng: 31.57105 },
];

// Define polygon options (color, stroke, etc.)
const polygonOptions: google.maps.PolygonOptions = {
    fillColor: "lightblue",
    fillOpacity: 0.4,
    strokeColor: "blue",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    clickable: true,
    draggable: false,
    editable: false, // Allows users to edit the polygon
    geodesic: false,
};
const GoogleMapComponent: React.FC = () => {

    // const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);
    const [markerPosition, setMarkerPosition] = useState<google.maps.LatLngLiteral | null>(null);
    const [fullPath, setFullPath] = useState<google.maps.LatLngLiteral[]>([]);
    const [animatedPath, setAnimatedPath] = useState<google.maps.LatLngLiteral[]>([]);
    const animationRef = useRef<number | null>(null);

    // ✅ Load Google Maps API before calling DirectionsService
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyAL52vLYsvaei_MKXRaRg0aPNLlJyKDGWs',
        libraries: ["places"],
    });

    // Function to fetch directions
    const fetchDirections = useCallback(() => {
        if (!isLoaded || !window.google || !window.google.maps) return;

        const directionsService = new google.maps.DirectionsService(); // ✅ No more "undefined" error
        directionsService.route(
            {
                origin: center,
                destination: AlahlyClub,
                travelMode: google.maps.TravelMode.WALKING,
            },
            (result, status) => {
                if (status === google.maps.DirectionsStatus.OK && result?.routes[0]) {
                    const routePath = result.routes[0].overview_path.map((point) => ({
                        lat: point.lat(),
                        lng: point.lng(),
                    }));
                    setFullPath(routePath);
                    animatePolyline(routePath);
                } else {
                    console.error("Error fetching directions:", status);
                }
            }
        );
    }, [isLoaded]);

    // Fetch directions only when API is loaded
    useEffect(() => {
        if (isLoaded) {
            fetchDirections();
        }
    }, [isLoaded, fetchDirections]);

    if (!isLoaded) {
        return <p>Loading Google Maps...</p>;
    }
    // Function to animate the polyline

    const animatePolyline = (route: google.maps.LatLngLiteral[]) => {
        let index = 0;
        setAnimatedPath([]); // Reset path

        animationRef.current = window.setInterval(() => {
            if (index < route.length) {
                setAnimatedPath((prevPath) => [...prevPath, route[index]]);
                index++;
            } else {
                clearInterval(animationRef.current!);
            }
        }, 100); // Adjust speed (100ms per step)
    };

    return (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14} options={{
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
        }} >
            {/* <Marker position={center} /> */}
            <Polygon paths={polygonCoordinates} options={polygonOptions} />
            <InfoWindow position={infoWindowPosition} >
                <Box
                    color="white"
                    // p={4}
                    // borderRadius="lg"
                    textAlign="center"
                    // boxShadow="lg"
                    maxW="220px"
                    position="relative"
                >
                    <Image src={logo} alt="Ajna" width={"100%"} fit="contain" />
                </Box>
            </InfoWindow>

            {/* Draw polyline path */}
            {animatedPath.length > 0 && (
                <Polyline path={animatedPath} options={{ strokeColor: "blue", strokeWeight: 2 }} />
            )}

        </GoogleMap>
    );
};

export default GoogleMapComponent;
