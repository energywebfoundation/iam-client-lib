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
// @authors: Daniel Wojno

import { providers, Signer } from "ethers";
import {
    Algorithms,
    DIDAttribute,
    Encoding,
    IDIDDocument,
    IServiceEndpoint,
    IUpdateData,
} from "@ew-did-registry/did-resolver-interface";
import { ProxyOperator } from "@ew-did-registry/proxyidentity";
import { IAMBase } from "./iam/iam-base";
import { ERROR_MESSAGES } from "./errors";
import { ClaimData, RegistrationTypes } from "./modules/cacheClient/cacheClient.types";
import detectEthereumProvider from "@metamask/detect-provider";
import { NATS_EXCHANGE_TOPIC } from "./utils/constants";
import { Subscription } from "nats.ws";
import { AxiosError } from "axios";
import { addressOf } from "@ew-did-registry/did-ethr-resolver";

export type InitializeData = {
    did: string | undefined;
    connected: boolean;
    userClosedModal: boolean;
    didDocument: IDIDDocument | null;
    identityToken?: string;
    realtimeExchangeConnected: boolean;
};

export interface IMessage {
    id: string;
    requester: string;
    claimIssuer?: string[];
}

export interface IClaimRequest extends IMessage {
    token: string;
    registrationTypes: RegistrationTypes[];
    subjectAgreement?: string;
}

export interface IClaimIssuance extends IMessage {
    // issuedToken is is only provided in the case of off-chain role
    issuedToken?: string;
    // onChainProof is only provided in case of on-chain role
    onChainProof?: string;
    acceptedBy: string;
}

export interface IClaimRejection extends IMessage {
    isRejected: boolean;
}

/**
 * Decentralized Identity and Access Management (IAM) Type
 */
export class IAM extends IAMBase {
    private _subscriptions: Subscription[] = [];
    static async isMetamaskExtensionPresent() {
        const provider = (await detectEthereumProvider({ mustBeMetaMask: true })) as
            | {
                  request: any;
              }
            | undefined;

        const chainId = (await provider?.request({
            method: "eth_chainId",
        })) as number | undefined;

        return { isMetamaskPresent: !!provider, chainId };
    }

    // GETTERS

    /**
     * Get DID
     *
     * @returns did string if connected to wallet, if not returns undefined
     */

    getDid(): string | undefined {
        return this._did;
    }

    /**
     * Get signer
     *
     * @returns JsonRpcSigner if connected to wallet, if not returns undefined
     */

    getSigner(): providers.JsonRpcSigner | Signer | undefined {
        return this._signer;
    }

    /**
     * Get the current initialized provider type
     *
     * @returns provider type if the session is active if not undefined
     */
    getProviderType() {
        return this._providerType;
    }

    // DID DOCUMENT

    

    /// ROLES

    async subscribeTo({
        subject = `${this._did}.${NATS_EXCHANGE_TOPIC}`,
        messageHandler,
    }: {
        subject?: string;
        messageHandler: (data: IMessage) => void;
    }) {
        if (!this._natsConnection) {
            return;
        }
        const subscription = this._natsConnection.subscribe(subject, {
            callback: (err, msg) => {
                if (err) {
                    console.error(`Nats error:${err.message}`);
                    return;
                }
                const decodedMessage = this._jsonCodec?.decode(msg.data) as IMessage;
                messageHandler(decodedMessage);
            },
        });
        this._subscriptions.push(subscription);
        return subscription.getID();
    }

    async unsubscribeFrom(subscriptionId: number) {
        const i = this._subscriptions.findIndex((s) => s.getID() === subscriptionId);
        if (i !== -1) {
            this._subscriptions.splice(i, 1)[0].unsubscribe();
        }
    }

    // CLAIMS

    // ### ASSETS ###
}
