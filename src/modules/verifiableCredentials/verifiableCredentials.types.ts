import {
  TypedDataDomain,
  TypedDataField,
} from '@ethersproject/abstract-signer';

export interface VerifiableCredential<T> {
  '@context': string | string[];
  id?: string;
  issuer: string;
  type: string[];
  credentialSubject: T;
}

export interface SignedVerifiableCredential<T> extends VerifiableCredential<T> {
  proof: {
    '@context': string | string[];
    type: string;
    proofPurpose: string;
    proofValue: string;
    verificationMethod: string;
    created: string;
    eip712Domain: {
      domain: TypedDataDomain;
      messageSchema: {
        CredentialSubject: TypedDataField[];
        EIP712Domain: TypedDataField[];
        Proof: TypedDataField[];
        VerifiableCredential: TypedDataField[];
      };
      primaryType: string;
    };
  };
}

export interface SignVerifiableCredentialOptions {
  verificationMethod?: string;
  proofPurpose?: string;
  domain?: Partial<TypedDataDomain>;
}

export interface VerifyVerifiableCredentialOptions {
  proofPurpose?: string;
  verificationMethod?: string;
}

export interface VerifyVerifiableCredentialResults {
  checks: string[];
  warnings: string[];
  errors: string[];
}
