import React, { useState } from "react";
import { Marker, InfoWindow } from "@react-google-maps/api";
import { FaEllipsisV } from "react-icons/fa";
import { locations } from "../../helpers/helpers";
import MarkerFilter from "./MarkerFilter";

interface MapMarkersProps {
    handleMarkerClick: (position: google.maps.LatLngLiteral) => void;
    routeDetails: { distance: string; duration: string; steps: string[] } | null;
}

const MapMarkers: React.FC<MapMarkersProps> = ({ handleMarkerClick, routeDetails }) => {
    const [filteredTypes, setFilteredTypes] = useState<string[]>([]);
    
    interface MarkerType {
        position: google.maps.LatLngLiteral;
        title: string;
        type: string;
    }

    const [selectedMarker, setSelectedMarker] = useState<MarkerType | null>(null);

    const filteredMarkers = filteredTypes.length > 0
        ? locations.filter((marker) => filteredTypes.includes(marker.type))
        : locations; // Show all markers if no filter is selected

    return (
        <>
            <MarkerFilter onFilterChange={(type: any) => setFilteredTypes(type)} />

            {filteredMarkers.map((loc, index) => (
                <Marker
                    key={index}
                    position={loc.position}
                    title={loc.title}
                    onClick={() => {
                        handleMarkerClick(loc.position);
                        setSelectedMarker(loc);
                    }}
                />
            ))}

            {selectedMarker && (
                <InfoWindow
                    position={{
                        lat: selectedMarker.position.lat,
                        lng: selectedMarker.position.lng,
                    }}
                    onCloseClick={() => setSelectedMarker(null)}
                    options={{ pixelOffset: new window.google.maps.Size(0, -30) }} // Shift visually upwards
                >
                    <div
                        className="p-3 bg-dark bg-opacity-75 text-white rounded text-center"
                        style={{ width: "240px" }}
                    >
                        <div className="d-flex align-items-center">
                            <div className="me-2">
                                <FaEllipsisV size={40} />
                            </div>
                            <div className="w-100">
                                <h6 className="fw-bold">EastVille</h6>
                                <div className="d-flex justify-content-between">
                                    <small className="text-light">{routeDetails?.distance}</small>
                                    <small className="text-light">{routeDetails?.duration}</small>
                                </div>
                                <h6 className="fw-bold mt-1">{selectedMarker.title}</h6>
                            </div>
                        </div>
                    </div>
                </InfoWindow>
            )}
        </>
    );
};

export default MapMarkers;
