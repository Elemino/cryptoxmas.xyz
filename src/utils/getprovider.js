import ethers from "ethers";
import web3 from "web3";

const getProvider = () => {
    return new Promise((resolve, reject) => {
        window.addEventListener('load', function() {

              signer = provider.getSigner();
              provider = ethers.providers.getDefaultProvider();
}})};

  
export default getProvider;
