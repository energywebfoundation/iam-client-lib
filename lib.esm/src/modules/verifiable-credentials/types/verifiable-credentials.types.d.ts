import { IssuerFields } from '@energyweb/credential-governance';
import { StatusList2021Entry } from '@ew-did-registry/credentials-interface';
import { IPresentationDefinition, SelectResults } from '@sphereon/pex';
export interface RoleCredentialSubjectParams {
    id: string;
    namespace: string;
    version: string;
    issuerFields?: IssuerFields[];
    expirationDate?: Date;
    /** Indicates if credential is actual of time of verification */
    credentialStatus?: StatusList2021Entry;
}
export declare const validateRoleCredentialSubject: (subject: RoleCredentialSubjectParams) => void;
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
export interface InitiateExchangeResults {
    presentationDefinition: IPresentationDefinition;
    selectResults: SelectResults;
}
