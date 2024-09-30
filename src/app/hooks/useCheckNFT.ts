import { useState, useEffect } from "react";
import { useAccount, useReadContract } from "wagmi";
import { COLLECTION_ADDRESS } from "../utils/constants";
import ScrollTestNft from "@/abis/ScrollTestNft.json";

export const useCheckNFT = () => {
  const { address } = useAccount();
  const [hasNFT, setHasNFT] = useState(false);
  const [loading, setLoading] = useState(true);

  const { data, isError, isLoading, refetch } = useReadContract({
    address: COLLECTION_ADDRESS,
    abi: ScrollTestNft.abi,
    functionName: "balanceOf",
    args: [address],
  });

  useEffect(() => {
    setLoading(isLoading);

    if (!isLoading) {
      if (!isError && data) {
        const balance = BigInt(data.toString());
        setHasNFT(balance > 0n);
      } else {
        setHasNFT(false);
      }
    }
  }, [data, isError, isLoading]);

  return { hasNFT, loading, refetch };
};
