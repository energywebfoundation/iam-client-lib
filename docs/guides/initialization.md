# Initialization

Because of dependencies between modules they should be initialized in right order. This is achieved by accessing module initializer from initialization function of required module.

1. Initializing signer service. It will initialize staking and messaging services and allow to connect to cache server

```typescript
const {
  signerService,
  stakingService,
  messagingService,
  connectToCacheServer,
  isSessionActive,
  storeSession,
} = await initWithPrivateKeySigner(privateKey, rpcUrl);
```

2. Connecting to cache server. Depending on signer type signature might be requested

```typescript
// IAM has builtin default settings for VOLTA CHAIN, which can overriden
setChainConfig(1111, {
  didContractAddress: '0x3e2fb24edc3536d655720280b427c91bcb55f3d6',
  ensRegistryAddress: '0xa372d665f83197a63bbe633ebe19c7bfd4943003',
  ensResolverAddress: '0xe878bdcf5148307378043bfd2b584909aa48a227',
  rpcUrl: 'http://some-rpc.com',
});

setMessagingOptions(1111, {
  messagingMethod: MessagingMethod.Nats,
  natsServerUrl: 'https://some-exchange-server.com',
});

setCacheClientOptions(1111, {
  url: 'https://some-cache-server.com/',
  cacheServerSupportsAuth: true,
});

const { cacheClient, domainsService, connectToDidRegistry } =
  await connectToCacheServer();
```

3. Connecting to DID registry.

```typescript
const { didRegistry, claimsService } = await connectToDidRegistry();
```
