import { utils } from "ethers";
import { IMessage } from "../messaging/messaging.types";

export interface IClaimRequest extends IMessage {
    token: string;
    claimType: string;
    claimTypeVersion: string;
    registrationTypes: RegistrationTypes[];
    subjectAgreement?: string;
}

export interface IClaimIssuance extends IMessage {
    // issuedToken is is only provided in the case of off-chain role
    issuedToken?: string;
    // onChainProof is only provided in case of on-chain role
    onChainProof?: string;
    acceptedBy: string;
}

export interface IClaimRejection extends IMessage {
    isRejected: boolean;
    rejectionReason?: string;
}

export enum RegistrationTypes {
    OffChain = "RegistrationTypes::OffChain",
    OnChain = "RegistrationTypes::OnChain",
}

export enum ClaimEventType {
    ISSUE_CREDENTIAL = "issue-credential",
    REJECT_CREDENTIAL = "reject-credential",
    REQUEST_CREDENTIALS = "request-credential",
}

export interface Claim {
    id: string;
    requester: string;
    subject: string;
    claimIssuer: string[];
    claimType: string;
    claimTypeVersion: string;
    registrationTypes: RegistrationTypes[];
    token: string;
    subjectAgreement?: string;
    onChainProof?: string;
    issuedToken?: string;
    isAccepted: boolean;
    acceptedBy?: string;
    isRejected?: boolean;
    namespace: string;
}

export const readyToBeRegisteredOnchain = (
    claim: any,
): claim is Required<Pick<Claim, "token" | "subjectAgreement" | "onChainProof" | "acceptedBy">> => {
    const requiredProps = ["token", "subjectAgreement", "onChainProof", "acceptedBy"];
    const claimProps = Object.keys(claim);
    return requiredProps.every((p) => claimProps.includes(p));
};

export const typedMsgPrefix = "1901";
export const erc712_type_hash = utils.id(
    "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)",
);
export const agreement_type_hash = utils.id("Agreement(address subject,bytes32 role,uint256 version)");
export const proof_type_hash = utils.id(
    "Proof(address subject,bytes32 role,uint256 version,uint256 expiry,address issuer)",
);
export const defaultClaimExpiry = Number.MAX_SAFE_INTEGER - 1; // constraint of ethers.BigNumber

export type RequestClaim = { requester: string; message: IClaimRequest };
export type IssueClaim = { issuer: string; message: IClaimIssuance };
export type RejectClaim = { issuer: string; message: IClaimRejection };
