import { CredentialSubject, VerifiableCredential } from '@ew-did-registry/credentials-interface';
export interface IssuerFields {
    key: string;
    value: string | number;
}
export interface RoleCredentialSubject extends CredentialSubject {
    id: string;
    role: {
        namespace: string;
        version: string;
    };
    issuerFields: IssuerFields[];
}
export declare function isRoleCredential(credential: VerifiableCredential<CredentialSubject>): credential is VerifiableCredential<RoleCredentialSubject>;
