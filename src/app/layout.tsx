"use client";
import { ChakraProvider } from "@chakra-ui/react";
import Header from "./components/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";

import "@rainbow-me/rainbowkit/styles.css";
import { config } from "./config/wagmi";
import theme from "./utils/theme";

interface RootLayoutProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>
              <ChakraProvider theme={theme}>
                <Header />
                {children}
              </ChakraProvider>
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
};

export default RootLayout;
