// Load environment variables
require("dotenv").config();

const { ethers } = require("ethers");
const config = require("./config");

// Load full JSON file for ABI
const fullJson = require("./AntiCounterfeit.json");
const abi = fullJson.abi;

// Setup provider & wallet
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Connect to the deployed contract
const contract = new ethers.Contract(
  process.env.CONTRACT_ADDRESS,
  abi,
  wallet
);

module.exports = { contract };
