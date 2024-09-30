import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    customOrange: "#FF684B",
  },
  styles: {
    global: {
      body: {
        bg: "#fff8f3",
        color: "black",
        fontFamily: "Arial, sans-serif",
      },
    },
  },
  components: {
    Button: {
      sizes: {
        smd: {
          fontSize: "sm",
          px: 4,
          py: 2,
        },
      },
      variants: {
        custom: {
          bg: "customOrange",
          color: "white",
          _hover: {
            bg: "orange.600",
          },
        },
      },
    },
  },
});

export default theme;
