import Promise from "bluebird";
import NFT from "../../../cryptoxmas-contracts/build/NFT.json";
import config from "../../../dapp-config.json";

export default class NFTService {
  setup({ web3, network }) {
    const nftAddress = config[network].NFT_ADDRESS;

    const contract = web3.eth
      .contract(JSON.parse(NFT.interface))
      .at(nftAddress);
    Promise.promisifyAll(contract, { suffix: "Promise" });
    this.tokenContract = contract;
  }

  async tokensOf(owner) {
    const numberOfTokens = await this.tokenContract.balanceOfPromise(owner);
    const promises = [];
    for (let i = 0; i < numberOfTokens; i++) {
      promises.push(
        this.tokenContract
          .tokenOfOwnerByIndexPromise(owner, i)
          .then(t => t.toString())
          .then(async tokenId => {
            const metadata = await this.getMetadata(tokenId);
            return { tokenId, metadata };
          })
      );
    }

    const result = await Promise.all(promises);
    return result;
  }

  async ownerOf(id) {
    return this.tokenContract.ownerOfPromise(id);
  }

  async getMetadata(id, tokenURI = "NOT_FETCHED") {
    // default metadata
    let metadata;
    let defaultMeta = {
      description: "",
      name: `NFT #${id}`,
      image:
        "https://raw.githubusercontent.com/VolcaTech/eth2-assets/master/images/santa_zombie.png"
    };

    // fetch token URI if it wasn't fetched
    if (tokenURI === "NOT_FETCHED") {
      tokenURI = await this.tokenContract.tokenURIPromise(id);
    }

    // if there is tokenURI, get metadata from URI
    if (tokenURI) {
      try {
        metadata = await fetch(tokenURI).then(res => res.json());
      } catch (err) {
        console.log(err);
      }
    }

    return metadata || defaultMeta;
  }
}
