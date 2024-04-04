const { ethers } = require("hardhat");

async function main() {
  // Fetch the Contract Factory for `ETHStakingContract`
  const ETHStaking = await ethers.getContractFactory("ETHStaking");
  
  // Deploy the contract
  const ethstaking = await ETHStaking.deploy(); 
  await ethstaking.waitForDeployment();
  const ethStakingAddress = await ethstaking.getAddress();
 
  console.log("ETHStaking deployed to:", ethStakingAddress);
}

// Run the main function and catch any errors
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});