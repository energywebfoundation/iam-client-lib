import { IAM } from "../src/iam";
import { ERROR_MESSAGES } from "../src/errors";
import { rpcUrl } from "./setup_contracts";
import { WalletProvider } from "../src/types/WalletProvider";

const iam_withoutKey = new IAM({ rpcUrl });

export const initializeConnectionTests = () => {
  test("initializeConnection requires privateKey or walletProvider enum", async () => {
    await expect(iam_withoutKey.initializeConnection()).rejects.toThrow(
      ERROR_MESSAGES.WALLET_TYPE_NOT_PROVIDED
    );
  });

  test("initializeConnection requires walletProvider to be known value", async () => {
    // Typescript only checks on transpilation, need to verify error is thrown if unsupported value is passed in.
    await expect(
      iam_withoutKey.initializeConnection({ walletProvider: "not_a_provider" as WalletProvider })
    ).rejects.toThrow(ERROR_MESSAGES.WALLET_PROVIDER_NOT_SUPPORTED);
  });
};
