export declare class ChangeOwnershipNotPossibleError extends Error {
    constructor({ namespace, notOwnedNamespaces, }: {
        namespace: string;
        notOwnedNamespaces: string[];
    });
}
