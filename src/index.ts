// Copyright 2020 Energy Web Foundation
// This file is part of IAM Client Library brought to you by the Energy Web Foundation,
// a global non-profit organization focused on accelerating blockchain technology across the energy sector,
// incorporated in Zug, Switzerland.
//
// The IAM Client Library is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// This is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY and without an implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details, at <http://www.gnu.org/licenses/>.
//
// @authors: Kim Honoridez

export * from './init';
export * from './modules/assets';
export * from './modules/cacheClient';
export * from './modules/claims';
export * from './modules/didRegistry';
export * from './modules/domains';
export * from './modules/messaging';
export * from './modules/signer';
export * from './modules/staking';
export * from './errors';
export * from './config';
export * from './utils';

export { PubKeyType, DIDAttribute } from '@ew-did-registry/did-resolver-interface';

export { PreconditionType, IRoleDefinition } from '@energyweb/iam-contracts';
