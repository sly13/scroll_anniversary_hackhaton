const { ethers } = require("hardhat");

async function main() {
  const contractAddress = "0x70e8d72Fd4f889D21f349EE36D9acEF2629D17C7";
  console.log("Verifying contract at address:", contractAddress);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
