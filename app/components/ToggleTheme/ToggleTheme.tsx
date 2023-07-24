import { Button } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const ToggleThemeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button onClick={() => toggleColorMode()}>
      {colorMode === "dark" ? (
        <SunIcon color="yellow.300" />
      ) : (
        <MoonIcon color="grey.400" />
      )}
    </Button>
  );
};

export default ToggleThemeButton;
