import {
  CredentialSubject,
  VerifiableCredential,
} from '@ew-did-registry/credentials-interface';
import { has } from 'lodash';

export interface IssuerFields {
  key: string;
  value: string | number;
}

export interface RoleCredentialSubject extends CredentialSubject {
  /*
   * https://www.w3.org/TR/vc-data-model/#identifiers
   */
  id: string;

  role: {
    namespace: string;
    version: string;
  };
  issuerFields: IssuerFields[];
}

export function isRoleCredential(
  credential: VerifiableCredential<CredentialSubject>
): credential is VerifiableCredential<RoleCredentialSubject> {
  const { credentialSubject } = credential;
  return (
    has(credentialSubject, 'id') &&
    has(credentialSubject, 'role') &&
    has(credentialSubject, 'issuerFields')
  );
}
