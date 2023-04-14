export declare const STATUS_LIST_CREDENTIAL: {
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
                EIP712Domain: never[];
                StatusList2021: {
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
        type: string;
        encodedList: string;
        statusPurpose: string;
    };
};
