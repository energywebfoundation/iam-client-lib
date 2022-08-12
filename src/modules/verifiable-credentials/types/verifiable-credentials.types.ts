import { IssuerFields } from '@energyweb/credential-governance';
import { StatusList2021Entry } from '@ew-did-registry/credentials-interface';
import { IPresentationDefinition, SelectResults } from '@sphereon/pex';
import { InterfaceNotSatisfied } from '../../../errors/interface-not-satisfied';

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

  /** Indicates if credential is actual of time of verification */
  credentialStatus?: StatusList2021Entry;
}
export const validateRoleCredentialSubject = (
  subject: RoleCredentialSubjectParams
) => {
  const invalidField = subject.issuerFields?.find(
    (field) => !['string', 'number', 'boolean'].includes(typeof field.value)
  );
  if (invalidField) {
    throw new InterfaceNotSatisfied(
      'RoleCredentialSubjectParam',
      `IssuerFields invalid: ${invalidField.key} is not string or number`
    );
  }
};

export interface ProofOptions {
  /* Proof verification method */
  verificationMethod?: string;

  /* Proof purpose */
  proofPurpose?: string;

  /* Proof challenge */
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
  presentationDefinition: IPresentationDefinition;
  selectResults: SelectResults;
}
