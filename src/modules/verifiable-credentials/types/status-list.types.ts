import { VerifiableCredential } from '@ew-did-registry/credentials-interface';

export interface StatusList2021UnsignedCredential {
  '@context': Array<string | Record<string, unknown>>;
  id: string;
  type: string[];
  issuer: string;
  issuanceDate: string;
  credentialSubject: {
    id: string;
    type: string;
    statusPurpose: string;
    encodedList: string;
  };
}

export interface StatusList2021CredentialSubject {
  [x: string]: unknown;
  id: string;
  type: string;
  statusPurpose: string;
  encodedList: string;
}

export type StatusList2021Credential =
  VerifiableCredential<StatusList2021CredentialSubject>;

export interface CredentialRevocationDetailsResult {
  /* Revoker of the credential */
  revoker: string;

  /* Timestamp of revocation */
  timestamp: number;
}

export const statusList2021CredentialEIP712Types = {
  EIP712Domain: [],
  VerifiableCredential: [
    { name: '@context', type: 'string[]' },
    { name: 'id', type: 'string' },
    { name: 'type', type: 'string[]' },
    { name: 'issuer', type: 'string' },
    { name: 'issuanceDate', type: 'string' },
    { name: 'credentialSubject', type: 'StatusList2021' },
    { name: 'proof', type: 'Proof' },
  ],
  StatusList2021: [
    { name: 'id', type: 'string' },
    { name: 'type', type: 'string' },
    { name: 'statusPurpose', type: 'string' },
    { name: 'encodedList', type: 'string' },
  ],
  Proof: [
    { name: '@context', type: 'string' },
    { name: 'verificationMethod', type: 'string' },
    { name: 'created', type: 'string' },
    { name: 'proofPurpose', type: 'string' },
    { name: 'type', type: 'string' },
  ],
};
