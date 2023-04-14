import SafeAppSdk from '@gnosis.pm/safe-apps-sdk';
import { SignerService } from './modules/signer';
import { StakingFactoryService } from './modules/staking';
import { DidRegistry, IpfsConfig } from './modules/did-registry';
import { MessagingService } from './modules/messaging';
import { CacheClient } from './modules/cache-client';
import { DomainsService } from './modules/domains';
import { AssetsService } from './modules/assets';
import { ClaimsService } from './modules/claims';
export declare function initWithPrivateKeySigner(privateKey: string, rpcUrl: string): Promise<{
    signerService: SignerService;
    messagingService: MessagingService;
    connectToCacheServer: () => Promise<{
        cacheClient: CacheClient;
        domainsService: DomainsService;
        assetsService: AssetsService;
        connectToDidRegistry: (ipfsConfig: IpfsConfig) => Promise<{
            didRegistry: DidRegistry;
            claimsService: ClaimsService;
        }>;
        stakingPoolService: StakingFactoryService | null;
        verifiableCredentialsService: import("./modules/verifiable-credentials").VerifiableCredentialsServiceBase;
    }>;
}>;
export declare function initWithKms({ bridge, kmsServerUrl, }?: {
    bridge?: string | undefined;
    kmsServerUrl?: string | undefined;
}): Promise<{
    signerService: SignerService;
    messagingService: MessagingService;
    connectToCacheServer: () => Promise<{
        cacheClient: CacheClient;
        domainsService: DomainsService;
        assetsService: AssetsService;
        connectToDidRegistry: (ipfsConfig: IpfsConfig) => Promise<{
            didRegistry: DidRegistry;
            claimsService: ClaimsService;
        }>;
        stakingPoolService: StakingFactoryService | null;
        verifiableCredentialsService: import("./modules/verifiable-credentials").VerifiableCredentialsServiceBase;
    }>;
}>;
export declare function initWithMetamask(): Promise<{
    signerService: SignerService;
    messagingService: MessagingService;
    connectToCacheServer: () => Promise<{
        cacheClient: CacheClient;
        domainsService: DomainsService;
        assetsService: AssetsService;
        connectToDidRegistry: (ipfsConfig: IpfsConfig) => Promise<{
            didRegistry: DidRegistry;
            claimsService: ClaimsService;
        }>;
        stakingPoolService: StakingFactoryService | null;
        verifiableCredentialsService: import("./modules/verifiable-credentials").VerifiableCredentialsServiceBase;
    }>;
}>;
export declare function initWithWalletConnect(bridge?: string): Promise<{
    signerService: SignerService;
    messagingService: MessagingService;
    connectToCacheServer: () => Promise<{
        cacheClient: CacheClient;
        domainsService: DomainsService;
        assetsService: AssetsService;
        connectToDidRegistry: (ipfsConfig: IpfsConfig) => Promise<{
            didRegistry: DidRegistry;
            claimsService: ClaimsService;
        }>;
        stakingPoolService: StakingFactoryService | null;
        verifiableCredentialsService: import("./modules/verifiable-credentials").VerifiableCredentialsServiceBase;
    }>;
}>;
export declare function initWithGnosis(safeAppSdk: SafeAppSdk): Promise<{
    signerService: SignerService;
    messagingService: MessagingService;
    connectToCacheServer: () => Promise<{
        cacheClient: CacheClient;
        domainsService: DomainsService;
        assetsService: AssetsService;
        connectToDidRegistry: (ipfsConfig: IpfsConfig) => Promise<{
            didRegistry: DidRegistry;
            claimsService: ClaimsService;
        }>;
        stakingPoolService: StakingFactoryService | null;
        verifiableCredentialsService: import("./modules/verifiable-credentials").VerifiableCredentialsServiceBase;
    }>;
}>;
export declare function initWithEKC(proxyUrl?: string): Promise<{
    signerService: SignerService;
    messagingService: MessagingService;
    connectToCacheServer: () => Promise<{
        cacheClient: CacheClient;
        domainsService: DomainsService;
        assetsService: AssetsService;
        connectToDidRegistry: (ipfsConfig: IpfsConfig) => Promise<{
            didRegistry: DidRegistry;
            claimsService: ClaimsService;
        }>;
        stakingPoolService: StakingFactoryService | null;
        verifiableCredentialsService: import("./modules/verifiable-credentials").VerifiableCredentialsServiceBase;
    }>;
}>;
/**
 * Initializes messaging service and creates initializer of cache client
 *
 * @param signerService initialized instance of signer service
 */
export declare function init(signerService: SignerService): Promise<{
    signerService: SignerService;
    messagingService: MessagingService;
    connectToCacheServer: () => Promise<{
        cacheClient: CacheClient;
        domainsService: DomainsService;
        assetsService: AssetsService;
        connectToDidRegistry: (ipfsConfig: IpfsConfig) => Promise<{
            didRegistry: DidRegistry;
            claimsService: ClaimsService;
        }>;
        stakingPoolService: StakingFactoryService | null;
        verifiableCredentialsService: import("./modules/verifiable-credentials").VerifiableCredentialsServiceBase;
    }>;
}>;
