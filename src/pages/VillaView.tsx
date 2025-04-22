// TODO: Define proper props interface
import React, { JSX, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  ToggleButton,
  ToggleButtonGroup,
  Card,
} from "react-bootstrap";

import RoomDetailsPanel from "../components/RoomDetailsPanel";
import { villaDetails } from "../utils/villaDetails"; // Adjust the import path as necessary
import { renderSVG } from "../utils/renderSVG";

const Floors = [
  { value: "GF", key: "groundFloor" },
  { value: "1F", key: "firstFloor" },
  { value: "2F", key: "secondFloor" },
  { value: "RF", key: "Roof" },
];


const VillaView: React.FC = () => {
  const { clusterId, FloorId } = useParams<{ clusterId: string; FloorId: string }>();
  const navigate = useNavigate();

  const [rooms, setRooms] = useState<{ name: string; dimensions: string }[]>([]);
  const defaultSelected = Floors.find((f) => f.key === FloorId) || Floors[0];
  const [selectedFloor, setSelectedFloor] = useState(defaultSelected);

  useEffect(() => {
    const prefix = clusterId?.startsWith("A")
      ? "A"
      : clusterId?.startsWith("B")
        ? "B"
        : clusterId?.startsWith("T")
          ? "TW"
          : "";
    getRoomsData(prefix, selectedFloor);
  }, [clusterId, selectedFloor]);

  const getRoomsData = (clusterId: string | number, selectedFloor: { key: string | number; }) => {

    const cluster = villaDetails[clusterId as keyof typeof villaDetails];
    if (!cluster) {
      console.error("Cluster not found");
      return;
    }

    const floorData = cluster[selectedFloor.key as keyof typeof cluster];
    if (!floorData) {
      console.error("Floor data not found");
      return;
    }

    setRooms(floorData.map(room => ({ ...room, dimensions: room.dimensions || "N/A" })));

  }

  useEffect(() => {
    localStorage.setItem("rooms", JSON.stringify(rooms));
  }, [rooms])

  return (
    <>
      {/* SVG Viewer Fullscreen */}
      <Container fluid className="d-flex flex-row justify-content-center align-items-center vh-100">
        <div>{renderSVG(clusterId || "", selectedFloor)}</div>
        <div style={{ position: "fixed", top: "10%", left: "20px", zIndex: 999 }}>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <RoomDetailsPanel rooms={rooms} />

            {/* Sticky Floor Filter Panel */}
            <div className="floor-panel-container mt-2">
              <Card className="p-3 bg-dark text-white shadow-lg rounded-4">
                <Card.Title className="text-center fs-6">Floors</Card.Title>

                <ToggleButtonGroup
                  type="radio"
                  name="floors"
                  value={selectedFloor.key}
                >
                  {Floors.map((floor) => (
                    <ToggleButton
                      key={floor.key}
                      id={`floor-${floor.key}`}
                      value={floor.key}
                      variant="outline-light"
                      className="text-center"
                      onClick={() => { setSelectedFloor(floor); navigate(`/clusterView/${clusterId}/${floor.key}`) }}
                    >
                      {floor.value}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </Card>
            </div>
          </div>
        </div>
      </Container >

    </>
  );
};

export default VillaView;
