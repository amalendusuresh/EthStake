// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ETHStaking is ReentrancyGuard, Pausable, Ownable(msg.sender) {
    address payable constant beneficiaryAccount = payable();

    struct Stake {
        uint256 amount;
        uint256 timestamp;
    }

    mapping(address => Stake[]) public stakes;

    event Staked(address indexed user, uint256 amount, uint256 timestamp, uint256 indexed stakeIndex);
    event Unstaked(address indexed user, uint256 stakeIndex, uint256 amount, uint256 reward);
    event FundsReturnedFromBeneficiary(uint256 amount);

    function stake() external payable whenNotPaused {
        require(msg.value > 0, "Stake amount must be more than 0");
        
        Stake memory newStake = Stake(msg.value, block.timestamp);
        stakes[msg.sender].push(newStake);
        uint256 stakeIndex = stakes[msg.sender].length - 1;

        emit Staked(msg.sender, msg.value, block.timestamp, stakeIndex);
        
        beneficiaryAccount.transfer(msg.value);
    }

    function unstake(uint256 stakeIndex) external nonReentrant whenNotPaused {
        require(stakeIndex < stakes[msg.sender].length, "Invalid stake index");
        Stake memory userStake = stakes[msg.sender][stakeIndex];
        
        require(block.timestamp > userStake.timestamp + 365 days, "Stake is still locked");
        uint256 reward = calculateReward(userStake.amount);
        uint256 totalAmount = userStake.amount + reward;

        delete stakes[msg.sender][stakeIndex];

        (bool sent, ) = msg.sender.call{value: totalAmount}("");
        require(sent, "Failed to send Ether");

        emit Unstaked(msg.sender, stakeIndex, userStake.amount, reward);
    }

    function calculateReward(uint256 amount) private pure returns (uint256) {
        return amount / 10;
    }

    function returnFundsToContract() external payable onlyBeneficiary nonReentrant whenNotPaused {
        require(msg.value > 0, "Cannot return 0 funds");
        emit FundsReturnedFromBeneficiary(msg.value);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    receive() external payable {}

    modifier onlyBeneficiary() {
        require(msg.sender == beneficiaryAccount, "Only the beneficiary can perform this action.");
        _;
    }
}
