import { IAM } from "../../src/iam";
import { rootOwner } from "../iam.test";
import { rpcUrl } from "../setup_contracts";

export function ekcSignerTests() {
  test("init IAM with connected DID registry", async () => {
    const iam = new IAM({
      privateKey: rootOwner.privateKey,
      rpcUrl,
    });

    await iam.initializeConnection({
      initCacheServer: false,
      initDID: true,
      reinitializeMetamask: false,
      proxyURL: "http://localhost:5000/api/v1"
    });
  });
}