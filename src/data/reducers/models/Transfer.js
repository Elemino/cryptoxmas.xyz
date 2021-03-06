import { attr, Model } from "redux-orm";
import * as actions from "../../../actions/types";

export default class AssetTransfer extends Model {
  // eslint-disable-next-line no-undef
  static modelName = "Transfer";
  // eslint-disable-next-line no-undef
  static fields = {
    id: attr(),
    txHash: attr(),
    senderAddress: attr(),
    direction: attr(),
    timestamp: attr(),
    amount: attr(),
    fee: attr(),
    networkId: attr(),
    transferId: attr(), // sha3(phone, secretCode)
    transitAddress: attr(),
    transitPrivateKey: attr(),
    receiverAddress: attr(),
    status: attr(), // pending, sent, completed, canceled,
    isError: attr() // if last tx is error
  };

  static reducer(action, model) {
    switch (action.type) {
      case actions.CREATE_TRANSFER: {
        const transfer = action.payload;
        model.create(transfer);
        return undefined;
      }
      case actions.UPDATE_TRANSFER: {
        const updateParams = action.payload;
        model.upsert(updateParams);

        return undefined;
      }
      default:
        return undefined;
    }
  }
}
