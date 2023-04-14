export declare const selectResults: {
    errors: never[];
    matches: {
        name: string;
        rule: string;
        vc_path: string[];
    }[];
    areRequiredCredentialsPresent: string;
    verifiableCredential: {
        id: string;
        type: string[];
        proof: {
            type: string;
            created: string;
            '@context': string;
            proofValue: string;
            eip712Domain: {
                domain: {};
                primaryType: string;
                messageSchema: {
                    Proof: {
                        name: string;
                        type: string;
                    }[];
                    EWFRole: {
                        name: string;
                        type: string;
                    }[];
                    EIP712Domain: never[];
                    IssuerFields: {
                        name: string;
                        type: string;
                    }[];
                    CredentialSubject: {
                        name: string;
                        type: string;
                    }[];
                    VerifiableCredential: {
                        name: string;
                        type: string;
                    }[];
                };
            };
            proofPurpose: string;
            verificationMethod: string;
        };
        issuer: string;
        '@context': string[];
        issuanceDate: string;
        credentialSubject: {
            id: string;
            role: {
                version: string;
                namespace: string;
            };
            issuerFields: {
                key: string;
                value: string;
            }[];
        };
    }[];
    warnings: never[];
};
