import { ethers } from "ethers";



const ethersService = () => {
    


async function setup() {

// Connect to the network
// Connect to the Contract using a Provider, so we only have read-only access to the contract

let provider = ethers.providers.getDefaultProvider('mainnet');


let tokenAddress = "0xcBD901dB55c9139828f7b5D5Cbfd5AfeAB01d066";

contractAbiFragment = [
    {
       "name" : "list",
       "type" : "function",
       "inputs" : [
          {
             "name" : "_to",
             "type" : "address"
          },
          {
             "type" : "uint256",
             "name" : "_tokens"
          }
       ],
       "constant" : true,
       "outputs" : [],
       "payable" : false
    }
 ];

let contract = new ethers.Contract(tokenAddress, cardId, abi, provider);

let utils = ethers.utils;

// How many tokens?


let numberOfDecimals = 18;
let numberOfTokens = ethers.utils.parseUnits(amount, numberOfDecimals);

};


  // api
  return {
    getprovider: () => getprovider,
    setup
  };
};

export default ethersService();


