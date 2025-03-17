import { DirectionsRenderer, useJsApiLoader } from "@react-google-maps/api";
import { useState, useCallback, useEffect } from "react";

const AlahlyClub: google.maps.LatLngLiteral = {
    lat: 30.03999123502394,
    lng: 31.55446235716312
};

const EastVilleLocation: google.maps.LatLngLiteral = {
    lat: 30.0445713211344,
    lng: 31.573031605237734,
};

interface GoogleMapNavigationProps {
    isLoaded: boolean;
}

const GoogleMapNavigation: React.FC<GoogleMapNavigationProps> = ({ isLoaded }) => {
    const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);




    // Function to fetch directions
    const fetchDirections = useCallback(() => {
        if (!isLoaded || !window.google || !window.google.maps) return;

        const directionsService = new google.maps.DirectionsService(); // ✅ No more "undefined" error
        directionsService.route(
            {
                origin: EastVilleLocation,
                destination: AlahlyClub,
                travelMode: google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    setDirectionsResponse(result);
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

    return (
        <>
            {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}

        </>
    )

};

export default GoogleMapNavigation;