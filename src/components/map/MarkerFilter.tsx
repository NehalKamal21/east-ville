import React, { useState } from "react";
import { Form, Card } from "react-bootstrap";
import { MdSportsHandball, MdOutlineHome, MdSchool } from "react-icons/md";

interface MarkerFilterProps {
  onFilterChange: (selectedTypes: string[]) => void;
}

const filterOptions = [
  { label: "Sports", value: "sports", icon: <MdSportsHandball size={20} /> },
  { label: "Residential", value: "residential", icon: <MdOutlineHome size={20} /> },
  { label: "Education", value: "education", icon: <MdSchool size={20} /> },
];

const MarkerFilter: React.FC<MarkerFilterProps> = ({ onFilterChange }) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>(filterOptions.map((option) => option.value));

  const handleCheckboxChange = (type: string) => {
    setSelectedTypes((prev) => {
      const newSelection = prev.includes(type)
        ? prev.filter((t) => t !== type) // Remove if already selected
        : [...prev, type]; // Add if not selected

      onFilterChange(newSelection);
      return newSelection;
    });
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "10%",
        left: "20px",
        zIndex: 10,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        padding: "16px",
        color: "white",
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
        width: "160px",
      }}
    >
      <h5 className="mb-2">Map Filters</h5>

      <div className="d-flex flex-column">
        <Form.Check // prettier-ignore
          type="switch"
          id="custom-switch"
          label="Select all"
          checked={selectedTypes.length === 3}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedTypes(filterOptions.map((option) => option.value));
              onFilterChange(filterOptions.map((option) => option.value));
            }

          }}
        />
        {filterOptions.map((option) => (
          <Card key={option.value} className="mb-2 p-2 bg-dark text-light">
            <Form.Check
              type="checkbox"
              id={option.value}
              label={
                <span>
                  {option.icon} {option.label}
                </span>
              }
              checked={selectedTypes.includes(option.value)}
              onChange={() => handleCheckboxChange(option.value)}
            />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MarkerFilter;
