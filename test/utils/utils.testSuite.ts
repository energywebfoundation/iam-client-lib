import { changeResolverTests } from "./changeResolver.testSuite";
import { didTests } from "./did.testSuit";

export const utilsTests = () => {
  describe("Change resolver tests", changeResolverTests);
  describe("DID methods tests", didTests);
};
