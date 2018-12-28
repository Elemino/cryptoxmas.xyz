import { ethers } from "ethers";
import { providers } from "ethers";


const ethersService = () => {
// Connect to the network
// Connect to the Contract using a Provider, so we only have read-only access to the contract

const getBalance = async (options) => {
const options = {
   address: '0xcBD901dB55c9139828f7b5D5Cbfd5AfeAB01d066"', 
   provider: providers.getDefaultProvider(network), 
 }
let contract = new ethers.Contract(tokenAddress, cardId, abi, provider);
const balance = await contract.balanceOf(options.address);
return balance.toString();


};

};

  // api
  return {
    getprovider: () => getprovider,
    setup
  };
};

export default ethersService();


