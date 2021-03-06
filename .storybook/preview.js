import { MockedProvider } from "@apollo/client/testing";
import {
  ChakraProvider,
  Flex,
  IconButton,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import "@fontsource/lexend/latin.css";
import { FaMoon, FaSun } from "react-icons/fa";
import { ModalProvider } from "shared";
import customTheme from "styles/customTheme";

const ColorModeToggleBar = () => {
  const { toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  const nextMode = useColorModeValue("dark", "light");

  return (
    <Flex justify="flex-end" mb={4}>
      <IconButton
        size="md"
        fontSize="lg"
        aria-label={`Switch to ${nextMode} mode`}
        variant="ghost"
        color="current"
        marginLeft="2"
        onClick={toggleColorMode}
        icon={<SwitchIcon />}
      />
    </Flex>
  );
};

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <MockedProvider>
      <ChakraProvider theme={customTheme}>
        <ColorModeToggleBar />
        <ModalProvider>
          <Story />
        </ModalProvider>
      </ChakraProvider>
    </MockedProvider>
  ),
];
