export declare const validExampleExternalVC: {
    '@context': string[];
    type: string[];
    credentialSubject: {
        id: string;
    };
    issuer: string;
    issuanceDate: string;
    proof: {
        '@context': string;
        type: string;
        proofPurpose: string;
        proofValue: string;
        verificationMethod: string;
        created: string;
        eip712Domain: {
            domain: {
                name: string;
            };
            messageSchema: {
                CredentialSubject: {
                    name: string;
                    type: string;
                }[];
                EIP712Domain: {
                    name: string;
                    type: string;
                }[];
                Proof: {
                    name: string;
                    type: string;
                }[];
                VerifiableCredential: {
                    name: string;
                    type: string;
                }[];
            };
            primaryType: string;
        };
    };
};
export declare const exampleExternalVCWithInvalidSubjectId: {
    '@context': string[];
    type: string[];
    credentialSubject: {
        id: string;
    };
    issuer: string;
    issuanceDate: string;
    proof: {
        '@context': string;
        type: string;
        proofPurpose: string;
        proofValue: string;
        verificationMethod: string;
        created: string;
        eip712Domain: {
            domain: {
                name: string;
            };
            messageSchema: {
                CredentialSubject: {
                    name: string;
                    type: string;
                }[];
                EIP712Domain: {
                    name: string;
                    type: string;
                }[];
                Proof: {
                    name: string;
                    type: string;
                }[];
                VerifiableCredential: {
                    name: string;
                    type: string;
                }[];
            };
            primaryType: string;
        };
    };
};
