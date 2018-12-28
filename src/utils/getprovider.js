import ethers from "ethers";
import web3 from "web3";

const getProvider = () => {
    return new Promise((resolve, reject) => {
        window.addEventListener('load', function() {

            // Checking if Web3 has been injected by the browser (Mist/MetaMask/EthersWallet)
            if (typeof web3 !== 'undefined') {
              // Use Mist/MetaMask's provider
              provider = new ethers.providers.Web3Provider(web3.currentProvider);
              signer = provider.getSigner();
            } else {
              console.log('No web3? You should consider trying MetaMask!')
              // Allow read-only access to the blockchain if no Mist/Metamask/EthersWallet
              provider = ethers.providers.getDefaultProvider();
            }
          
    
          })
  

};

  
export default getProvider;