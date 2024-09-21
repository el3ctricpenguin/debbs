require("@nomicfoundation/hardhat-toolbox");

// Ensure your configuration variables are set before executing the script
const { vars } = require("hardhat/config");

// Go to https://alchemy.com, sign up, create a new App in
// its dashboard, and add its key to the configuration variables
const ETHERSCAN_API_KEY = vars.get("ETHERSCAN_API_KEY");

// Add your Sepolia account private key to the configuration variables
// To export your private key from Coinbase Wallet, go to
// Settings > Developer Settings > Show private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Beware: NEVER put real Ether into testing accounts
const PRIVATE_KEY_FOR_DEPLOYMENT = vars.get("PRIVATE_KEY_FOR_DEPLOYMENT");

module.exports = {
  solidity: "0.8.27",  //this config option is crucial. If this does not exist, error may occur.
  networks: {
    sepolia: {
      url: `https://ethereum-sepolia-rpc.publicnode.com/`,
      accounts: [PRIVATE_KEY_FOR_DEPLOYMENT],
    },
  },
  etherscan: {
    apiKey: {
      sepolia: ETHERSCAN_API_KEY,
    },
  },
};
