import { ethers } from "ethers";

async function setup() {

// Connect to the network
// Connect to the Contract using a Provider, so we only have read-only access to the contract

var provider = ethers.providers.getDefaultProvider('mainnet');


let contractAddress = "0xcBD901dB55c9139828f7b5D5Cbfd5AfeAB01d066";

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

let contract = new ethers.Contract(contractAddress, abi, provider);

// How many tokens?


var numberOfDecimals = 18;
var numberOfTokens = ethers.utils.parseUnits(amount, numberOfDecimals);

};

