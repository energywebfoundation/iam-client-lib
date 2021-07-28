import { ekcSignerTests } from "./EKCSignerTests";
import { noSignerTests } from "./noSignerTests";

export function signerTests() {
  describe("No signer tests", noSignerTests);
  describe("EKC signer tests", ekcSignerTests);
}