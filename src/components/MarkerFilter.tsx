import React, { useState } from "react";
import { Box, CheckboxCard, For, Heading, Stack } from "@chakra-ui/react"
import { MdSportsHandball, MdOutlineHome, MdSchool } from "react-icons/md";


interface MarkerFilterProps {
  onFilterChange: (selectedTypes: string[]) => void;
}

const filterOptions = [
  { label: "Sports", value: "sports", style: "surface", icon: <MdSportsHandball size={20} /> },
  { label: "Residential", value: "residential", style: "surface", icon: <MdOutlineHome size={20}/> },
  { label: "Education", value: "education", style: "surface", icon: <MdSchool size={20} /> },
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
    <Box
      position="absolute"
      top="20px"
      left="20px"
      zIndex="10"
      bg="blackAlpha.600"
      p="4"
      color={"white"}
      borderRadius="md"
      boxShadow="lg"
      width="160px"
    >
      <Heading fontSize="md" mb="2">
        Map Filters
      </Heading>

      <Stack maxW="320px">
        <For each={filterOptions}>
          {(variant) => (
            <CheckboxCard.Root
              defaultChecked
              key={variant.label}
              variant="surface"
              colorPalette="blue"
              onChange={() => handleCheckboxChange(variant.value)}
            >
              <CheckboxCard.HiddenInput />
              <CheckboxCard.Control>
                <CheckboxCard.Label> {variant.icon} {variant.label}</CheckboxCard.Label>
              </CheckboxCard.Control>
            </CheckboxCard.Root>
          )}
        </For>
      </Stack>
    </Box>
  );
};

export default MarkerFilter;
