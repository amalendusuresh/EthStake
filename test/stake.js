const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ETHStaking", function () {
  let StakingContract;
  let stakingContract;
  let owner;
  let user1;
  let beneficiary;

  beforeEach(async function() {
    // Deploy the contract before each test
    StakingContract = await ethers.getContractFactory("ETHStaking");
    [owner, user1, beneficiary] = await ethers.getSigners();
    stakingContract = await StakingContract.deploy();
    await stakingContract.waitForDeployment();
  });
  

  it("Should allow a user to stake ETH", async function () {
    // User1 stakes 1 ETH
    const tx = await stakingContract.connect(user1).stake({ value: ethers.parseEther("1.0") });
    const receipt = await tx.wait();
    const block = await ethers.provider.getBlock(receipt.blockNumber);

    await expect(tx)
    .to.emit(stakingContract, "Staked")
    .withArgs(user1.address, ethers.parseEther("1.0"), block.timestamp);

    const stake = await stakingContract.stakes(user1.address);

    expect(stake.amount).to.equal(ethers.parseEther("1.0"));
    expect(stake.timestamp).to.be.closeTo(block.timestamp, 2);
    
  });

  it("checks contract deployed successfully", async function () {
    expect(stakingContract.address !== undefined, "Contract was not deployed");
  });

 
  it("Should not allow a user to unstake before the lock period is over", async function () {
    // User1 stakes 1 ETH
    await stakingContract.connect(user1).stake({ value: ethers.parseEther("1.0") });

    // Simulate a failed attempt to unstake too early, before 365 days have passed
    await expect(stakingContract.connect(user1).unstake())
        .to.be.revertedWith("Stake is still locked");

    // Assert that the contract still holds the user's stake
    const stake = await stakingContract.stakes(user1.address);
    expect(stake.amount).to.equal(ethers.parseEther("1.0"));
  });


  it("Should allow a user to unstake after the lock period, with contract funded by the beneficiary", async function () {
    // User1 stakes 1 ETH
    await stakingContract.connect(user1).stake({ value: ethers.parseEther("1.0") });

    // Simulate time travel on the test network of 365 days
    await ethers.provider.send("evm_increaseTime", [365 * 24 * 60 * 60]);
    await ethers.provider.send("evm_mine");

    // Beneficiary funds the contract to cover unstake + rewards
    await beneficiary.sendTransaction({
        to: stakingContract.address,
        value: ethers.parseEther("1.1"), // Assuming a 10% reward, covering stake + reward
    });

    // Ensure the contract is funded sufficiently for the unstake operation
    const contractBalancePostFunding = await ethers.provider.getBalance(stakingContract.address);
    console.log("Contract balance after funding:", ethers.formatEther(contractBalancePostFunding), "ETH");

    // User1 unstakes
    await expect(stakingContract.connect(user1).unstake())
        .to.emit(stakingContract, "Unstaked")
        .withArgs(user1.address, ethers.parseEther("1.0"), ethers.parseEther("0.1"));
});

  it("Should revert when a non-owner tries to pause", async function () {
    await expect(stakingContract.connect(user1).pause())
      .to.be.reverted;
  });


   it("Allows the owner to pause and unpause the contract", async function () {
    await stakingContract.pause();
    expect(await stakingContract.paused()).to.equal(true);

    await stakingContract.unpause();
    expect(await stakingContract.paused()).to.equal(false);
  });


});
