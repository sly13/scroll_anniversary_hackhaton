import { useEffect, useState } from "react";
import api from "../config/axios";

interface LeaderboardEntry {
  address: string;
  points: number;
}

const useLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(false);

  const fetchLeaderboard = async () => {
    setLoadingLeaderboard(true);
    try {
      const response = await api.get("/leaderboard");
      setLeaderboard(response.data);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    } finally {
      setLoadingLeaderboard(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return { leaderboard, loadingLeaderboard, fetchLeaderboard };
};

export default useLeaderboard;
