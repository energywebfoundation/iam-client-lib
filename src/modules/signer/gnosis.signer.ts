import { providers } from 'ethers';
import SafeAppSdk from '@gnosis.pm/safe-apps-sdk';
import { SafeAppProvider } from '@gnosis.pm/safe-apps-provider';
import { ProviderType } from './signer.types';
import { SignerService } from './signer.service';

/**
 * @description Intended for use in Volta Gnosis web interface(https://volta.gnosis-safe.io/).
 * Dapp should provide SafeAppSdk injected by Gnosis interface
 */
export const fromGnosis = async (safeAppSdk: SafeAppSdk) => {
  const gnosisProvider = new SafeAppProvider(
    await safeAppSdk.safe.getInfo(),
    safeAppSdk
  );
  const provider = new providers.Web3Provider(gnosisProvider);
  const signerService = new SignerService(
    provider.getSigner(),
    ProviderType.Gnosis
  );
  return signerService;
};
