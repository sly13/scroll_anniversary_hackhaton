"use client";
import {
  Box,
  Flex,
  Text,
  Heading,
  VStack,
  useToast,
  Button,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import MintImage from "./components/MintImage";
import MintInfo from "./components/MintInfo";
import ParticlesBackground from "./components/ParticlesBackground";
import { loadLogos } from "./utils/loadLogos";
import Fireworks from "fireworks-js";
import { useCheckNFT } from "./hooks/useCheckNFT";
import { useRouter } from "next/navigation";

const Home = () => {
  const logos = loadLogos();
  const fireworksRef = useRef<HTMLDivElement | null>(null);
  const toast = useToast();
  const { hasNFT, loading } = useCheckNFT();
  const router = useRouter();
  const [showMint, setShowMint] = useState(false);

  const handlePlayGame = () => {
    router.push("/game"); // Navigate to the game page
  };

  const handleShowMint = () => {
    setShowMint(!showMint);
  };

  const startFireworks = () => {
    if (fireworksRef.current) {
      const fireworks = new Fireworks(fireworksRef.current, {
        hue: { min: 0, max: 360 },
        delay: { min: 20, max: 40 },
        rocketsPoint: { min: 50, max: 50 },
      });
      fireworks.start();
    }
    setShowMint(false);

    toast({
      title: "Mint successful!",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      position="relative"
      zIndex={1}
      pt={"60px"}
      height={"100vh"}
    >
      <ParticlesBackground imageSources={logos} />
      <VStack spacing={6} textAlign="center" zIndex={1}>
        <Heading size="2xl">
          Join Us in Celebrating Scroll’s Anniversary! 🎉
        </Heading>
        <Text fontSize="lg">
          Congratulations on your first anniversary on the mainnet! Mint unique
          NFTs to celebrate this milestone and be a part of our growing
          community!
        </Text>
      </VStack>

      <Flex
        direction={{ base: "column", md: "row" }}
        align="start"
        justify="center"
        mt={10}
        gap={8}
        zIndex={1}
      >
        <MintImage />

        <Flex
          direction={{ base: "column", md: "row" }}
          align="start"
          justify="center"
          // mt={10}
          gap={8}
          zIndex={1}
          width={{ base: "100%", sm: "450px" }} // Fixed width for small screens
          maxWidth="450px" // Maximum width
          padding={{ base: "20px", md: "0" }}
        >
          {(!loading && !hasNFT) || showMint ? (
            <Flex flexFlow={"column"}>
              <MintInfo startFireworks={startFireworks} />
              {hasNFT && (
                <Button onClick={handlePlayGame} colorScheme="orange" mt={4}>
                  Play Game
                </Button>
              )}
            </Flex>
          ) : (
            <>
              <Flex flexFlow={"column"}>
                {hasNFT && (
                  <>
                    <Text fontWeight={"bold"}>Congratulations!</Text>
                    <Text fontSize="md">
                      You are now part of our community with a unique NFT!
                    </Text>
                    <Text fontSize="md" mt={2}>
                      Participate in the game, and each week, there will be
                      prize draws for various NFTs and access to different
                      services!
                    </Text>
                    <Button
                      onClick={handlePlayGame}
                      colorScheme="orange"
                      mt={4}
                    >
                      Play Game
                    </Button>
                    <Button
                      onClick={handleShowMint}
                      colorScheme="orange"
                      mt={4}
                    >
                      Mint more
                    </Button>
                  </>
                )}
              </Flex>
            </>
          )}
        </Flex>
      </Flex>

      <div
        ref={fireworksRef}
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          overflow: "hidden",
          transform: "translateY(-50%)",
        }}
      ></div>
    </Box>
  );
};

export default Home;
