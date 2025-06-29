const hre = require("hardhat");

async function main() {
  const Transactions = await hre.ethers.getContractFactory("Transactions");
  const transactions = await Transactions.deploy();

  
  await transactions.waitForDeployment();

  console.log("Transactions contract deployed to:", await transactions.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
