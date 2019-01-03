import { ethers, providers } from "ethers";




const ethersService = () => {
// Connect to the network
// Connect to the Contract using a Provider, so we only have read-only access to the contract

const getBalance = async (options) => {
const options = {
   address: '0xcBD901dB55c9139828f7b5D5Cbfd5AfeAB01d066"', 
   provider: providers.getDefaultProvider(network), 
   const abi;  
 }
let contract = new ethers.Contract(address, cardId, abi, provider);
const balance = await contract.getBalance(address);
return balance.toString();


};

return {
  
   balance,
   address
 };

};



  // api
  return {
    getprovider: () => getprovider,
    setup
  };
};

export default ethersService();


