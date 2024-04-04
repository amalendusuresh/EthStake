require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
  networks: {
    sepolia: {
      url: "https://sepolia.infura.io/v3/8a927723873c493fb9bfafa394c8091d",
      accounts: ["e6e48815911df3fb56390a084da468c9e659819b367165c45589f508759947a5"]
    },
  },
  etherscan: {
    apiKey: "QYDP5RX78QEF94BUWPKXZHZ7QZRVQIXF3H",
  },
  sourcify: {
    enabled: true
  },
};
