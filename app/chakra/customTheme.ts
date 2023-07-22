import { extendTheme } from "@chakra-ui/react";

export const customTheme = extendTheme({
  colors: {
    brand: {
      100: "#f7fafc",
      // ...
      900: "#1a202c",
    },
    starNight: {
      dark: "#2B41A7",
      dark2: "#1F2E7B",
      dark3: "#1A2569",
      medium: "#0f86b6",
      light: "#6283C8",
      accent: "#C7AD24",
      hover: "#CCC776",
    },
    accent: {
      100: "#37cae5",
    },
  },
  components: {
    Button: {
      baseStyle: {
        // Update the background color here
        bg: "blue.500", // Example color (blue)
      },
    },
  },

  //styles: {
  //  global: (props: { colorMode: string }) => ({
  //    body: {
  //      bg: props.colorMode === "dark" ? "starNight.dark2" : "starNight.light",
  //    },
  //  }),
  //},
});
