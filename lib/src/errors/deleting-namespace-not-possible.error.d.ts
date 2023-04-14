export declare class DeletingNamespaceNotPossibleError extends Error {
    constructor({ namespace, notOwnedNamespaces, }: {
        namespace: string;
        notOwnedNamespaces: string[];
    });
}
