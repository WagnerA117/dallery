import { Box, Spinner } from "@chakra-ui/react";
import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <Box display="flex" justifyContent="center" bg="starNight.Dark">
      <Spinner />
    </Box>
  );
};

export default LoadingSpinner;
