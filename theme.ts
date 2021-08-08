import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "Poppins",
    body: "Poppins",
  },
  colors: {
    brand: {
      dark: "#0B0C10",
      white: "#C5C6C7",
      darkblue: "#1F2833"
    },
  },
});
export default theme;
