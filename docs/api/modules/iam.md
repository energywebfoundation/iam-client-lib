# Module: iam

## Table of contents

### Enumerations

- [ENSNamespaceTypes](../enums/iam.ENSNamespaceTypes.md)

### Classes

- [IAM](../classes/iam.IAM.md)

### Interfaces

- [IClaimIssuance](../interfaces/iam.IClaimIssuance.md)
- [IClaimRejection](../interfaces/iam.IClaimRejection.md)
- [IClaimRequest](../interfaces/iam.IClaimRequest.md)
- [IMessage](../interfaces/iam.IMessage.md)

### Type aliases

- [AccountInfo](iam.md#accountinfo)
- [InitializeData](iam.md#initializedata)

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

### InitializeData

Ƭ **InitializeData**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `accountInfo` | [`AccountInfo`](iam.md#accountinfo) \| `undefined` |
| `connected` | `boolean` |
| `did` | `string` \| `undefined` |
| `didDocument` | `IDIDDocument` \| ``null`` |
| `identityToken?` | `string` |
| `realtimeExchangeConnected` | `boolean` |
| `userClosedModal` | `boolean` |
