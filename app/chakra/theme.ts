// 1. Import `extendTheme`
import { extendTheme } from "@chakra-ui/react";

// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme({
  colors: {
    brand: {
      100: "#f7fafc",
      // ...
      900: "#1a202c",
    },
    starNight: {
      dark: "#123f77",
      medium: "#0f86b6",
      light: "#37cae5",
      hover: "#f5db37",
    },
    accent: {
      100: "#37cae5",
    },
  },
});
