export async function estimateBlockCountdown(
  currentBlockNumber: number,
  targetBlockNumber: number
) {
  const averageBlockTime = 3;
  const blockDifference = targetBlockNumber - currentBlockNumber;

  const estimatedTimeSeconds = blockDifference * averageBlockTime;

  const days = Math.floor(estimatedTimeSeconds / (60 * 60 * 24));
  const hours = Math.floor((estimatedTimeSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((estimatedTimeSeconds % (60 * 60)) / 60);
  const seconds = estimatedTimeSeconds % 60;

  console.log(`Current Block: ${currentBlockNumber}`);
  console.log(`Target Block: ${targetBlockNumber}`);
  console.log(`Block Difference: ${blockDifference}`);
  console.log(
    `Estimated Time: ${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds`
  );

  return {
    days,
    hours,
    minutes,
    seconds,
    totalSeconds: estimatedTimeSeconds,
  };
}
