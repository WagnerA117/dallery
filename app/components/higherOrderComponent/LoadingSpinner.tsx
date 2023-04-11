import React from "react";

import { Box, Spinner } from "@chakra-ui/react";

const LoadingSpinner: React.FC = () => {
  return (
    <Box display="flex" justifyContent="center" bg="starNight.Dark">
      <Spinner />
    </Box>
  );
};

export default LoadingSpinner;
