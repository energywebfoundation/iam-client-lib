export class DeletingNamespaceNotPossibleError extends Error {
    constructor({ namespace, notOwnedNamespaces }: { namespace: string; notOwnedNamespaces: string[] }) {
        super(
            `Deleting ${namespace} not possible because you're not owner of ${notOwnedNamespaces.join(", ")} ${
                notOwnedNamespaces.length > 1 ? "namespaces" : "namespace"
            }`,
        );
    }
}
