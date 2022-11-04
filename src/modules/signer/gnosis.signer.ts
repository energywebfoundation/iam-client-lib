import { providers } from 'ethers';
import SafeAppSdk, { SafeInfo } from '@gnosis.pm/safe-apps-sdk';
import { SafeAppProvider } from '@gnosis.pm/safe-apps-provider';
import { ProviderType, SignerT } from './signer.types';
import { SignerService } from './signer.service';

/**
 * @description Intended for use in Volta Gnosis web interface(https://volta.gnosis-safe.io/).
 * Dapp should provide SafeAppSdk injected by Gnosis interface
 */
export const fromGnosis = async (safeAppSdk: SafeAppSdk) => {
  const safeInfo = await safeAppSdk.safe.getInfo();
  const gnosisProvider = new SafeAppProvider(safeInfo, safeAppSdk);
  const provider = new providers.Web3Provider(gnosisProvider);
  const signerService = new SignerService(
    Object.assign(provider.getSigner(), { safeInfo }),
    ProviderType.Gnosis
  );
  return signerService;
};

export interface GnosisSigner extends SignerT {
  safeInfo: SafeInfo;
}
