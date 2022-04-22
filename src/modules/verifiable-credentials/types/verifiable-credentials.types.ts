import { IPresentationDefinition } from '@sphereon/pex';
import { IssuerFields } from './role-credential.types';

/*
 * Parameters required to construct the subject for a role credential
 * https://www.w3.org/TR/vc-data-model/#credential-subject
 */
export interface RoleCredentialSubjectParams {
  /*
   * https://www.w3.org/TR/vc-data-model/#identifiers
   */
  id: string;
  namespace: string;
  version: string;
  issuerFields?: IssuerFields[];
}

export interface ProofOptions {
  verificationMethod?: string;
  proofPurpose?: string;
  challenge?: string;
}

export interface CreatePresentationParams {
  presentationDefinition?: IPresentationDefinition;
}

export interface VerifyVerifiableCredentialResults {
  checks: string[];
  warnings: string[];
  errors: string[];
}
