import { ChainId } from '..';
import { providers } from 'ethers';
import { Signer } from 'ethers';
/**
 * @description - Checks that role issuers of all roles under `rootDomain` contains method-specific-id and adds it if missing
 * `signer` must own `rootDomain` on `targetChain`
 */
export declare const updateLegacyDomains: ({ rootDomain, signer, chainId, dryRun, }: {
    rootDomain: string;
    signer: Signer;
    chainId: ChainId;
    dryRun?: boolean | undefined;
}) => Promise<Record<string, unknown>[]>;
export declare const transferDomain: ({ rootDomain, signer, newOwner, chainId, dryRun, }: {
    rootDomain: string;
    signer: Signer;
    newOwner: string;
    chainId: ChainId;
    dryRun?: boolean | undefined;
}) => Promise<void>;
export declare const initDomains: (signer: Signer, chainId: ChainId) => Promise<{
    provider: providers.JsonRpcProvider;
    ensRegistry: import("../../ethers/ENSRegistry").ENSRegistry;
    domainReader: any;
    transactionFactory: any;
    domainHierarchy: any;
    domainNotifier: import("../../ethers/DomainNotifier").DomainNotifier;
    ensResolverV2Address: string;
    ensResolverAddress: string;
    ensPublicResolverAddress: string;
    chainName: import("@ew-did-registry/did").Chain;
}>;
