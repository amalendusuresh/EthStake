// Import ethers from Hardhat package
const { ethers } = require("hardhat");

async function main() {
  // Your contract's address here (replace it with the actual address where your contract is deployed)
  const contractAddress = "0x63959335Ef3627537D8B4d7F50F3234d8a6D0846";

  // Fetch the Contract using Contract's ABI and Address
  const Contract = await ethers.getContractAt("ETHStaking", contractAddress);

  // Identify the signer to perform transactions
  const [signer] = await ethers.getSigners();

  const stakeIndex = process.argv[2];

  if (stakeIndex === undefined) {
    console.error("Please provide a stakeIndex as a command-line argument.");
    process.exit(1); // Exit if no stakeIndex provided
  }
  

  // Call `unstake` function
  const transactionResponse = await Contract.connect(signer).unstake(stakeIndex);

  await transactionResponse.wait();

  console.log(`Unstake function called, transaction hash: ${transactionResponse.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});