import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Button, ToggleButton, ToggleButtonGroup, Card, Col, Row } from "react-bootstrap";
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

import { RiMailLine, RiArrowRightLine } from "react-icons/ri";

const VillaView: React.FC = () => {
  const { clusterId, FloorId } = useParams<{ clusterId: string; FloorId: string }>();
  const navigate = useNavigate();

  const Floors = [
    { value: "GF", key: "groundFloor" },
    { value: "1F", key: "firstFloor" },
    { value: "2F", key: "secondFloor" },
    { value: "RF", key: "Roof" },
  ];

  const defaultSelectedFloor = Floors.find((item) => item.key === FloorId) || Floors[0];
  const [selectedFloor, setSelectedFloor] = useState(defaultSelectedFloor);

  return (
    <>
      <Container fluid className="d-flex justify-content-center align-items-center vh-100">
        {clusterId?.includes("A") &&
          (selectedFloor.key === "groundFloor" ? <AGroundFloor /> :
            selectedFloor.key === "firstFloor" ? <AFirstFloor /> :
              selectedFloor.key === "secondFloor" ? <ASecondFloor /> :
                selectedFloor.key === "Roof" ? <ARoof /> : null)}

        {clusterId?.includes("B") &&
          (selectedFloor.key === "groundFloor" ? <BGroundFloor /> :
            selectedFloor.key === "firstFloor" ? <BFirstFloor /> :
              selectedFloor.key === "secondFloor" ? <BSecondFloor /> :
                selectedFloor.key === "Roof" ? <BRoof /> : null)}

        {clusterId?.includes("T") &&
          (selectedFloor.key === "groundFloor" ? <TWGroundFloor /> :
            selectedFloor.key === "firstFloor" ? <TWFirstFloor /> :
              selectedFloor.key === "secondFloor" ? <TWSecondFloor /> :
                selectedFloor.key === "Roof" ? <TWRoof /> : null)}
      </Container>

      {/* Responsive Floor Selection Card */}
      <Container fluid className="position-fixed top-0 start-0 p-3" style={{ zIndex: 1000 }}>
        <Row className="justify-content-start">
          <Col xs={6} sm={4} md={2} lg={1}>
            <Card className="p-2 bg-dark text-white shadow">
              <Card.Title className="text-center fs-6">Floors</Card.Title>

              {/* Floor Selection Buttons */}
              <ToggleButtonGroup
                type="radio"
                name="floors"
                defaultValue={selectedFloor.key}
                vertical
                className="d-grid gap-2"
              >
                {Floors.map((item) => (
                  <ToggleButton
                    key={item.key}
                    id={`floor-${item.key}`}
                    value={item.key}
                    variant="outline-light"
                    className="w-100 text-center"
                    onChange={() => setSelectedFloor(item)}
                  >
                    {item.value}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>

              {/* Action Buttons */}
              <div className="d-flex justify-content-between mt-3">
                <Button variant="outline-light" className="p-2">
                  <RiMailLine size={18} />
                </Button>
                <Button
                  variant="outline-light"
                  className="p-2"
                  onClick={() => navigate(`/clusterView/${clusterId}/${FloorId}/image`)}
                >
                  <RiArrowRightLine size={18} />
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>

    </>
  );
};

export default VillaView;
