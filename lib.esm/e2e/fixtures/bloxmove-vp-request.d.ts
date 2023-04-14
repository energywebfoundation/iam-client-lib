export declare const bloxmoveVpRequest: {
    challenge: string;
    query: {
        type: string;
        credentialQuery: {
            presentationDefinition: {
                id: string;
                input_descriptors: ({
                    id: string;
                    name: string;
                    purpose: string;
                    constraints: {
                        fields: {
                            path: string[];
                            filter: {
                                type: string;
                                const: string;
                            };
                        }[];
                        subject_is_issuer?: undefined;
                    };
                } | {
                    id: string;
                    name: string;
                    purpose: string;
                    constraints: {
                        subject_is_issuer: string;
                        fields: {
                            path: string[];
                            filter: {
                                type: string;
                                const: string;
                            };
                        }[];
                    };
                })[];
            };
        }[];
    }[];
    interact: {
        service: {
            type: string;
            serviceEndpoint: string;
        }[];
    };
};
