import SafeAppSdk from '@gnosis.pm/safe-apps-sdk';
import { SignerService } from './signer.service';
/**
 * @description Intended for use in Volta Gnosis web interface(https://volta.gnosis-safe.io/).
 * Dapp should provide SafeAppSdk injected by Gnosis interface
 */
export declare const fromGnosis: (safeAppSdk: SafeAppSdk) => Promise<SignerService>;
