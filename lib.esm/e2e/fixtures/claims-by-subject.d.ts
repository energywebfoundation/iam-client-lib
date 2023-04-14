export declare const claimsBySubject: {
    id: string;
    requester: string;
    subject: string;
    claimType: string;
    registrationTypes: string[];
    claimTypeVersion: string;
    token: string;
    subjectAgreement: string;
    onChainProof: string;
    issuedToken: string;
    isAccepted: boolean;
    createdAt: string;
    acceptedBy: string;
    isRejected: boolean;
    rejectionReason: null;
    namespace: string;
    redirectUri: string;
    vp: {
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
                    VCProof: {
                        name: string;
                        type: string;
                    }[];
                    VC712Domain: {
                        name: string;
                        type: string;
                    }[];
                    EIP712Domain: never[];
                    IssuerFields: {
                        name: string;
                        type: string;
                    }[];
                    VC712DomainData: never[];
                    CredentialSubject: {
                        name: string;
                        type: string;
                    }[];
                    VC712DomainSchema: {
                        name: string;
                        type: string;
                    }[];
                    VerifiableCredential: {
                        name: string;
                        type: string;
                    }[];
                    VerifiablePresentation: {
                        name: string;
                        type: string;
                    }[];
                    VC712DomainTypedDataField: {
                        name: string;
                        type: string;
                    }[];
                };
            };
            proofPurpose: string;
            verificationMethod: string;
        };
        holder: string;
        '@context': string[];
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
    };
}[];
