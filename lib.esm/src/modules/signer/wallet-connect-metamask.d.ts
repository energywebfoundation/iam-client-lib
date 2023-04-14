import Web3Provider from '@walletconnect/ethereum-provider';
import { SignerService } from './signer.service';
export declare const fromWalletConnectMetamask: (bridge: string, infuraId?: string | undefined) => Promise<SignerService>;
export declare const createWalletConnectProvider: (bridge: string, infuraId?: string | undefined) => Web3Provider;
