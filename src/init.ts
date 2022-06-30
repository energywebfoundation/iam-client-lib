import SafeAppSdk from '@gnosis.pm/safe-apps-sdk';
import {
  EkcSigner,
  fromGnosis,
  fromKms,
  fromMetaMask,
  fromPrivateKey,
  fromWalletConnectMetamask,
  ProviderType,
  SignerService,
} from './modules/signer';
import { StakingFactoryService } from './modules/staking';
import { DidRegistry } from './modules/did-registry';
import { MessagingService } from './modules/messaging';
import { CacheClient } from './modules/cache-client';
import { DomainsService } from './modules/domains';
import { AssetsService } from './modules/assets';
import { ClaimsService } from './modules/claims';
import {
  defaultAzureProxyUrl,
  defaultBridgeUrl,
  defaultKmsServerUrl,
} from './utils';
import { chainConfigs } from './config';
import { getVerifiableCredentialsService } from './modules/verifiable-credentials';

export async function initWithPrivateKeySigner(
  privateKey: string,
  rpcUrl: string
) {
  const signerService = await fromPrivateKey(privateKey, rpcUrl);
  return init(signerService);
}

export async function initWithKms({
  bridge = defaultBridgeUrl,
  kmsServerUrl = defaultKmsServerUrl,
} = {}) {
  return init(await fromKms(bridge, kmsServerUrl));
}

export async function initWithMetamask() {
  return init(await fromMetaMask());
}

export async function initWithWalletConnect(bridge = defaultBridgeUrl) {
  return init(await fromWalletConnectMetamask(bridge));
}

export async function initWithGnosis(safeAppSdk: SafeAppSdk) {
  return init(await fromGnosis(safeAppSdk));
}

export async function initWithEKC(proxyUrl = defaultAzureProxyUrl) {
  const signerService = new SignerService(
    await EkcSigner.create(proxyUrl),
    ProviderType.EKC
  );
  await signerService.init();
  return init(signerService);
}

export async function init(signerService: SignerService) {
  const messagingService = await MessagingService.create(signerService);

  async function connectToCacheServer() {
    const chainId = signerService.chainId;
    const stakingPoolFactoryAddress =
      chainConfigs()[chainId].stakingPoolFactoryAddress;

    const cacheClient = new CacheClient(signerService);
    await cacheClient.init();
    await cacheClient.login();
    const verifiableCredentialsService = await getVerifiableCredentialsService(
      signerService,
      cacheClient
    );
    const domainsService = await DomainsService.create(
      signerService,
      cacheClient
    );

    const stakingAddressProvided =
      stakingPoolFactoryAddress && stakingPoolFactoryAddress.length;

    const stakingPoolService = stakingAddressProvided
      ? await StakingFactoryService.create(signerService, domainsService)
      : null;

    const assetsService = await AssetsService.create(
      signerService,
      cacheClient
    );

    async function connectToDidRegistry(
      ipfsStore?: string
    ): Promise<{ didRegistry: DidRegistry; claimsService: ClaimsService }> {
      const didRegistry = await DidRegistry.connect(
        signerService,
        cacheClient,
        assetsService,
        ipfsStore
      );
      const claimsService = await ClaimsService.create(
        signerService,
        domainsService,
        cacheClient,
        didRegistry,
        verifiableCredentialsService
      );
      return { didRegistry, claimsService };
    }
    return {
      cacheClient,
      domainsService,
      assetsService,
      connectToDidRegistry,
      stakingPoolService,
      verifiableCredentialsService,
    };
  }

  return {
    signerService,
    messagingService,
    connectToCacheServer,
  };
}