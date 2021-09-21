import { utils } from "ethers";

export const emptyAddress = "0x0000000000000000000000000000000000000000";
export const WALLET_PROVIDER = "WalletProvider";
export const PUBLIC_KEY = "PublicKey";
export const VOLTA_CHAIN_ID = 73799;
export const NATS_EXCHANGE_TOPIC = "claim.exchange";
export const NODE_FIELDS_KEY = "metadata";
export enum MessagingMethod {
    Nats = "nats",
    WebRTC = "webRTC",
    SmartContractStorage = "smartContractStorage",
}

export const typedMsgPrefix = "1901";
export const erc712_type_hash = utils.id(
    "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)",
);
export const agreement_type_hash = utils.id("Agreement(address subject,bytes32 role,uint256 version)");
export const proof_type_hash = utils.id(
    "Proof(address subject,bytes32 role,uint256 version,uint256 expiry,address issuer)",
);
export const defaultClaimExpiry = Number.MAX_SAFE_INTEGER - 1; // Maximum value allowed by BigNumber
