"use client";

import { Box, Image } from "@chakra-ui/react";

const MintImage = () => {
  return (
    <Box
      flex="1"
      display="flex"
      justifyContent="center"
      alignItems="center"
      padding={{ base: "20px", md: "0" }}
    >
      <Image
        src="/images/mint-image.jpg"
        alt="NFT Image"
        borderRadius="md"
        maxWidth={{ base: "100%", md: "500px" }}
        maxHeight="500px"
        objectFit="cover"
      />
    </Box>
  );
};

export default MintImage;
