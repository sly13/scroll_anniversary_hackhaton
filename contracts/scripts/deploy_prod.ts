import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";

async function main() {
  const name = "Scroll 1st Anniversary";
  const symbol = "S1A";
  const tokenURI = "";
  const mintPrice = ethers.utils.parseEther("0");

  const ScrollTestNft = await ethers.getContractFactory("ScrollTestNft");

  const scrollTestNft = await ScrollTestNft.deploy(
    name,
    symbol,
    tokenURI,
    mintPrice
  );

  await scrollTestNft.deployed();
  console.log("ScrollTestNft deployed to:", scrollTestNft.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
