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

    /**
     * getDidDocument
     *
     * @returns whole did document if connected, if not returns null
     *
     */
    async getDidDocument({
        did = this._did,
        includeClaims = true,
    }: { did?: string; includeClaims?: boolean } | undefined = {}) {
        if (this._cacheClient && did) {
            try {
                const didDoc = await this._cacheClient.getDidDocument({ did, includeClaims });
                return {
                    ...didDoc,
                    service: didDoc.service as (IServiceEndpoint & ClaimData)[],
                };
            } catch (err) {
                if ((err as AxiosError).response?.status === 401) {
                    throw err;
                }
                console.log(err);
            }
        }

        if (did && this._resolver) {
            const document = await this._resolver.read(did);
            return {
                ...document,
                service: includeClaims
                    ? await this.downloadClaims({
                          services: document.service && document.service.length > 0 ? document.service : [],
                      })
                    : [],
            };
        }
        throw new Error(ERROR_MESSAGES.USER_NOT_LOGGED_IN);
    }

    /**
     * @param options Options to connect with blockchain
     *
     * @param options.didAttribute Type of document to be updated
     *
     * @param options.data New attribute value
     * @param options.did Asset did to be updated
     * @param options.validity Time (s) for the attribute to expire
     *
     * @description updates did document based on data provided
     * @returns true if document is updated successfuly
     *
     */
    async updateDidDocument(options: {
        didAttribute: DIDAttribute;
        data: IUpdateData;
        did?: string;
        validity?: number;
    }): Promise<boolean> {
        const { didAttribute, data, validity, did } = options;

        if (!did) {
            if (!this._document) {
                throw new Error(ERROR_MESSAGES.DID_DOCUMENT_NOT_INITIALIZED);
            }
            const updated = await this._document.update(didAttribute, data, validity);
            return Boolean(updated);
        }

        if (!this._didSigner) {
            throw new Error(ERROR_MESSAGES.SIGNER_NOT_INITIALIZED);
        }

        const updateData: IUpdateData = {
            algo: Algorithms.Secp256k1,
            encoding: Encoding.HEX,
            ...data,
        };

        const operator = new ProxyOperator(this._didSigner, this._registrySetting, addressOf(did));
        const update = await operator.update(did, didAttribute, updateData);

        return Boolean(update);
    }

    /**
     * revokeDidDocument
     *
     * @description revokes did document
     * @returns information (true/false) if the DID document was revoked
     *
     */
    async revokeDidDocument(): Promise<boolean> {
        if (this._document) {
            await this._document.deactivate();
            return true;
        }
        throw new Error(ERROR_MESSAGES.DID_DOCUMENT_NOT_INITIALIZED);
    }

    async decodeJWTToken({ token }: { token: string }) {
        if (!this._jwt) {
            throw new Error(ERROR_MESSAGES.JWT_NOT_INITIALIZED);
        }
        return this._jwt.decode(token);
    }

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
