# iam-client-lib

## Table of contents

### Enumerations

- [AssetHistoryEventType](enums/AssetHistoryEventType.md)
- [ClaimEventType](enums/ClaimEventType.md)
- [ERROR\_MESSAGES](enums/ERROR_MESSAGES.md)
- [ExecutionEnvironment](enums/ExecutionEnvironment.md)
- [MessagingMethod](enums/MessagingMethod.md)
- [NamespaceType](enums/NamespaceType.md)
- [Order](enums/Order.md)
- [ProviderEvent](enums/ProviderEvent.md)
- [ProviderType](enums/ProviderType.md)
- [RegistrationTypes](enums/RegistrationTypes.md)
- [SearchType](enums/SearchType.md)
- [StakeStatus](enums/StakeStatus.md)

### Classes

- [AssetsService](classes/AssetsService.md)
- [CacheClient](classes/CacheClient.md)
- [ChangeOwnershipNotPossibleError](classes/ChangeOwnershipNotPossibleError.md)
- [ClaimsService](classes/ClaimsService.md)
- [DeletingNamespaceNotPossibleError](classes/DeletingNamespaceNotPossibleError.md)
- [DidRegistry](classes/DidRegistry.md)
- [DomainsService](classes/DomainsService.md)
- [ENSOwnerNotValidAddressError](classes/ENSOwnerNotValidAddressError.md)
- [ENSTypeNotSupportedError](classes/ENSTypeNotSupportedError.md)
- [EkcSigner](classes/EkcSigner.md)
- [MalformedDIDError](classes/MalformedDIDError.md)
- [MessagingService](classes/MessagingService.md)
- [MethodNotAvailableInNodeEnvError](classes/MethodNotAvailableInNodeEnvError.md)
- [SignerService](classes/SignerService.md)
- [StakingFactoryService](classes/StakingFactoryService.md)
- [StakingPool](classes/StakingPool.md)
- [StakingPoolService](classes/StakingPoolService.md)
- [StakingService](classes/StakingService.md)

### Interfaces

- [Asset](interfaces/Asset.md)
- [AssetHistory](interfaces/AssetHistory.md)
- [AssetProfile](interfaces/AssetProfile.md)
- [AssetProfiles](interfaces/AssetProfiles.md)
- [CacheServerClientOptions](interfaces/CacheServerClientOptions.md)
- [ChainConfig](interfaces/ChainConfig.md)
- [Claim](interfaces/Claim.md)
- [ClaimData](interfaces/ClaimData.md)
- [IApp](interfaces/IApp.md)
- [ICacheClient](interfaces/ICacheClient.md)
- [IClaimIssuance](interfaces/IClaimIssuance.md)
- [IClaimRejection](interfaces/IClaimRejection.md)
- [IClaimRequest](interfaces/IClaimRequest.md)
- [IMessage](interfaces/IMessage.md)
- [IOrganization](interfaces/IOrganization.md)
- [IPubKeyAndIdentityToken](interfaces/IPubKeyAndIdentityToken.md)
- [IRole](interfaces/IRole.md)
- [MessagingConfig](interfaces/MessagingConfig.md)
- [Profile](interfaces/Profile.md)

### Type aliases

- [AccountInfo](modules.md#accountinfo)
- [AssetsFilter](modules.md#assetsfilter)
- [ChainId](modules.md#chainid)
- [ClaimsFilter](modules.md#claimsfilter)
- [IssueClaim](modules.md#issueclaim)
- [RejectClaim](modules.md#rejectclaim)
- [RequestClaim](modules.md#requestclaim)
- [Service](modules.md#service)
- [ServiceInitializer](modules.md#serviceinitializer)
- [Stake](modules.md#stake)

### Variables

- [IS\_ETH\_SIGNER](modules.md#is_eth_signer)
- [NODE\_FIELDS\_KEY](modules.md#node_fields_key)
- [PUBLIC\_KEY](modules.md#public_key)
- [TEST\_LOGIN\_ENDPOINT](modules.md#test_login_endpoint)
- [VOLTA\_CHAIN\_ID](modules.md#volta_chain_id)
- [agreement\_type\_hash](modules.md#agreement_type_hash)
- [defaultAzureProxyUrl](modules.md#defaultazureproxyurl)
- [defaultBridgeUrl](modules.md#defaultbridgeurl)
- [defaultClaimExpiry](modules.md#defaultclaimexpiry)
- [defaultKmsServerUrl](modules.md#defaultkmsserverurl)
- [didPattern](modules.md#didpattern)
- [emptyAddress](modules.md#emptyaddress)
- [erc712\_type\_hash](modules.md#erc712_type_hash)
- [proof\_type\_hash](modules.md#proof_type_hash)
- [typedMsgPrefix](modules.md#typedmsgprefix)

### Functions

- [addSupportedDID](modules.md#addsupporteddid)
- [cacheConfigs](modules.md#cacheconfigs)
- [chainConfigs](modules.md#chainconfigs)
- [compareDID](modules.md#comparedid)
- [createWalletConnectProvider](modules.md#createwalletconnectprovider)
- [executionEnvironment](modules.md#executionenvironment)
- [fromGnosis](modules.md#fromgnosis)
- [fromKms](modules.md#fromkms)
- [fromMetaMask](modules.md#frommetamask)
- [fromPrivateKey](modules.md#fromprivatekey)
- [fromWalletConnectMetamask](modules.md#fromwalletconnectmetamask)
- [getMessagingConfig](modules.md#getmessagingconfig)
- [init](modules.md#init)
- [initWithEKC](modules.md#initwithekc)
- [initWithGnosis](modules.md#initwithgnosis)
- [initWithKms](modules.md#initwithkms)
- [initWithMetamask](modules.md#initwithmetamask)
- [initWithPrivateKeySigner](modules.md#initwithprivatekeysigner)
- [initWithWalletConnect](modules.md#initwithwalletconnect)
- [isMetamaskExtensionPresent](modules.md#ismetamaskextensionpresent)
- [isValidDID](modules.md#isvaliddid)
- [readyToBeRegisteredOnchain](modules.md#readytoberegisteredonchain)
- [setCacheConfig](modules.md#setcacheconfig)
- [setChainConfig](modules.md#setchainconfig)
- [setMessagingConfig](modules.md#setmessagingconfig)
- [supportedDIDMethods](modules.md#supporteddidmethods)

## Type aliases

### AccountInfo

Ƭ **AccountInfo**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `account` | `string` |
| `chainId` | `number` |
| `chainName` | `string` |

___

### AssetsFilter

Ƭ **AssetsFilter**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `order?` | [`Order`](enums/Order.md) |
| `skip?` | `number` |
| `take?` | `number` |
| `type?` | [`AssetHistoryEventType`](enums/AssetHistoryEventType.md) |

___

### ChainId

Ƭ **ChainId**: `number`

___

### ClaimsFilter

Ƭ **ClaimsFilter**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `isAccepted?` | `boolean` |
| `namespace?` | `string` |

___

### IssueClaim

Ƭ **IssueClaim**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `issuer` | `string` |
| `message` | [`IClaimIssuance`](interfaces/IClaimIssuance.md) |

___

### RejectClaim

Ƭ **RejectClaim**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `issuer` | `string` |
| `message` | [`IClaimRejection`](interfaces/IClaimRejection.md) |

___

### RequestClaim

Ƭ **RequestClaim**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `message` | [`IClaimRequest`](interfaces/IClaimRequest.md) |
| `requester` | `string` |

___

### Service

Ƭ **Service**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `org` | `string` | organization ENS name |
| `pool` | `string` | pool address |
| `provider` | `string` | provider address |

___

### ServiceInitializer

Ƭ **ServiceInitializer**: () => `Promise`<`void`\>

#### Type declaration

▸ (): `Promise`<`void`\>

##### Returns

`Promise`<`void`\>

___

### Stake

Ƭ **Stake**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | `BigNumber` |
| `depositEnd` | `BigNumber` |
| `depositStart` | `BigNumber` |
| `status` | [`StakeStatus`](enums/StakeStatus.md) |

## Variables

### IS\_ETH\_SIGNER

• **IS\_ETH\_SIGNER**: ``"isEthSigner"``

___

### NODE\_FIELDS\_KEY

• **NODE\_FIELDS\_KEY**: ``"metadata"``

___

### PUBLIC\_KEY

• **PUBLIC\_KEY**: ``"PublicKey"``

___

### TEST\_LOGIN\_ENDPOINT

• **TEST\_LOGIN\_ENDPOINT**: ``"/auth/status"``

___

### VOLTA\_CHAIN\_ID

• **VOLTA\_CHAIN\_ID**: ``73799``

___

### agreement\_type\_hash

• **agreement\_type\_hash**: `string`

___

### defaultAzureProxyUrl

• **defaultAzureProxyUrl**: ``"https://azure-proxy-server.energyweb.org/api/v1"``

___

### defaultBridgeUrl

• **defaultBridgeUrl**: ``"https://bridge.walletconnect.org"``

___

### defaultClaimExpiry

• **defaultClaimExpiry**: `number`

___

### defaultKmsServerUrl

• **defaultKmsServerUrl**: ``"https://km.aws.energyweb.org/connect/new"``

___

### didPattern

• **didPattern**: ``"^(?:did:(?<method>[a-z0-9]+?):)((?<chain>[a-z0-9]+?):)?(?<id>0x[A-Fa-f0-9]{40})$"``

___

### emptyAddress

• **emptyAddress**: ``"0x0000000000000000000000000000000000000000"``

___

### erc712\_type\_hash

• **erc712\_type\_hash**: `string`

___

### proof\_type\_hash

• **proof\_type\_hash**: `string`

___

### typedMsgPrefix

• **typedMsgPrefix**: ``"1901"``

## Functions

### addSupportedDID

▸ **addSupportedDID**(`methodWithChain`, `validator`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `methodWithChain` | `string` |
| `validator` | (`did`: `string`) => `boolean` |

#### Returns

`void`

___

### cacheConfigs

▸ `Const` **cacheConfigs**(): `Object`

#### Returns

`Object`

___

### chainConfigs

▸ `Const` **chainConfigs**(): `Object`

#### Returns

`Object`

___

### compareDID

▸ **compareDID**(`didA`, `didB`): `boolean`

**`description`** For verification which envolves legacy and chain-specific DID's

#### Parameters

| Name | Type |
| :------ | :------ |
| `didA` | `string` |
| `didB` | `string` |

#### Returns

`boolean`

___

### createWalletConnectProvider

▸ `Const` **createWalletConnectProvider**(`bridge`, `infuraId?`): `WalletConnectProvider`

#### Parameters

| Name | Type |
| :------ | :------ |
| `bridge` | `string` |
| `infuraId?` | `string` |

#### Returns

`WalletConnectProvider`

___

### executionEnvironment

▸ `Const` **executionEnvironment**(): `ExecutionEnvironment`

#### Returns

`ExecutionEnvironment`

___

### fromGnosis

▸ `Const` **fromGnosis**(`safeAppSdk`): `Promise`<[`SignerService`](classes/SignerService.md)\>

**`description`** Intended for use in Volta Gnosis web interface(https://volta.gnosis-safe.io/).
Dapp should provide SafeAppSdk injected by Gnosis interface

#### Parameters

| Name | Type |
| :------ | :------ |
| `safeAppSdk` | `SafeAppsSDK` |

#### Returns

`Promise`<[`SignerService`](classes/SignerService.md)\>

___

### fromKms

▸ **fromKms**(`bridge`, `kmsServerUrl`, `infuraId?`): `Promise`<[`SignerService`](classes/SignerService.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `bridge` | `string` |
| `kmsServerUrl` | `string` |
| `infuraId?` | `string` |

#### Returns

`Promise`<[`SignerService`](classes/SignerService.md)\>

___

### fromMetaMask

▸ `Const` **fromMetaMask**(): `Promise`<[`SignerService`](classes/SignerService.md)\>

#### Returns

`Promise`<[`SignerService`](classes/SignerService.md)\>

___

### fromPrivateKey

▸ `Const` **fromPrivateKey**(`privateKey`, `rpcUrl`): `Promise`<[`SignerService`](classes/SignerService.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `privateKey` | `string` |
| `rpcUrl` | `string` |

#### Returns

`Promise`<[`SignerService`](classes/SignerService.md)\>

___

### fromWalletConnectMetamask

▸ `Const` **fromWalletConnectMetamask**(`bridge`, `infuraId?`): `Promise`<[`SignerService`](classes/SignerService.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `bridge` | `string` |
| `infuraId?` | `string` |

#### Returns

`Promise`<[`SignerService`](classes/SignerService.md)\>

___

### getMessagingConfig

▸ `Const` **getMessagingConfig**(): `Object`

#### Returns

`Object`

___

### init

▸ **init**(`signerService`): `Promise`<{ `connectToCacheServer`: () => `Promise`<{ `assetsService`: [`AssetsService`](classes/AssetsService.md) ; `cacheClient`: [`CacheClient`](classes/CacheClient.md) ; `connectToDidRegistry`: (`ipfsStore?`: `string`) => `Promise`<{ `claimsService`: [`ClaimsService`](classes/ClaimsService.md) ; `didRegistry`: [`DidRegistry`](classes/DidRegistry.md)  }\> ; `domainsService`: [`DomainsService`](classes/DomainsService.md) ; `stakingPoolService`: ``null`` \| [`StakingFactoryService`](classes/StakingFactoryService.md) ; `stakingService`: ``null`` \| [`StakingService`](classes/StakingService.md)  }\> ; `messagingService`: [`MessagingService`](classes/MessagingService.md) ; `signerService`: [`SignerService`](classes/SignerService.md)  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerService` | [`SignerService`](classes/SignerService.md) |

#### Returns

`Promise`<{ `connectToCacheServer`: () => `Promise`<{ `assetsService`: [`AssetsService`](classes/AssetsService.md) ; `cacheClient`: [`CacheClient`](classes/CacheClient.md) ; `connectToDidRegistry`: (`ipfsStore?`: `string`) => `Promise`<{ `claimsService`: [`ClaimsService`](classes/ClaimsService.md) ; `didRegistry`: [`DidRegistry`](classes/DidRegistry.md)  }\> ; `domainsService`: [`DomainsService`](classes/DomainsService.md) ; `stakingPoolService`: ``null`` \| [`StakingFactoryService`](classes/StakingFactoryService.md) ; `stakingService`: ``null`` \| [`StakingService`](classes/StakingService.md)  }\> ; `messagingService`: [`MessagingService`](classes/MessagingService.md) ; `signerService`: [`SignerService`](classes/SignerService.md)  }\>

___

### initWithEKC

▸ **initWithEKC**(`proxyUrl?`): `Promise`<{ `connectToCacheServer`: () => `Promise`<{ `assetsService`: [`AssetsService`](classes/AssetsService.md) ; `cacheClient`: [`CacheClient`](classes/CacheClient.md) ; `connectToDidRegistry`: (`ipfsStore?`: `string`) => `Promise`<{ `claimsService`: [`ClaimsService`](classes/ClaimsService.md) ; `didRegistry`: [`DidRegistry`](classes/DidRegistry.md)  }\> ; `domainsService`: [`DomainsService`](classes/DomainsService.md) ; `stakingPoolService`: ``null`` \| [`StakingFactoryService`](classes/StakingFactoryService.md) ; `stakingService`: ``null`` \| [`StakingService`](classes/StakingService.md)  }\> ; `messagingService`: [`MessagingService`](classes/MessagingService.md) ; `signerService`: [`SignerService`](classes/SignerService.md)  }\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `proxyUrl` | `string` | `defaultAzureProxyUrl` |

#### Returns

`Promise`<{ `connectToCacheServer`: () => `Promise`<{ `assetsService`: [`AssetsService`](classes/AssetsService.md) ; `cacheClient`: [`CacheClient`](classes/CacheClient.md) ; `connectToDidRegistry`: (`ipfsStore?`: `string`) => `Promise`<{ `claimsService`: [`ClaimsService`](classes/ClaimsService.md) ; `didRegistry`: [`DidRegistry`](classes/DidRegistry.md)  }\> ; `domainsService`: [`DomainsService`](classes/DomainsService.md) ; `stakingPoolService`: ``null`` \| [`StakingFactoryService`](classes/StakingFactoryService.md) ; `stakingService`: ``null`` \| [`StakingService`](classes/StakingService.md)  }\> ; `messagingService`: [`MessagingService`](classes/MessagingService.md) ; `signerService`: [`SignerService`](classes/SignerService.md)  }\>

___

### initWithGnosis

▸ **initWithGnosis**(`safeAppSdk`): `Promise`<{ `connectToCacheServer`: () => `Promise`<{ `assetsService`: [`AssetsService`](classes/AssetsService.md) ; `cacheClient`: [`CacheClient`](classes/CacheClient.md) ; `connectToDidRegistry`: (`ipfsStore?`: `string`) => `Promise`<{ `claimsService`: [`ClaimsService`](classes/ClaimsService.md) ; `didRegistry`: [`DidRegistry`](classes/DidRegistry.md)  }\> ; `domainsService`: [`DomainsService`](classes/DomainsService.md) ; `stakingPoolService`: ``null`` \| [`StakingFactoryService`](classes/StakingFactoryService.md) ; `stakingService`: ``null`` \| [`StakingService`](classes/StakingService.md)  }\> ; `messagingService`: [`MessagingService`](classes/MessagingService.md) ; `signerService`: [`SignerService`](classes/SignerService.md)  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `safeAppSdk` | `SafeAppsSDK` |

#### Returns

`Promise`<{ `connectToCacheServer`: () => `Promise`<{ `assetsService`: [`AssetsService`](classes/AssetsService.md) ; `cacheClient`: [`CacheClient`](classes/CacheClient.md) ; `connectToDidRegistry`: (`ipfsStore?`: `string`) => `Promise`<{ `claimsService`: [`ClaimsService`](classes/ClaimsService.md) ; `didRegistry`: [`DidRegistry`](classes/DidRegistry.md)  }\> ; `domainsService`: [`DomainsService`](classes/DomainsService.md) ; `stakingPoolService`: ``null`` \| [`StakingFactoryService`](classes/StakingFactoryService.md) ; `stakingService`: ``null`` \| [`StakingService`](classes/StakingService.md)  }\> ; `messagingService`: [`MessagingService`](classes/MessagingService.md) ; `signerService`: [`SignerService`](classes/SignerService.md)  }\>

___

### initWithKms

▸ **initWithKms**(`__namedParameters?`): `Promise`<{ `connectToCacheServer`: () => `Promise`<{ `assetsService`: [`AssetsService`](classes/AssetsService.md) ; `cacheClient`: [`CacheClient`](classes/CacheClient.md) ; `connectToDidRegistry`: (`ipfsStore?`: `string`) => `Promise`<{ `claimsService`: [`ClaimsService`](classes/ClaimsService.md) ; `didRegistry`: [`DidRegistry`](classes/DidRegistry.md)  }\> ; `domainsService`: [`DomainsService`](classes/DomainsService.md) ; `stakingPoolService`: ``null`` \| [`StakingFactoryService`](classes/StakingFactoryService.md) ; `stakingService`: ``null`` \| [`StakingService`](classes/StakingService.md)  }\> ; `messagingService`: [`MessagingService`](classes/MessagingService.md) ; `signerService`: [`SignerService`](classes/SignerService.md)  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.bridge` | `undefined` \| `string` |
| `__namedParameters.kmsServerUrl` | `undefined` \| `string` |

#### Returns

`Promise`<{ `connectToCacheServer`: () => `Promise`<{ `assetsService`: [`AssetsService`](classes/AssetsService.md) ; `cacheClient`: [`CacheClient`](classes/CacheClient.md) ; `connectToDidRegistry`: (`ipfsStore?`: `string`) => `Promise`<{ `claimsService`: [`ClaimsService`](classes/ClaimsService.md) ; `didRegistry`: [`DidRegistry`](classes/DidRegistry.md)  }\> ; `domainsService`: [`DomainsService`](classes/DomainsService.md) ; `stakingPoolService`: ``null`` \| [`StakingFactoryService`](classes/StakingFactoryService.md) ; `stakingService`: ``null`` \| [`StakingService`](classes/StakingService.md)  }\> ; `messagingService`: [`MessagingService`](classes/MessagingService.md) ; `signerService`: [`SignerService`](classes/SignerService.md)  }\>

___

### initWithMetamask

▸ **initWithMetamask**(): `Promise`<{ `connectToCacheServer`: () => `Promise`<{ `assetsService`: [`AssetsService`](classes/AssetsService.md) ; `cacheClient`: [`CacheClient`](classes/CacheClient.md) ; `connectToDidRegistry`: (`ipfsStore?`: `string`) => `Promise`<{ `claimsService`: [`ClaimsService`](classes/ClaimsService.md) ; `didRegistry`: [`DidRegistry`](classes/DidRegistry.md)  }\> ; `domainsService`: [`DomainsService`](classes/DomainsService.md) ; `stakingPoolService`: ``null`` \| [`StakingFactoryService`](classes/StakingFactoryService.md) ; `stakingService`: ``null`` \| [`StakingService`](classes/StakingService.md)  }\> ; `messagingService`: [`MessagingService`](classes/MessagingService.md) ; `signerService`: [`SignerService`](classes/SignerService.md)  }\>

#### Returns

`Promise`<{ `connectToCacheServer`: () => `Promise`<{ `assetsService`: [`AssetsService`](classes/AssetsService.md) ; `cacheClient`: [`CacheClient`](classes/CacheClient.md) ; `connectToDidRegistry`: (`ipfsStore?`: `string`) => `Promise`<{ `claimsService`: [`ClaimsService`](classes/ClaimsService.md) ; `didRegistry`: [`DidRegistry`](classes/DidRegistry.md)  }\> ; `domainsService`: [`DomainsService`](classes/DomainsService.md) ; `stakingPoolService`: ``null`` \| [`StakingFactoryService`](classes/StakingFactoryService.md) ; `stakingService`: ``null`` \| [`StakingService`](classes/StakingService.md)  }\> ; `messagingService`: [`MessagingService`](classes/MessagingService.md) ; `signerService`: [`SignerService`](classes/SignerService.md)  }\>

___

### initWithPrivateKeySigner

▸ **initWithPrivateKeySigner**(`privateKey`, `rpcUrl`): `Promise`<{ `connectToCacheServer`: () => `Promise`<{ `assetsService`: [`AssetsService`](classes/AssetsService.md) ; `cacheClient`: [`CacheClient`](classes/CacheClient.md) ; `connectToDidRegistry`: (`ipfsStore?`: `string`) => `Promise`<{ `claimsService`: [`ClaimsService`](classes/ClaimsService.md) ; `didRegistry`: [`DidRegistry`](classes/DidRegistry.md)  }\> ; `domainsService`: [`DomainsService`](classes/DomainsService.md) ; `stakingPoolService`: ``null`` \| [`StakingFactoryService`](classes/StakingFactoryService.md) ; `stakingService`: ``null`` \| [`StakingService`](classes/StakingService.md)  }\> ; `messagingService`: [`MessagingService`](classes/MessagingService.md) ; `signerService`: [`SignerService`](classes/SignerService.md)  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `privateKey` | `string` |
| `rpcUrl` | `string` |

#### Returns

`Promise`<{ `connectToCacheServer`: () => `Promise`<{ `assetsService`: [`AssetsService`](classes/AssetsService.md) ; `cacheClient`: [`CacheClient`](classes/CacheClient.md) ; `connectToDidRegistry`: (`ipfsStore?`: `string`) => `Promise`<{ `claimsService`: [`ClaimsService`](classes/ClaimsService.md) ; `didRegistry`: [`DidRegistry`](classes/DidRegistry.md)  }\> ; `domainsService`: [`DomainsService`](classes/DomainsService.md) ; `stakingPoolService`: ``null`` \| [`StakingFactoryService`](classes/StakingFactoryService.md) ; `stakingService`: ``null`` \| [`StakingService`](classes/StakingService.md)  }\> ; `messagingService`: [`MessagingService`](classes/MessagingService.md) ; `signerService`: [`SignerService`](classes/SignerService.md)  }\>

___

### initWithWalletConnect

▸ **initWithWalletConnect**(`bridge?`): `Promise`<{ `connectToCacheServer`: () => `Promise`<{ `assetsService`: [`AssetsService`](classes/AssetsService.md) ; `cacheClient`: [`CacheClient`](classes/CacheClient.md) ; `connectToDidRegistry`: (`ipfsStore?`: `string`) => `Promise`<{ `claimsService`: [`ClaimsService`](classes/ClaimsService.md) ; `didRegistry`: [`DidRegistry`](classes/DidRegistry.md)  }\> ; `domainsService`: [`DomainsService`](classes/DomainsService.md) ; `stakingPoolService`: ``null`` \| [`StakingFactoryService`](classes/StakingFactoryService.md) ; `stakingService`: ``null`` \| [`StakingService`](classes/StakingService.md)  }\> ; `messagingService`: [`MessagingService`](classes/MessagingService.md) ; `signerService`: [`SignerService`](classes/SignerService.md)  }\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `bridge` | `string` | `defaultBridgeUrl` |

#### Returns

`Promise`<{ `connectToCacheServer`: () => `Promise`<{ `assetsService`: [`AssetsService`](classes/AssetsService.md) ; `cacheClient`: [`CacheClient`](classes/CacheClient.md) ; `connectToDidRegistry`: (`ipfsStore?`: `string`) => `Promise`<{ `claimsService`: [`ClaimsService`](classes/ClaimsService.md) ; `didRegistry`: [`DidRegistry`](classes/DidRegistry.md)  }\> ; `domainsService`: [`DomainsService`](classes/DomainsService.md) ; `stakingPoolService`: ``null`` \| [`StakingFactoryService`](classes/StakingFactoryService.md) ; `stakingService`: ``null`` \| [`StakingService`](classes/StakingService.md)  }\> ; `messagingService`: [`MessagingService`](classes/MessagingService.md) ; `signerService`: [`SignerService`](classes/SignerService.md)  }\>

___

### isMetamaskExtensionPresent

▸ `Const` **isMetamaskExtensionPresent**(): `Promise`<{ `chainId`: `undefined` \| `number` ; `isMetamaskPresent`: `boolean` = !!provider }\>

#### Returns

`Promise`<{ `chainId`: `undefined` \| `number` ; `isMetamaskPresent`: `boolean` = !!provider }\>

___

### isValidDID

▸ **isValidDID**(`did`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `did` | `string` |

#### Returns

`boolean`

___

### readyToBeRegisteredOnchain

▸ `Const` **readyToBeRegisteredOnchain**(`claim`): claim is Required<Pick<Claim, "token" \| "subjectAgreement" \| "onChainProof" \| "acceptedBy"\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `claim` | `object` |

#### Returns

claim is Required<Pick<Claim, "token" \| "subjectAgreement" \| "onChainProof" \| "acceptedBy"\>\>

___

### setCacheConfig

▸ `Const` **setCacheConfig**(`chainId`, `options`): `void`

Used to override existing cache server configuration or add a missing one
Configuration must be set before constructing `IAM`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | `number` |
| `options` | `Partial`<[`CacheServerClientOptions`](interfaces/CacheServerClientOptions.md)\> |

#### Returns

`void`

___

### setChainConfig

▸ `Const` **setChainConfig**(`chainId`, `config`): `void`

Used to override existing chain configuration or add a missing one
Configuration must be set before constructing `IAM`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | `number` |
| `config` | `Partial`<[`ChainConfig`](interfaces/ChainConfig.md)\> |

#### Returns

`void`

___

### setMessagingConfig

▸ `Const` **setMessagingConfig**(`chainId`, `options`): `void`

Used to override existing messaging configuration or add a missing one
Configuration must be set before constructing `IAM`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | `number` |
| `options` | `Partial`<[`MessagingConfig`](interfaces/MessagingConfig.md)\> |

#### Returns

`void`

___

### supportedDIDMethods

▸ **supportedDIDMethods**(): `string`[]

#### Returns

`string`[]
