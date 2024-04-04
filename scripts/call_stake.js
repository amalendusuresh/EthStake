// Import ethers from Hardhat package
const { ethers } = require("hardhat");

async function main() {
  // Your contract's address here (replace it with your deployed contract address)
  const contractAddress = "0x63959335Ef3627537D8B4d7F50F3234d8a6D0846";

  // Fetch the Contract using Contract's ABI and Address
  const Contract = await ethers.getContractAt("ETHStaking", contractAddress);

  // Identify the signer to perform transactions
  const [signer] = await ethers.getSigners();

  // Example: Call `stake` function by sending ETH
  const transactionResponse = await Contract.connect(signer).stake({
    value: ethers.parseEther("1.0") // Sending 1 ETH as an example
  });

  await transactionResponse.wait();

  console.log(`Stake function called, transaction hash: ${transactionResponse.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});