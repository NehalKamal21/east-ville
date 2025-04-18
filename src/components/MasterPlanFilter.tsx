import React, { useState } from "react";
import { ButtonGroup, ToggleButton, Form, Badge } from "react-bootstrap";

const TYPES = [
  { name: "A", value: "A" },
  { name: "B", value: "B" },
  { name: "TW", value: "TW" }
];

const AREA_BREAKPOINTS = ["< 200 m²", "200 - 300 m²", "> 300 m²"];

interface MasterPlanFilterProps {
  onTypeChange: (type: string) => void;
  onAreaChange: (index: number) => void;
}

const MasterPlanFilter: React.FC<MasterPlanFilterProps> = ({ onTypeChange, onAreaChange }) => {
  const [selectedType, setSelectedType] = useState<string>("");
  const [areaIndex, setAreaIndex] = useState<number>(0);

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
    onTypeChange(value);
    const index = parseInt("-1", 10);
    setAreaIndex(index);
    onAreaChange(index);
  };

  const handleAreaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const index = parseInt(e.target.value, 10);
    setSelectedType("");
    onTypeChange("");

    setAreaIndex(index);
    onAreaChange(index);
  };

  return (
    <div className="masterplan-filter p-3">
      <h6 className="text-white mb-2" style={{fontSize:'12px'}}>Filter by Type</h6>
      <ButtonGroup vertical className="w-100 mb-3">
        {TYPES.map((type) => (
          <ToggleButton
            key={type.value}
            id={`radio-${type.value}`}
            type="radio"
            variant="outline-light"
            name="type"
            value={type.value}
            checked={selectedType === type.value}
            onChange={() => handleTypeChange(type.value)}
            style={{fontSize:'12px'}}
          >
            {type.name}
          </ToggleButton>
        ))}
      </ButtonGroup>

      <h6 className="text-white mb-1" style={{fontSize:'12px'}}>Filter by Area</h6>
      <Form.Range
        min={0}
        max={2}
        step={1}
        value={areaIndex}
        onChange={handleAreaChange}
      />
      <div className="text-center meduim mt-2">
        <Badge bg="light" text="dark">{AREA_BREAKPOINTS[areaIndex]}</Badge>
      </div>
    </div>
  );
};

export default MasterPlanFilter;
