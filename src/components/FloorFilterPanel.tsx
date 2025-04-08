import { Button, Form } from "react-bootstrap";

interface Floor {
    value: string;
    key: string;
}

interface FloorFilterPanelProps {
    floors: Floor[];
    selectedKey: string;
    onSelectFloor: (key: string) => void;
    onContactClick: () => void;
    onTourClick: () => void;
}

const FloorFilterPanel: React.FC<FloorFilterPanelProps> = ({
    floors,
    selectedKey,
    onSelectFloor,
    onContactClick,
    onTourClick,
}) => {
    return (
        <div className="floor-filter-panel">
            <Form.Group controlId="floorSelect" className="mb-3">
                <Form.Label className="text-white fw-semibold">Select Floor</Form.Label>
                <Form.Select
                    value={selectedKey}
                    onChange={(e) => onSelectFloor(e.target.value)}
                >
                    {floors.map((floor) => (
                        <option key={floor.key} value={floor.key}>
                            {floor.value}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>

            <div className="d-grid gap-2 mt-3">
                <Button variant="outline-light" onClick={onContactClick}>
                    📩 Contact Us
                </Button>
                <Button variant="outline-warning" onClick={onTourClick}>
                    🎥 Interactive Tour
                </Button>
            </div>
        </div>
    );
};


export default FloorFilterPanel;