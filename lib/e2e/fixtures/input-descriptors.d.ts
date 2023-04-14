export declare const descriptors: ({
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
