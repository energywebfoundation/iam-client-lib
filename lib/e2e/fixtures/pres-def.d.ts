export declare const presentationDefinition: {
    id: string;
    input_descriptors: {
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
        };
    }[];
};
