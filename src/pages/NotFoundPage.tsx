import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bg="gray.100"
    >
      <VStack spaceX={6} textAlign="center">
        <Heading fontSize="6xl" fontWeight="bold" color="red.500">
          404
        </Heading>
        <Text fontSize="xl" color="gray.600">
          Oops! The page you’re looking for doesn’t exist.
        </Text>
        <Button
          bg="blue.500" color="white" _hover={{ bg: "blue.600" }}
          size="lg"
          onClick={() => navigate("/")}
        >
          Go Home
        </Button>
      </VStack>
    </Box>
  );
};

export default NotFoundPage;
