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
      url: "https://sepolia.infura.io/v3/",
      accounts: [""]
    },
  },
  etherscan: {
    apiKey: "",
  },
  sourcify: {
    enabled: true
  },
};
