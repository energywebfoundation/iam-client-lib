import { changeResolverTests } from "./changeResolver.testSuite";
import { didTests } from "./did.testSuit";

export const utilsTests = () => {
    // Skipped until either changeResolver script is changed according with Public Resolver design or there will be no sence in migration
    describe.skip("Change resolver tests", changeResolverTests);
    describe("DID methods tests", didTests);
};
