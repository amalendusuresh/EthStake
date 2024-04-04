# Smart Contract Breakdown
The Ethereum Staking Smart Contract allows users to stake ETH tokens, which are immediately transferred to a beneficiary account. After a minimum lock period of 1 year, users can unstake their tokens, receiving their original ETH amount plus a 10% reward. The contract includes features to prevent reentrancy attacks, pause operations for safety or maintenance, and restrict certain functions to the contract owner. Events are emitted to log significant actions like staking and unstaking, facilitating easier off-chain tracking.

## Inherits
- **ReentrancyGuard:** Prevents reentrancy attacks.
- **Pausable:** Allows the contract to be paused or unpaused, making functions inaccessible while paused.
- **Ownable:** Assigns contract ownership, enabling certain functions to be restricted to the owner.

## Key Features
- Staking: Users can stake ETH, which is immediately transferred to a beneficiary account.
- Unstaking: After a minimum period of 1 year, users can unstake, receiving their original ETH plus a 10% reward.
- Reward Calculation: A simple calculateReward function that returns 10% of the staked amount.
- Emergency Handling: Includes mechanisms to pause operations for safety or maintenance and a way for staked funds to be returned.
- Events: To log significant actions like staking and unstaking, facilitating easier off-chain tracking.

## Requirements
Installed Node.js
Installed Hardhat
An Ethereum wallet with some ETH

## Steps
Set Up Hardhat Project
1.  Run npm init in your project directory.
2.  Install Hardhat with npm install --save-dev hardhat.
3.  Create the Hardhat project by running npx hardhat and following the setup prompts.
4.  Install OpenZeppelin Contracts
5.  Run npm install @openzeppelin/contracts, ensuring you have access to security and ownership modules.

## Contract Setup
Place your contract code in the contracts folder, ensuring it's named appropriately (e.g., ETHStaking.sol).

## Configuration
In your hardhat.config.js, specify your Ethereum network of choice and add your wallet's private key (securely) for deployments.

## Deployment Script
Create a deployment script under the scripts directory.
Use Hardhat's deployment utilities to deploy your contract.

## Deploy
Run the deployment with npx hardhat run scripts/deploy.js --network yourNetworkName.

## Verify
If deploying to a public testnet or mainnet, consider verifying your contract on Etherscan for transparency.

## Interact
Use Hardhat or other tools like Etherscan or a dApp interface to interact with your deployed contract.


