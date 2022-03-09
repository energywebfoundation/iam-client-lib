import { TypedDataField } from '@ethersproject/abstract-signer';
import {
  ICredentialSubject,
  IJsonLdCredential,
  IPresentation,
  IPresentationDefinition,
} from '@sphereon/pex';

export interface IssuerFields {
  key: string;
  value: string | number;
}
export interface CreateCredentialParams {
  subject: string;
  namespace: string;
  version: string;
  issuerFields?: IssuerFields[];
}
export interface Credential<T extends ICredentialSubject>
  extends IJsonLdCredential {
  credentialSubject: T;
}

export interface EWFCredentialSubject extends ICredentialSubject {
  role: {
    namespace: string;
    version: string;
  };
  issuerFields: IssuerFields[];
  id: string;
}

export interface VerifiableCredential<T extends ICredentialSubject>
  extends Credential<T> {
  proof: {
    // ! This is a hack to get the type to work with PEX types. PEX is not supporting EIP712 signatures.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [x: string]: string | string[] | any;
    '@context': string[];
    type: string;
    proofPurpose: string;
    proofValue: string;
    verificationMethod: string;
    created: string;
    eip712Domain: {
      domain: Record<never, never>;
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

export interface ProofOptions {
  verificationMethod?: string;
  proofPurpose?: string;
}

export interface CreatePresentationParams {
  presentationDefinition?: IPresentationDefinition;
}

export interface VerifyVerifiableCredentialResults {
  checks: string[];
  warnings: string[];
  errors: string[];
}

export interface Presentation extends IPresentation {
  id: string;
  verifiableCredential: VerifiableCredential<ICredentialSubject>[];
}

export interface VerifiablePresentation extends Presentation {
  proof: {
    '@context': string | string[];
    type: string;
    proofPurpose: string;
    proofValue: string;
    verificationMethod: string;
    created: string;
    eip712Domain: {
      domain: Record<never, never>;
      messageSchema: {
        VerifiablePresentation: TypedDataField[];
        EIP712Domain: TypedDataField[];
        Proof: TypedDataField[];
        VerifiableCredential?: TypedDataField[];
      };
      primaryType: string;
    };
  };
}
