import { useState, useEffect } from "react";
import { useReadContract } from "wagmi";
import { COLLECTION_ADDRESS } from "../utils/constants";
import ScrollTestNft from "@/abis/ScrollTestNft.json";

export const useTokenCount = () => {
  const [tokenCount, setTokenCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const { data, isError, isLoading, refetch } = useReadContract({
    address: COLLECTION_ADDRESS,
    abi: ScrollTestNft.abi,
    functionName: "tokenCounter",
  });

  useEffect(() => {
    setLoading(isLoading);

    if (!isLoading) {
      if (!isError && data) {
        const tokenCountValue =
          typeof data === "bigint"
            ? Number(data)
            : parseInt(data.toString(), 10);
        setTokenCount(tokenCountValue);
      }
    }
  }, [data, isError, isLoading]);

  return { tokenCount, loading, refetch };
};
