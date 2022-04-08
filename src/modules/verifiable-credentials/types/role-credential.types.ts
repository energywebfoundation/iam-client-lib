import { CredentialSubject } from '@ew-did-registry/credentials-interface';

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
