export class ChangeOwnershipNotPossibleError extends Error {
    constructor({ namespace, notOwnedNamespaces }: { namespace: string; notOwnedNamespaces: string[] }) {
        super(
            `Change ownership of ${namespace} not possible because you're not owner of ${notOwnedNamespaces.join(
                ", ",
            )} ${notOwnedNamespaces.length > 1 ? "namespaces" : "namespace"}`,
        );
    }
}
