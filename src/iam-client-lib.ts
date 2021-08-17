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

import { IAM } from "./iam";
import { ICacheClient } from "./modules/cacheClient/ICacheClient";
import { ERROR_MESSAGES } from "./errors";
import { MessagingMethod, NATS_EXCHANGE_TOPIC, VOLTA_CHAIN_ID } from "./utils/constants";
import {
    IApp,
    IOrganization,
    IRole,
    Asset,
    AssetHistory,
    AssetHistoryEventType,
    Order,
    ClaimData,
    Profile,
    AssetProfiles,
    AssetProfile,
    RegistrationTypes,
} from "./modules/cacheClient/cacheClient.types";

import { DIDAttribute, Encoding, Algorithms, PubKeyType } from "@ew-did-registry/did-resolver-interface";

export { initWithPrivateKeySigner } from "./init";
export {
    IRoleDefinition,
    IAppDefinition,
    IOrganizationDefinition,
    PreconditionType as PreconditionTypes,
    WITHDRAW_DELAY,
    PRINCIPAL_THRESHOLD,
} from "@energyweb/iam-contracts";

// MAIN
export { IAM };

// CONSTANTS

export { NATS_EXCHANGE_TOPIC, VOLTA_CHAIN_ID };

// UTILS

// ENUMS
export {
    DIDAttribute,
    Encoding,
    Algorithms,
    PubKeyType,
    MessagingMethod,
    ERROR_MESSAGES,
    Order,
    AssetHistoryEventType,
    RegistrationTypes,
};
export { SignerService } from "../src/modules/signer/signer.service";

// TYPES
export {
    ICacheClient as ICacheServerClient,
    IApp,
    IOrganization,
    IRole,
    Asset,
    AssetHistory,
    ClaimData,
    Profile,
    AssetProfiles,
    AssetProfile,
};

export * from "./utils/did";
