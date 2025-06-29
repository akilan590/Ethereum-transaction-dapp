
require("@nomicfoundation/hardhat-toolbox");


module.exports = {
  solidity: '0.8.0',
  networks: {
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/eKn79tanWIxqxX2l06M8O',
      accounts: ['a97f78ed6cd784029e9273c73ba2d754b08acc64f6a656e197da3cb8a389c41c'],
    },
  },
};