// TODO: Define proper props interface
import React, { JSX, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  ToggleButton,
  ToggleButtonGroup,
  Card,
} from "react-bootstrap";
import AGroundFloor from "../SVGs/ClusterA/AGroundFloor";
import AFirstFloor from "../SVGs/ClusterA/AFirstFloor";
import ASecondFloor from "../SVGs/ClusterA/ASecondFloor";
import ARoof from "../SVGs/ClusterA/ARoof";

import BGroundFloor from "../SVGs/ClusterB/BGroundFloor";
import BFirstFloor from "../SVGs/ClusterB/BFirstFloor";
import BSecondFloor from "../SVGs/ClusterB/BSecondFloor";
import BRoof from "../SVGs/ClusterB/BRoof";

import TWGroundFloor from "../SVGs/ClusterTW/TWGroundFloor";
import TWFirstFloor from "../SVGs/ClusterTW/TWFirstFloor";
import TWSecondFloor from "../SVGs/ClusterTW/TWSecondFloor";
import TWRoof from "../SVGs/ClusterTW/TWRoof";
import RoomDetailsPanel from "../components/RoomDetailsPanel";
import { villaDetails } from "../utils/villaDetails"; // Adjust the import path as necessary


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

  const renderSVG = () => {
    const map: Record<string, JSX.Element> = {
      AGroundFloor: <AGroundFloor />,
      AFirstFloor: <AFirstFloor />,
      ASecondFloor: <ASecondFloor />,
      ARoof: <ARoof />,
      BGroundFloor: <BGroundFloor />,
      BFirstFloor: <BFirstFloor />,
      BSecondFloor: <BSecondFloor />,
      BRoof: <BRoof />,
      TWGroundFloor: <TWGroundFloor />,
      TWFirstFloor: <TWFirstFloor />,
      TWSecondFloor: <TWSecondFloor />,
      TWRoof: <TWRoof />,
    };

    const prefix = clusterId?.startsWith("A")
      ? "A"
      : clusterId?.startsWith("B")
        ? "B"
        : clusterId?.startsWith("T")
          ? "TW"
          : "";
    return map[`${prefix}${capitalize(selectedFloor.key)}`] || null;
  };


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
    console.log(clusterId, selectedFloor);

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


  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <>
      {/* SVG Viewer Fullscreen */}
      <Container fluid className="d-flex flex-row justify-content-center align-items-center vh-100">
        <div>{renderSVG()}</div>
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
