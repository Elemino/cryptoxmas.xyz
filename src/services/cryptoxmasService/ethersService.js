import { ethers, providers } from "ethers";


const ethersService = () => {
// Connect to the network
// Connect to the Contract using a Provider, so we only have read-only access to the contract

const getBalance = async (options) => {
const options = {
   address: '0xcBD901dB55c9139828f7b5D5Cbfd5AfeAB01d066"', 
   provider: providers.getDefaultProvider(network), 
   const abi;
   const wallet = new ethers.Wallet(privateKey, provider);  
 }

let walletWithoutProvider = await ethers.Wallet.fromEncryptedJson(JSON.stringify(encryptedWallet), password);
let walletWithProvider = walletWithoutProvider.connect(provider);

const contract = new ethers.Contract(address, cardId, abi, wallet);
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


