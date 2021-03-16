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

import { IAM, ENSNamespaceTypes } from "./iam";
import { ICacheServerClient } from "./cacheServerClient/ICacheServerClient";
import { ERROR_MESSAGES } from "./errors";
import { WalletProvider } from "./types/WalletProvider";
import {
  MessagingMethod,
  NATS_EXCHANGE_TOPIC,
  PreconditionTypes,
  VOLTA_CHAIN_ID
} from "./utils/constants";
import {
  IApp,
  IAppDefinition,
  IOrganization,
  IOrganizationDefinition,
  IRole,
  IRoleDefinition
} from "./cacheServerClient/cacheServerClient.types";

import {
  DIDAttribute,
  Encoding,
  Algorithms,
  PubKeyType
} from "@ew-did-registry/did-resolver-interface";

import { setCacheClientOptions, setChainConfig, setMessagingOptions } from "./iam/chainConfig";

import { getSubdomains } from "./utils/getSubDomains";

// MAIN
export { IAM };

// CONSTANTS

export { NATS_EXCHANGE_TOPIC, VOLTA_CHAIN_ID };

// UTILS

export { getSubdomains, setCacheClientOptions, setChainConfig, setMessagingOptions };

// ENUMS
export {
  DIDAttribute,
  Encoding,
  Algorithms,
  PubKeyType,
  ENSNamespaceTypes,
  MessagingMethod,
  ERROR_MESSAGES,
  WalletProvider,
  PreconditionTypes
};

// TYPES
export {
  ICacheServerClient,
  IApp,
  IAppDefinition,
  IOrganization,
  IOrganizationDefinition,
  IRole,
  IRoleDefinition
};

export { GnosisIam as SafeIam } from "./GnosisIam";
