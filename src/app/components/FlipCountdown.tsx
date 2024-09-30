import { Box, Text, Flex, keyframes } from "@chakra-ui/react";

const flipAnimation = keyframes`
  0% { transform: rotateX(0); }
  50% { transform: rotateX(90deg); }
  100% { transform: rotateX(0); }
`;

interface FlipNumberProps {
  number: number;
  label: string;
}

const FlipNumber: React.FC<FlipNumberProps> = ({ number, label }) => (
  <Flex
    direction="column"
    align="center"
    justify="center"
    border="1px solid"
    borderColor="gray.300"
    borderRadius="md"
    p={4}
    m={2}
    position="relative"
    height="100px"
    width="80px"
    overflow="hidden"
  >
    <Text fontSize="2xl" fontWeight="bold" color="orange.400">
      {number}
    </Text>
    <Text fontSize="sm" color="gray.600" mt={1}>
      {label}
    </Text>
    <Box
      position="absolute"
      bottom="0"
      width="100%"
      height="100%"
      // bg="orange.200"
      opacity="0.7"
      animation={`${flipAnimation} 1s ease-in-out`}
    />
  </Flex>
);

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface FlipCountdownProps {
  timeLeft: TimeLeft;
}

const FlipCountdown: React.FC<FlipCountdownProps> = ({ timeLeft }) => {
  return (
    <Flex justify="center" align="center">
      <FlipNumber number={timeLeft.days} label="Days" />
      <Text fontSize="2xl" mx={2}>
        :
      </Text>
      <FlipNumber number={timeLeft.hours} label="Hours" />
      <Text fontSize="2xl" mx={2}>
        :
      </Text>
      <FlipNumber number={timeLeft.minutes} label="Minutes" />
      <Text fontSize="2xl" mx={2}>
        :
      </Text>
      <FlipNumber number={timeLeft.seconds} label="Seconds" />
    </Flex>
  );
};

export default FlipCountdown;
