import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { RiMapPinLine } from "react-icons/ri";

const LocationButton: React.FC = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/map');
    };

    return (
        <Button
            variant="primary"
            onClick={handleClick}
            className="location-button"
            aria-label="View Map"
        >
            <RiMapPinLine size={24} />
        </Button>
    );
};

export default LocationButton; 