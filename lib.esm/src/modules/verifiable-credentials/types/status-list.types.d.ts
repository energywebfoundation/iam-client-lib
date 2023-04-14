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
export declare type StatusList2021Credential = VerifiableCredential<StatusList2021CredentialSubject>;
export interface CredentialRevocationDetailsResult {
    revoker: string;
    timestamp: number;
}
export declare const statusList2021CredentialEIP712Types: {
    EIP712Domain: never[];
    VerifiableCredential: {
        name: string;
        type: string;
    }[];
    StatusList2021: {
        name: string;
        type: string;
    }[];
    Proof: {
        name: string;
        type: string;
    }[];
};
