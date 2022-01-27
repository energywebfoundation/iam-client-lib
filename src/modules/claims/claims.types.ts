import { IMessage } from '../messaging/messaging.types';

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
  claimType?: string;
  claimTypeVersion?: string;

  acceptedBy: string;
}

export interface IClaimRejection extends IMessage {
  isRejected: boolean;
  rejectionReason?: string;
}

export enum RegistrationTypes {
  OffChain = 'RegistrationTypes::OffChain',
  OnChain = 'RegistrationTypes::OnChain',
}

export enum ClaimEventType {
  ISSUE_CREDENTIAL = 'issue-credential',
  REJECT_CREDENTIAL = 'reject-credential',
  REQUEST_CREDENTIALS = 'request-credential',
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
  claim: any
): claim is Required<
  Pick<
    Claim,
    | 'claimType'
    | 'claimTypeVersion'
    | 'subject'
    | 'onChainProof'
    | 'acceptedBy'
    | 'subjectAgreement'
  >
> => {
  const requiredProps = [
    'claimType',
    'claimTypeVersion',
    'subject',
    'onChainProof',
    'acceptedBy',
    'subjectAgreement',
  ];
  const claimProps = Object.keys(claim);

  return requiredProps.every((p) => claimProps.includes(p));
};

export const defaultClaimExpiry = Number.MAX_SAFE_INTEGER - 1; // constraint of ethers.BigNumber

export type RequestClaim = { requester: string; message: IClaimRequest };
export type IssueClaim = { issuer: string; message: IClaimIssuance };
export type RejectClaim = { issuer: string; message: IClaimRejection };
