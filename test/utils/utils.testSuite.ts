import { changeResolverTests } from "./changeResolver.testSuite";
import { didTests } from "./did.testSuit";
import { createIdentityProofTests } from "./createIdentityProof.testSuite";

export const utilsTests = () => {
    describe("Change resolver tests", changeResolverTests);
    describe("DID methods tests", didTests);
    describe("Create IdentityProof tests", createIdentityProofTests);
};
