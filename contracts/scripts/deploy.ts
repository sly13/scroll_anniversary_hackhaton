import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";

async function main() {
  const baseTokenURI =
    "https://play-lh.googleusercontent.com/HRSGysWcE21MNwY04GaCK3v9mriPpH9GQODRc8X3vxobl9asED0cKRAIzIMlHVCiAQ"; // Base URI for NFT metadata

  const ScrollTestNft = await ethers.getContractFactory("ScrollTestNft");

  // Deploy the contract with the necessary constructor argument
  const scrollTestNft = await ScrollTestNft.deploy(baseTokenURI);

  await scrollTestNft.deployed();
  console.log("ScrollTestNft deployed to:", scrollTestNft.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
