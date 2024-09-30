import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import "@nomiclabs/hardhat-ethers";
import "@nomicfoundation/hardhat-verify";
import * as dotenv from "dotenv";
dotenv.config();

const DEPLOY_PK_PROD = process.env.DEPLOY_PK_PROD;
const DEPLOY_PK_TESTNET = process.env.DEPLOY_PK_TESTNET;
const ALCHEMY_URL_MAINNET = process.env.ALCHEMY_URL_MAINNET;
const ALCHEMY_URL_SEPOLIA = process.env.ALCHEMY_URL_SEPOLIA;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

if (
  !DEPLOY_PK_PROD ||
  !DEPLOY_PK_TESTNET ||
  !ALCHEMY_URL_MAINNET ||
  !ALCHEMY_URL_SEPOLIA ||
  !ETHERSCAN_API_KEY
) {
  throw new Error("Please set your environment variables in the .env file");
}

const config: HardhatUserConfig = {
  solidity: "0.8.27",
  networks: {
    scrollMainnet: {
      url: ALCHEMY_URL_MAINNET,
      accounts: [DEPLOY_PK_PROD],
      chainId: 534352,
    },
    scrollSepolia: {
      url: ALCHEMY_URL_SEPOLIA,
      accounts: [DEPLOY_PK_TESTNET],
    },
  },
  etherscan: {
    apiKey: {
      scrollMainnet: ETHERSCAN_API_KEY,
      scrollSepolia: ETHERSCAN_API_KEY,
    },
    customChains: [
      {
        network: "scrollSepolia",
        chainId: 534351,
        urls: {
          apiURL: "https://api-sepolia.scrollscan.com/api",
          browserURL: "https://sepolia.scrollscan.com/",
        },
      },
      {
        network: "scrollMainnet",
        chainId: 534352,
        urls: {
          apiURL: "https://api.scrollscan.com/api",
          browserURL: "https://scroll.io",
        },
      },
    ],
  },
  sourcify: {
    enabled: true,
  },
};

export default config;
