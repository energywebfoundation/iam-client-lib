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
import { EnrolmentFormData } from "./models/enrolment-form-data";

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

  /**
   * IAM Constructor
   *
   * @param opts connection options to connect with wallet connect
   */
  public constructor({ rpcUrl, chainId = 1, infuraId }: ConnectionOptions) {
    this._walletConnectProvider = new WalletConnectProvider({
      rpc: {
        [chainId]: rpcUrl,
      },
      infuraId,
    });
  }

  // INITIAL

  private async init() {
    await this._walletConnectProvider.enable();
    this._provider = new providers.Web3Provider(this._walletConnectProvider);
    this.setAddress();
    this.setSigner();
    this.setDid();
  }

  // SETTERS

  private setAddress() {
    this._address = this._walletConnectProvider.accounts[0];
  }

  private setSigner() {
    this._signer = this._provider?.getSigner();
  }

  private setDid(): void {
    this._did = `did:etc:${this._address}`;
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

  // TODO:
  // Below should contain public and private methods related to IAM.
  // Currently, below methods are dummy methods.

  async getOrgRoles(orgKey: string): Promise<Array<Record<string, unknown>>> {
    // TODO: Retrieve roles based on organization key

    return [{[orgKey]: orgKey}];
  }

  async enrol(data: EnrolmentFormData): Promise<Record<string, unknown>> {
    const enrolmentStatus = {
      ...data
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
