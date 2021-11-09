# Module: init

## Table of contents

### Functions

- [init](init.md#init)
- [initWithEKC](init.md#initwithekc)
- [initWithGnosis](init.md#initwithgnosis)
- [initWithKms](init.md#initwithkms)
- [initWithMetamask](init.md#initwithmetamask)
- [initWithPrivateKeySigner](init.md#initwithprivatekeysigner)
- [initWithWalletConnect](init.md#initwithwalletconnect)

## Functions

### init

▸ **init**(`signerService`): `Promise`<`Object`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerService` | [`SignerService`](../classes/modules_signer_signer_service.SignerService.md) |

#### Returns

`Promise`<`Object`\>

___

### initWithEKC

▸ **initWithEKC**(`proxyUrl?`): `Promise`<`Object`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `proxyUrl` | `string` |

#### Returns

`Promise`<`Object`\>

___

### initWithGnosis

▸ **initWithGnosis**(`safeAppSdk`): `Promise`<`Object`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `safeAppSdk` | `SafeAppSdk` |

#### Returns

`Promise`<`Object`\>

___

### initWithKms

▸ **initWithKms**(`__namedParameters?`): `Promise`<`Object`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.bridge` |  |
| `__namedParameters.kmsServerUrl` |  |

#### Returns

`Promise`<`Object`\>

___

### initWithMetamask

▸ **initWithMetamask**(): `Promise`<`Object`\>

#### Returns

`Promise`<`Object`\>

___

### initWithPrivateKeySigner

▸ **initWithPrivateKeySigner**(`privateKey`, `rpcUrl`): `Promise`<`Object`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `privateKey` | `string` |
| `rpcUrl` | `string` |

#### Returns

`Promise`<`Object`\>

___

### initWithWalletConnect

▸ **initWithWalletConnect**(`bridge?`): `Promise`<`Object`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `bridge` | `string` |

#### Returns

`Promise`<`Object`\>
