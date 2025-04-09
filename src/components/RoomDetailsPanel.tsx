import React from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

interface Room {
    name: string;
    dimensions: string;
}

interface RoomDetailsPanelProps {
    rooms: Room[];
}

const RoomDetailsPanel: React.FC<RoomDetailsPanelProps> = ({ rooms }) => {
    const { clusterId, FloorId } = useParams<{ clusterId: string; FloorId: string }>();
    const navigate = useNavigate();
    return (
        <div className="room-details-panel">
            <Card className="bg-dark text-white shadow-lg rounded-4">
                <Card.Title className="text-center fs-6 p-2">Room Details</Card.Title>
                <ListGroup variant="flush">
                    {rooms.map((room, idx) => (
                        <ListGroup.Item key={idx} className="bg-dark text-white border-secondary">
                            <strong>{room.name}</strong>: {room.dimensions}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                <div className="d-flex flex-row  align-items-center justify-content-around ">
                    <Button
                        variant="outline-light"
                        className=" gap-2 mt-2 mr-2"
                        style={{ fontSize: '10px', marginRight: '5px' }}
                        onClick={() =>
                            navigate(`/clusterView/${clusterId}/${FloorId}/image`)
                        }
                    >
                        Interactive Tour
                    </Button>
                    <Button variant="outline-light" className=" gap-2 mt-2 " style={{ fontSize: '10px'}}>
                        Callback
                    </Button>

                </div>
            </Card>
        </div>
    );
};

export default RoomDetailsPanel;
