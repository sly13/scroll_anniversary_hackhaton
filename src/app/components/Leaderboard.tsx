// components/Leaderboard.tsx
import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  VStack,
  Text,
} from "@chakra-ui/react";

interface LeaderboardEntry {
  address: string;
  points: number;
}

interface LeaderboardProps {
  leaderboard: LeaderboardEntry[];
  loading: boolean;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ leaderboard, loading }) => {
  return (
    <VStack spacing={4} mb={2} width="100%" maxWidth={700}>
      <Text size={"lg"} fontWeight={"bold"}>
        Leaderboard
      </Text>
      {loading ? (
        <Text>Loading leaderboard...</Text>
      ) : (
        <Table variant="simple" size="sm" width="100%">
          <Thead>
            <Tr>
              <Th>Address</Th>
              <Th isNumeric>Badges</Th>
            </Tr>
          </Thead>
          <Tbody>
            {leaderboard.map((entry, index) => (
              <Tr key={index}>
                <Td>{entry.address}</Td>
                <Td isNumeric>{entry.points}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </VStack>
  );
};

export default Leaderboard;
