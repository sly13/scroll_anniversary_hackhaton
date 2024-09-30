"use client";
import React from "react";
import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useAccount } from "wagmi";
import CustomConnectButton from "../components/CustomConnectButton";
import { useCheckNFT } from "../hooks/useCheckNFT";
import { useRouter } from "next/navigation";
import useLeaderboard from "../hooks/useLeaderboard";
import Leaderboard from "../components/Leaderboard";
import api from "../config/axios";

const PhaserGame = dynamic(() => import("./PhaserGame"), { ssr: false });

const GamePage: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { hasNFT, loading } = useCheckNFT();
  const router = useRouter();
  const { leaderboard, loadingLeaderboard, fetchLeaderboard } =
    useLeaderboard();

  const handleBuyNft = () => {
    router.push("/");
  };

  const sendPointsToServer = async (points: number) => {
    if (!address) return;

    try {
      const response = await api.post("/save-points", {
        address,
        points,
      });

      if (!response.data) {
        throw new Error("Failed to send points");
      }

      console.log("Points submitted successfully:", response.data);
      await fetchLeaderboard(); // Fetch leaderboard again after submitting points
    } catch (error) {
      console.error("Error submitting points:", error);
    }
  };

  const handleGameEnd = (points: number) => {
    sendPointsToServer(points);
  };

  return (
    <Flex
      direction="column"
      justifyContent={"center"}
      alignItems={"center"}
      padding={{ base: "4", md: "4" }}
      width="100%"
    >
      <Heading as={"h1"} mb={2}>
        Scroll Anniversary Game
      </Heading>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          {!isConnected ? (
            <CustomConnectButton />
          ) : (
            <>
              {!hasNFT ? (
                <>
                  <Text>To play, you must have the Anniversary NFT.</Text>
                  <Button onClick={handleBuyNft}>Buy</Button>
                </>
              ) : (
                <PhaserGame onGameEnd={handleGameEnd} />
              )}
            </>
          )}
        </>
      )}

      <Leaderboard leaderboard={leaderboard} loading={loadingLeaderboard} />
    </Flex>
  );
};

export default GamePage;
