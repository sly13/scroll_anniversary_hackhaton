"use client";

import { Box, Flex, Heading, Icon, Link, Spacer } from "@chakra-ui/react";
import { FC } from "react";
import WalletConnectButton from "./CustomConnectButton";
import { FaTwitter } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Header: FC = () => {
  const router = useRouter();

  return (
    <Box as="header" p={4}>
      <Flex align="center" maxW="1200px" mx="auto">
        <Heading
          as="h1"
          size="lg"
          color="black"
          fontWeight={"500"}
          onClick={() => router.push("/")}
          cursor={"pointer"}
        >
          Scroll
        </Heading>
        <Spacer />

        <Flex as="nav" gap={4}>
          <Link
            href="#"
            isExternal
            style={{
              textDecoration: "none",
              color: "black",
              display: "flex",
              alignItems: "center",
            }}
            _hover={{ color: "#FF684B", background: "transparent" }}
          >
            <Icon as={FaTwitter} boxSize={5} />
          </Link>
        </Flex>
        <Box pl={4}>
          <WalletConnectButton />
        </Box>
      </Flex>
    </Box>
  );
};

export default Header;
