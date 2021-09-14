import { changeResolverTests } from "./changeResolver.testSuite";
import { didTests } from "./did.testSuit";
import { createIdentityProofTests } from "./createIdentityProof.testSuite";

export const utilsTests = () => {
    // Skipped until either changeResolver script is changed according with Public Resolver design or there will be no sence in migration
    describe.skip("Change resolver tests", changeResolverTests);
    describe("DID methods tests", didTests);
    describe("Create IdentityProof tests", createIdentityProofTests);
};
