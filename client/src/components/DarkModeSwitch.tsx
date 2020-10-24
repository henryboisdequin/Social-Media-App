import { IconButton, useColorMode } from "@chakra-ui/core";

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  // const isDark = colorMode === "dark";
  return (
    // <Switch
    //   height="auto"
    //   color="green"
    //   isChecked={isDark}
    //   onChange={toggleColorMode}
    // />
    <IconButton
      icon={colorMode === "dark" ? "moon" : "sun"}
      aria-label="Toggle color mode"
      onClick={toggleColorMode}
    />
  );
};
