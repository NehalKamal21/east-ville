// TODO: Define proper props interface
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

import RoomDetailsPanel from "../components/RoomDetailsPanel";
import { villaDetails } from "../utils/villaDetails";
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
  const defaultSelected = useMemo(() =>
    Floors.find((f) => f.key === FloorId) || Floors[0],
    [FloorId]
  );
  const [selectedFloor, setSelectedFloor] = useState(defaultSelected);

  // Memoize cluster prefix calculation
  const clusterPrefix = useMemo(() => {
    if (clusterId?.startsWith("A")) return "A";
    if (clusterId?.startsWith("B")) return "B";
    if (clusterId?.startsWith("T")) return "TW";
    return "";
  }, [clusterId]);

  // Memoize rooms data processing
  const getRoomsData = useCallback((clusterId: string | number, selectedFloor: { key: string | number; }) => {
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
  }, []);

  useEffect(() => {
    if (clusterPrefix) {
      getRoomsData(clusterPrefix, selectedFloor);
    }
  }, [clusterId, selectedFloor, clusterPrefix, getRoomsData]);

  useEffect(() => {
    // Only store rooms data if it's not empty to minimize storage usage
    if (rooms.length > 0) {
      localStorage.setItem("rooms", JSON.stringify(rooms));
    } else {
      localStorage.removeItem("rooms");
    }
  }, [rooms]);

  // Memoize floor navigation handler
  const handleFloorChange = useCallback((floor: typeof Floors[0]) => {
    setSelectedFloor(floor);
    navigate(`/clusterView/${clusterId}/${floor.key}`);
  }, [clusterId, navigate]);

  return (
    <>
      <div className="container-fluid d-flex flex-row justify-content-center align-items-center vh-100 p-0">
        <div className="fullScreen">{renderSVG(clusterId || "", selectedFloor)}</div>
        <div style={{ position: "fixed", top: "10%", left: "20px", zIndex: 999 }}>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <RoomDetailsPanel rooms={rooms} />


          </div>
          <div className="floor-panel-container mt-2">
            <div className="card p-3 bg-dark text-white shadow-lg rounded-4">
              <h6 className="card-title text-center fs-6">Floors</h6>

              <div className="btn-group floor-toggle-group" role="group" aria-label="Floor selection">
                {Floors.map((floor) => (
                  <button
                    key={floor.key}
                    id={`floor-${floor.key}`}
                    type="button"
                    className={`btn floor-toggle-button ${selectedFloor.key === floor.key ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => handleFloorChange(floor)}
                  >
                    {floor.value}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VillaView;
