import web3Service from "../services/web3Service";
import {
  getDepositingTransfers,
  getReceivingTransfers,
  getCancellingTransfers
} from "./../data/selectors";
import cryptoxmasService from "../services/cryptoxmasService";
import * as actionTypes from "./types";
import { updateBalance } from "./web3";

const createTransfer = payload => {
  return {
    type: actionTypes.CREATE_TRANSFER,
    payload
  };
};

const updateTransfer = payload => {
  return {
    type: actionTypes.UPDATE_TRANSFER,
    payload
  };
};

const subscribePendingTransferMined = (transfer, nextStatus, txHash) => {
  return async dispatch => {
    const web3 = web3Service.getWeb3();
    const txReceipt = await web3.eth.getTransactionReceiptMined(
      txHash || transfer.txHash
    );

    const isError = !(txReceipt.status === "0x1" && txReceipt.logs.length > 0);
    dispatch(
      updateTransfer({
        status: nextStatus,
        isError,
        id: transfer.id
      })
    );

    setTimeout(() => {
      dispatch(updateBalance());
    }, 10000);
  };
};

// find all pending transfers and update status when they will be mined
export const subscribePendingTransfers = () => {
  return (dispatch, getState) => {
    const state = getState();
    const depositingTransfers = getDepositingTransfers(state);
    const receivingTransfers = getReceivingTransfers(state);
    const cancellingTransfers = getCancellingTransfers(state);

    depositingTransfers.map(transfer => {
      dispatch(subscribePendingTransferMined(transfer, "deposited"));
    });
    receivingTransfers.map(transfer => {
      dispatch(subscribePendingTransferMined(transfer, "received"));
    });
    cancellingTransfers.map(transfer => {
      dispatch(subscribePendingTransferMined(transfer, "cancelled"));
    });
  };
};

export const buyGift = ({ amount, tokenId }) => {
  return async (dispatch, getState) => {
    const state = getState();
    const networkId = state.web3Data.networkId;
    const senderAddress = state.web3Data.address;

    console.log("here");
    const TOKEN_ADDRESS = "0x49f33ab1c4b159ac16c35ca7ebf25cd06a265276"; // #TODO remove hard-code here
    const {
      txHash,
      transitPrivateKey,
      transferId,
      transitAddress
    } = await cryptoxmasService.buyGift({
      tokenAddress: TOKEN_ADDRESS,
      tokenId,
      amountToPay: amount,
      senderAddress
    });
    const id = `${transferId}-out`;

    const transfer = {
      id,
      txHash,
      transitPrivateKey,
      transferId,
      transitAddress: transitAddress.toLowerCase(),
      networkId,
      senderAddress,
      status: "depositing",
      timestamp: Date.now(),
      amount,
      fee: 0,
      direction: "out"
    };

    dispatch(createTransfer(transfer));
    // subscribe
    dispatch(subscribePendingTransferMined(transfer, "deposited"));

    return transfer;
  };
};

export const claimGift = ({ transitPrivateKey, gift }) => {
  return async (dispatch, getState) => {
    const state = getState();
    const networkId = state.web3Data.networkId;
    const receiverAddress = state.web3Data.address;

    const result = await cryptoxmasService.claimGift({
      transitPrivateKey,
      receiverAddress
    });

    const id = `${result.transferId}-IN`;
    const txHash = result.txHash;
    const transfer = {
      id,
      txHash,
      transferId: result.transferId,
      status: "receiving",
      networkId,
      receiverAddress,
      timestamp: Date.now(),
      gift,
      direction: "in"
    };
    dispatch(createTransfer(transfer));

    // // subscribe
    dispatch(subscribePendingTransferMined(transfer, "received"));
    return transfer;
  };
};

export const cancelTransfer = transfer => {
  return async dispatch => {
    // take contract redeploy into account

    const txHash = await cryptoxmasService.cancelTransfer(
      transfer.transitAddress
    );

    dispatch(
      updateTransfer({
        status: "cancelling",
        id: transfer.id,
        txHash
      })
    );

    // // subscribe
    transfer.txHash = txHash;
    dispatch(subscribePendingTransferMined(transfer, "cancelled"));
    return transfer;
  };
};
