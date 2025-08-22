import React, { useState } from "react";
import { ButtonGroup, ToggleButton, Form, Badge } from "react-bootstrap";

const TYPES = [
  { name: "A", value: "A" },
  { name: "B", value: "B" },
  { name: "T", value: "T" },
] as const;

// Slider indices: 0=All, 1=<130, 2=130–230, 3=>230
const AREA_LABELS = ["All areas", "< 130 m²", "130 – 230 m²", "> 230 m²"] as const;

interface MasterPlanFilterProps {
  onTypeChange: (type: string) => void;
  onAreaChange: (index: number) => void; // -1 = All, 0..2 = buckets
}

const MasterPlanFilter: React.FC<MasterPlanFilterProps> = ({ onTypeChange, onAreaChange }) => {
  const [selectedType, setSelectedType] = useState<string>("");
  const [areaIndex, setAreaIndex] = useState<number>(0); // 0 = All (slider-safe)

  const handleTypeChange = (value: string) => {
    const next = selectedType === value ? "" : value; // allow deselect
    setSelectedType(next);
    onTypeChange(next);

    // When a type is chosen, reset area to "All"
    setAreaIndex(0);
    onAreaChange(-1); // keep parent contract (-1 = All)
  };

  const handleAreaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const idx = parseInt(e.target.value, 10);
    setAreaIndex(idx);

    // Clear type when area is chosen (mutually exclusive)
    if (selectedType) {
      setSelectedType("");
      onTypeChange("");
    }

    // Map 0..3 (slider) -> -1,0,1,2 (parent)
    const mapped = idx === 0 ? -1 : idx - 1;
    onAreaChange(mapped);
  };

  return (
    <div className="masterplan-filter p-3">
      <h6 className="text-white mb-2" style={{ fontSize: "12px" }}>
        Filter by Type
      </h6>

      <ButtonGroup className="w-100 mb-3">
        {TYPES.map((type) => (
          <ToggleButton
            key={type.value}
            id={`radio-${type.value}`}
            type="button"
            variant={selectedType === type.value ? "light" : "outline-light"}
            name="type"
            value={type.value}
            checked={selectedType === type.value}
            onClick={() => handleTypeChange(type.value)}
            className="px-3 py-2"
            style={{ fontSize: "12px", borderRadius: 9999, backgroundColor: selectedType === type.value ? "#ffffff" : "transparent",
              color: selectedType === type.value ? "#000000" : "#ffffff",
              border: selectedType === type.value ? "2px solid #ffffff" : "1px solid #ffffff",
              boxShadow: selectedType === type.value ? "0 0 6px rgba(255,255,255,0.7)" : "none", }}
          >
            {type.name}
          </ToggleButton>
        ))}
      </ButtonGroup>

      <h6 className="text-white mb-1" style={{ fontSize: "12px" }}>
        Filter by Area
      </h6>

      {/* Mobile-friendly slider: bigger touch area, discrete steps */}
      <Form.Range
        min={0}
        max={3}
        step={1}
        value={areaIndex}
        onChange={handleAreaChange}
        style={{ height: "2rem" }}
        aria-label="Area range"
      />

      <div className="text-center mt-3">
        <Badge bg="light" text="dark" style={{ fontSize: "12px" }}>
          {selectedType ? `Type: ${selectedType}` : AREA_LABELS[areaIndex]}
        </Badge>
      </div>
    </div>
  );
};

export default MasterPlanFilter;
