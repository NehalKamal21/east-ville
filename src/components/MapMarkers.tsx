import React, { useState } from "react";
import { Marker, InfoWindow } from "@react-google-maps/api";
import { Box, Text, Flex } from "@chakra-ui/react";
import { FaEllipsisV } from "react-icons/fa";
import { locations } from "./helpers";
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

    const icon = document.createElement('div');
    icon.innerHTML = '<i class="fa fa-pizza-slice fa-lg"></i>';
    // Define or import PinElement if it is from a library
    // const faPin = new PinElement({
    //     glyph: icon,
    //     glyphColor: '#ff8300',
    //     background: '#FFD514',
    //     borderColor: '#ff8300',
    // });

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
                    onClick={() => { handleMarkerClick(loc.position); setSelectedMarker(loc) }}
                />
            ))}

            {selectedMarker && (
                <InfoWindow
                    position={{
                        lat: selectedMarker.position.lat, // Slightly move up
                        lng: selectedMarker.position.lng,
                    }}
                    onCloseClick={() => setSelectedMarker(null)}
                    options={{ pixelOffset: new window.google.maps.Size(0, -30) }} // Shift visually upwards
                >

                    <Box
                        bg="blackAlpha.600" // Semi-transparent black
                        color="white"
                        p={3}
                        borderRadius="md"
                        textAlign="center"
                        width="240px"
                    >
                        <Flex verticalAlign="center" >
                            <Box >
                                <FaEllipsisV size={40} fontSize={'md'} />
                            </Box>
                            <Box width={'100%'}>

                                <Text fontSize="md" fontWeight="bold">
                                    EastVille
                                </Text>
                                <Flex justifyContent="space-around">
                                    <Text fontSize="sm" fontWeight="light">
                                        {routeDetails?.distance}
                                    </Text>
                                    <Text fontSize="sm" fontWeight="light">
                                        {routeDetails?.duration}
                                    </Text>
                                </Flex>
                                <Text fontSize="md" fontWeight="bold">
                                    {selectedMarker.title}
                                </Text>
                            </Box>
                        </Flex>
                    </Box>

                </InfoWindow>
            )}
        </>
    );
};

export default MapMarkers;
