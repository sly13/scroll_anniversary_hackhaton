import { Button, Heading, Text, useToast, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { ethers } from "ethers";
import ScrollTestNft from "@/abis/ScrollTestNft.json";
import alchemyProvider from "../config/alchemy";
import { estimateBlockCountdown } from "../utils/helpers";
import FlipCountdown from "./FlipCountdown";
import CustomConnectButton from "./CustomConnectButton";
import { COLLECTION_ADDRESS } from "../utils/constants";
import { useTokenCount } from "../hooks/useTokenCount";

interface MintInfoProps {
  startFireworks: () => void;
}

const MintInfo: React.FC<MintInfoProps> = ({ startFireworks }) => {
  const toast = useToast();
  const { isConnected } = useAccount();
  const { tokenCount, loading } = useTokenCount();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isMounted, setIsMounted] = useState(false);

  const {
    data: hash,
    writeContract,
    status: transactionStatus,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  const handleMint = async () => {
    if (!isConnected) {
      toast({
        title: "Please connect your wallet!",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    await writeContract({
      address: COLLECTION_ADDRESS,
      abi: ScrollTestNft.abi,
      functionName: "mint",
      value: ethers.parseEther("0.0000025"),
    });
  };

  useEffect(() => {
    const getBlock = async () => {
      const blockNumber = "latest";
      const block = await alchemyProvider.getBlock(blockNumber);
      if (block) {
        console.log("block", block);
        const countdown = await estimateBlockCountdown(block.number, 10000000);
        setTimeLeft(countdown);
      }
    };

    getBlock();

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (
          prev.seconds > 0 ||
          prev.minutes > 0 ||
          prev.hours > 0 ||
          prev.days > 0
        ) {
          let { days, hours, minutes, seconds } = prev;

          if (seconds > 0) {
            seconds -= 1;
          } else if (minutes > 0) {
            seconds = 59;
            minutes -= 1;
          } else if (hours > 0) {
            minutes = 59;
            seconds = 59;
            hours -= 1;
          } else if (days > 0) {
            hours = 23;
            minutes = 59;
            seconds = 59;
            days -= 1;
          }

          return { days, hours, minutes, seconds };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (hash && isConfirmed) {
      try {
        startFireworks();
      } catch (parseError) {
        console.error("Error parsing log data:", parseError);
        toast({
          title: "Mint failed!",
          description: `Error: ${parseError}`,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    }
  }, [isConfirming, isConfirmed, hash, toast]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <VStack spacing={2} align="left" justify="center">
      <Heading size="lg">Public Mint</Heading>
      <Text fontSize="md" marginTop="-6px" mb={4}>
        Start on Block #10000000
      </Text>
      <FlipCountdown timeLeft={timeLeft} />
      {!loading && <Text> Already minted: {tokenCount}</Text>}
      {isConnected ? (
        <Button
          isLoading={
            transactionStatus === "pending" || (isConfirming && !isConfirmed)
          }
          colorScheme="orange"
          onClick={handleMint}
        >
          Mint Now
        </Button>
      ) : (
        <div>
          <CustomConnectButton />
        </div>
      )}
    </VStack>
  );
};

export default MintInfo;
