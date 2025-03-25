// src/pages/SpinnerPage.tsx
import React from "react";
import { Box, Spinner, Text } from "@chakra-ui/react";

const SpinnerPage: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bg="gray.100"
    >
      <Spinner size="xl" color="blue.500" />
      <Text fontSize="xl" mt={4} color="gray.700">
        Loading, please wait...
      </Text>
    </Box>
  );
};

export default SpinnerPage;
