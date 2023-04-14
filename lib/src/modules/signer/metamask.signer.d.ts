import { SignerService } from './signer.service';
export declare const fromMetaMask: () => Promise<SignerService>;
export declare const isMetamaskExtensionPresent: () => Promise<{
    isMetamaskPresent: boolean;
    chainId: number | undefined;
}>;
