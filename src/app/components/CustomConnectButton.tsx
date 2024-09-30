import { Button, useBreakpointValue } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const CustomConnectButton = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    onClick={openConnectModal}
                    type="button"
                    bg={"#FEEFDD"}
                    _hover={{ background: "#EADBCD" }}
                    height={!isMobile ? "38px" : "35px"}
                    size={!isMobile ? "md" : "xs"}
                  >
                    Connect Wallet
                  </Button>
                );
              }
              if (chain.unsupported) {
                return (
                  <Button
                    onClick={openChainModal}
                    type="button"
                    bg={"#FEEFDD"}
                    _hover={{ background: "#EADBCD" }}
                    height={!isMobile ? "38px" : "35px"}
                    size={!isMobile ? "md" : "xs"}
                  >
                    Wrong network
                  </Button>
                );
              }
              return (
                <div style={{ display: "flex", gap: 12 }}>
                  <Button
                    onClick={openAccountModal}
                    type="button"
                    bg={"#FEEFDD"}
                    _hover={{ background: "#EADBCD" }}
                    height={!isMobile ? "38px" : "35px"}
                    size={!isMobile ? "md" : "xs"}
                  >
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ""}
                  </Button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default CustomConnectButton;
