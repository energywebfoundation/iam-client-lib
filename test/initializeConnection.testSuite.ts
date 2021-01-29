import { IAM } from "../src/iam";
import { ERROR_MESSAGES } from "../src/iam/iam-base";
import { rpcUrl } from "./iam.test";

const iam_withoutKey = new IAM({rpcUrl});

export const initializeConnectionTests = () => {
  
  test("initializeConnection requires privateKey or walletProvider enum", async () => {
    await expect(iam_withoutKey.initializeConnection()).rejects.toThrow(ERROR_MESSAGES.WALLET_TYPE_NOT_PROVIDED);
  });

  test("initializeConnection requires walletProvider to be known value", async () => {
    // Typescript only checks on transpilation, need to verify error is thrown if unsupported value is passed in.
    // @ts-ignore
    await expect(iam_withoutKey.initializeConnection({ walletProvider: "not_a_provider" })).rejects.toThrow(ERROR_MESSAGES.WALLET_PROVIDER_NOT_SUPPORTED)
  })

}