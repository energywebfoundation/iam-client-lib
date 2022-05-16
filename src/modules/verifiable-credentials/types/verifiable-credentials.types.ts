import { PresentationDefinition } from '@ew-did-registry/credentials-interface';
import { IPresentationDefinition, SelectResults } from '@sphereon/pex';
import { IssuerFields } from './role-credential.types';

/*
 * Parameters required to construct the subject for a role credential
 * https://www.w3.org/TR/vc-data-model/#credential-subject
 */
export interface RoleCredentialSubjectParams {
  /*
   * DID of the subject
   * https://www.w3.org/TR/vc-data-model/#identifiers
   */
  id: string;

  /* Role namespace */
  namespace: string;

  /* Role version */
  version: string;

  /* Role issuer fields */
  issuerFields?: IssuerFields[];

  /* Expiration date of credential */
  expirationDate?: Date;
}

export interface ProofOptions {
  /* Proof verification method */
  verificationMethod?: string;

  /* Proof purpose */
  proofPurpose?: string;
  challenge?: string;
}

export interface CreatePresentationParams {
  /* Presentation definition from which pick the credentials */
  presentationDefinition?: IPresentationDefinition;
}

export interface VerifyVerifiableCredentialResults {
  checks: string[];
  warnings: string[];
  errors: string[];
}

export interface InitiateExchangeResults {
  presentationDefinition: PresentationDefinition;
  selectResults: SelectResults;
}

export interface RevocationCredentialDetailsResults {
  /* DID of revoker */
  revoker: string;

  /* Timestamp of revocation */
  timestamp?: string;
}
