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

import WalletConnectProvider from "@walletconnect/web3-provider";
import { providers } from "ethers";
import { abi1056, address1056, Operator, Resolver } from "@ew-did-registry/did-ethr-resolver";

import { EnrolmentFormData } from "./models/enrolment-form-data";
import {
  DIDAttribute,
  IDIDDocument,
  IResolverSettings,
  IUpdateData,
  ProviderTypes,
} from "@ew-did-registry/did-resolver-interface";
import { Methods } from "@ew-did-registry/did";
import { DIDDocumentFull } from "@ew-did-registry/did-document";
import { Keys } from "@ew-did-registry/keys";

type ConnectionOptions = {
  rpcUrl: string;
  chainId?: number;
  infuraId?: string;
};

type InitializeData = {
  did: string | undefined;
  connected: boolean;
  userClosedModal: boolean;
};


/**
 * Decentralized Identity and Access Management (IAM) Type
 */
export class IAM {
  private _did: string | undefined;
  private _provider: providers.Web3Provider | undefined;
  private _walletConnectProvider: WalletConnectProvider;
  private _address: string | undefined;
  private _signer: providers.JsonRpcSigner | undefined;
  private _resolverSetting: IResolverSettings;
  private _resolver: Resolver | undefined;
  private _document: DIDDocumentFull | undefined;

  /**
   * IAM Constructor
   *
   * @param {object} options connection options to connect with wallet connect
   * @param {string} options.rpcUrl url to the ethereum network
   * @param {number} options.chainID id of chain, default = 1
   * @param {number} options.infuraId id of infura network, default = undefined
   *
   */
  public constructor({ rpcUrl, chainId = 1, infuraId }: ConnectionOptions) {
    this._walletConnectProvider = new WalletConnectProvider({
      rpc: {
        [chainId]: rpcUrl,
      },
      infuraId,
    });
    this._resolverSetting = {
      provider: {
        uriOrInfo: rpcUrl,
        type: ProviderTypes.HTTP,
      },
      abi: abi1056,
      address: address1056,
      method: Methods.Erc1056,
    };
  }

  // INITIAL

  private async init() {
    await this._walletConnectProvider.enable();
    this._provider = new providers.Web3Provider(this._walletConnectProvider);
    this.setAddress();
    this.setResolver();
    this.setSigner();
    this.setDid();
    await this.setDocument();
  }

  private setAddress() {
    this._address = this._walletConnectProvider.accounts[0];
  }

  private setSigner() {
    this._signer = this._provider?.getSigner();
  }

  private setResolver() {
    this._resolver = new Resolver(this._resolverSetting);
  }

  private setDid() {
    this._did = `did:etc:${this._address}`;
  }

  private async setDocument() {
    if (this._did) {
      const document = new DIDDocumentFull(
        this._did,
        new Operator(new Keys(), this._resolverSetting)
      );
      await document.create();
      this._document = document;
    }
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

  getSigner(): providers.JsonRpcSigner | undefined {
    return this._signer;
  }

  // CONNECTION

  /**
   * Initialize connection to wallet
   * @description creates web3 provider and establishes secure connection to selected wallet
   * @summary if not connected to wallet will show connection modal, but if already connected (data stored in localStorage) will only return initial data without showing modal
   * @requires needs to be called before any of other methods
   *
   * @returns did string, status of connection and info if the user closed the wallet selection modal
   */
  async initializeConnection(): Promise<InitializeData> {
    try {
      await this.init();
    } catch (err) {
      return {
        did: undefined,
        connected: false,
        userClosedModal: true,
      };
    }

    return {
      did: this.getDid(),
      connected: this.isConnected() || false,
      userClosedModal: false,
    };
  }

  /**
   * Close connection to wallet
   * @description closes the connection between dApp and the wallet
   *
   */

  async closeConnection() {
    await this._walletConnectProvider.close();
    this._did = undefined;
    this._address = undefined;
    this._signer = undefined;
  }

  /**
   * isConnected
   *
   * @returns info if the connection is already established
   *
   */
  isConnected(): boolean {
    return this._walletConnectProvider.connected;
  }

  // DID DOCUMENT

  /**
   * getDidDocument
   *
   * @returns whole did document if connected, if not returns null
   *
   */
  async getDidDocument(): Promise<IDIDDocument | null> {
    if (this._did && this._resolver) {
      return this._resolver.read(this._did);
    }
    return null;
  }

  /**
   * updateDidDocument
   *
   * @description updates did document based on data provided
   * @returns info if did document was updated
   *
   */
  async updateDidDocument({
    didAttribute,
    data,
    validity,
  }: {
    didAttribute: DIDAttribute;
    data: IUpdateData;
    validity?: number;
  }): Promise<boolean> {
    if (this._document) {
      const updated = await this._document.update(didAttribute, data, validity);
      return updated;
    }
    return false;
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
      return this._document.deactivate();
    }
    return false;
  }

  // TODO:
  // Below should contain public and private methods related to IAM.
  // Currently, below methods are dummy methods.

  async getOrgRoles(orgKey: string): Promise<Array<Record<string, unknown>>> {
    // TODO: Retrieve roles based on organization key

    return [{ [orgKey]: orgKey }];
  }

  async enrol(data: EnrolmentFormData): Promise<Record<string, unknown>> {
    const enrolmentStatus = {
      ...data,
    };

    // TODO: Enrol here (Generate DID, etc)

    return enrolmentStatus;
  }

  async getEnrolmentStatus(): Promise<Record<string, unknown>> {
    const enrolmentStatus = {};

    // TODO: Get Enrolment Status here

    return enrolmentStatus;
  }

  public getIdentities() {
    return null;
  }
}
