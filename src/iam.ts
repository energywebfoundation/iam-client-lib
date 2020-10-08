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

import WalletConnectProvider from "@walletconnect/web3-provider";
import { providers, Signer, utils } from "ethers";
import { abi1056, address1056, Operator, Resolver } from "@ew-did-registry/did-ethr-resolver";
import { abi as ensResolverContract } from "@ensdomains/resolver/build/contracts/PublicResolver.json";

import { EnrolmentFormData } from "./models/enrolment-form-data";
import {
  DIDAttribute,
  IDIDDocument,
  IResolverSettings,
  IUpdateData,
  ProviderTypes
} from "@ew-did-registry/did-resolver-interface";
import { Methods } from "@ew-did-registry/did";
import { DIDDocumentFull } from "@ew-did-registry/did-document";
import {
  ClaimsIssuer,
  ClaimsUser,
  ClaimsVerifier,
  IProofData,
  ISaltedFields
} from "@ew-did-registry/claims";
import { DidStore } from "@ew-did-registry/did-ipfs-store";
import { EnsRegistryFactory } from "../ethers/EnsRegistryFactory";
import { PublicResolverFactory } from "../ethers/PublicResolverFactory";
import { EnsRegistry } from "../ethers/EnsRegistry";
import { PublicResolver } from "../ethers/PublicResolver";
import { labelhash, namehash } from "./utils/ENS_hash";
import { JWT } from "@ew-did-registry/jwt";

type ConnectionOptions = {
  rpcUrl: string;
  chainId?: number;
  infuraId?: string;
  ensResolverAddress?: string;
  ensRegistryAddress?: string;
  ipfsUrl?: string;
  bridgeUrl?: string;
};

type InitializeData = {
  did: string | undefined;
  connected: boolean;
  userClosedModal: boolean;
};

export enum ENSPrefixes {
  Roles = "roles",
  Application = "apps",
  Organization = "org"
}

/**
 * Decentralized Identity and Access Management (IAM) Type
 */
export class IAM {
  private _did: string | undefined;
  private _provider: providers.Web3Provider | undefined;
  private _walletConnectProvider: WalletConnectProvider;
  private _address: string | undefined;
  private _signer: Signer | undefined;

  private _resolverSetting: IResolverSettings;
  private _resolver: Resolver | undefined;
  private _document: DIDDocumentFull | undefined;
  private _userClaims: ClaimsUser | undefined;
  private _issuerClaims: ClaimsIssuer | undefined;
  private _verifierClaims: ClaimsVerifier | undefined;
  private _ipfsStore: DidStore;
  private _jwt: JWT | undefined;

  private _ensRegistry: EnsRegistry | undefined;
  private _ensResolver: PublicResolver | undefined;
  private _ensResolverAddress: string;
  private _ensRegistryAddress: string;

  /**
   * IAM Constructor
   *
   * @param {object} options connection options to connect with wallet connect
   * @param {string} options.rpcUrl url to the ethereum network
   * @param {number} options.chainID id of chain, default = 1
   * @param {number} options.infuraId id of infura network, default = undefined
   *
   */
  public constructor({
    rpcUrl,
    chainId = 1,
    infuraId,
    ensRegistryAddress = "0xd7CeF70Ba7efc2035256d828d5287e2D285CD1ac",
    ensResolverAddress = "0x0a97e07c4Df22e2e31872F20C5BE191D5EFc4680",
    ipfsUrl = "https://ipfs.infura.io:5001/api/v0/",
    bridgeUrl = "https://walletconnect.energyweb.org"
  }: ConnectionOptions) {
    this._walletConnectProvider = new WalletConnectProvider({
      rpc: {
        [chainId]: rpcUrl
      },
      infuraId,
      chainId,
      bridge: bridgeUrl
    });
    this._resolverSetting = {
      provider: {
        uriOrInfo: rpcUrl,
        type: ProviderTypes.HTTP
      },
      abi: abi1056,
      address: address1056,
      method: Methods.Erc1056
    };
    this._ensRegistryAddress = ensRegistryAddress;
    this._ensResolverAddress = ensResolverAddress;
    this._ipfsStore = new DidStore(ipfsUrl);
  }

  // INITIAL

  private async init() {
    await this._walletConnectProvider.enable();
    this._provider = new providers.Web3Provider(this._walletConnectProvider);

    this.setAddress();
    this.setResolver();
    this.setSigner();
    this.setDid();
    this.setupENS();
    await this.setDocument();
    this.setClaims();
    this.setJWT();
  }

  private setAddress() {
    this._address = this._walletConnectProvider.accounts[0];
  }

  private setSigner() {
    this._signer = this._provider?.getSigner();
  }

  private setResolver() {
    if (this._resolverSetting) {
      this._resolver = new Resolver(this._resolverSetting);
    }
  }

  private setDid() {
    this._did = `did:${Methods.Erc1056}:${this._address}`;
  }

  private setupENS() {
    if (this._signer) {
      this._ensRegistry = EnsRegistryFactory.connect(this._ensRegistryAddress, this._signer);
      this._ensResolver = PublicResolverFactory.connect(this._ensResolverAddress, this._signer);
    }
  }

  private async setDocument() {
    if (this._did && this._signer) {
      const document = new DIDDocumentFull(
        this._did,
        new Operator(this._signer, this._resolverSetting)
      );
      await document.create();
      this._document = document;
    }
  }

  private setClaims() {
    if (this._signer && this._document) {
      this._userClaims = new ClaimsUser(this._signer, this._document, this._ipfsStore);
      this._issuerClaims = new ClaimsIssuer(this._signer, this._document, this._ipfsStore);
      this._verifierClaims = new ClaimsVerifier(this._signer, this._document, this._ipfsStore);
    }
  }

  private setJWT() {
    if (this._signer) {
      this._jwt = new JWT(this._signer);
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

  getSigner(): providers.JsonRpcSigner | Signer | undefined {
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
      if (err.message === "User closed modal") {
        return {
          did: undefined,
          connected: false,
          userClosedModal: true
        };
      }
      console.log(err);
    }

    return {
      did: this.getDid(),
      connected: this.isConnected() || false,
      userClosedModal: false
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
    validity
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

  /**
   * createPublicClaim
   *
   * @description create a public claim based on data provided
   * @returns JWT token of created claim
   *
   */
  async createPublicClaim({ data }: { data: Record<string, unknown> }) {
    if (this._userClaims) {
      return this._userClaims.createPublicClaim(data);
    }
    return null;
  }

  /**
   * publishPublicClaim
   *
   * @description store claim data in ipfs and save url to DID document services
   * @returns ulr to ipfs
   *
   */
  async publishPublicClaim({
    token,
    claimData
  }: {
    token: string;
    claimData: Record<string, unknown>;
  }) {
    if (this._userClaims) {
      return this._userClaims.publishPublicClaim(token, claimData);
    }
    return null;
  }

  /**
   * createProofClaim
   *
   * @description creates a proof of a claim
   * @returns proof token
   *
   */
  async createProofClaim({
    claimUrl,
    saltedFields
  }: {
    claimUrl: string;
    saltedFields: ISaltedFields;
  }) {
    if (this._userClaims) {
      const encryptedSaltedFields: IProofData = {};
      let counter = 0;
      Object.entries(saltedFields).forEach(([key, value]) => {
        if (counter % 2 === 0) {
          encryptedSaltedFields[key] = {
            value,
            encrypted: true
          };
        } else {
          encryptedSaltedFields[key] = {
            value,
            encrypted: false
          };
        }
        counter++;
      });
      return this._userClaims?.createProofClaim(claimUrl, encryptedSaltedFields);
    }
    return null;
  }

  /**
   * issuePublicClaim
   *
   * @description issue a public claim
   * @returns return issued token
   *
   */
  async issuePublicClaim({ token }: { token: string }) {
    if (this._issuerClaims) {
      return this._issuerClaims.issuePublicClaim(token);
    }
    return null;
  }

  /**
   * verifyPublicClaim
   *
   * @description verifies issued token of claim
   * @returns public claim data
   *
   */
  async verifyPublicClaim({ issuedToken }: { issuedToken: string }) {
    if (this._verifierClaims) {
      return this._verifierClaims.verifyPublicProof(issuedToken);
    }
    return null;
  }

  /**
   * createSelfSignedClaim
   *
   * @description creates self signed claim and upload the data to ipfs
   *
   */
  async createSelfSignedClaim({ data }: { data: Record<string, unknown> }) {
    if (this._userClaims) {
      const claim = await this._userClaims.createPublicClaim(data);
      await this._userClaims.publishPublicClaim(claim, data);
    }
  }

  /**
   * getUserClaims
   *
   * @description get user claims
   *
   */
  async getUserClaims() {
    if (this._resolver && this._did) {
      const document = await this._resolver.read(this._did);
      const services = document.service && document.service.length > 1 ? document.service : [];
      const claims = await Promise.all(
        services.map(async ({ serviceEndpoint, ...rest }) => {
          const data = await this._ipfsStore.get(serviceEndpoint);
          const { claimData } = this._jwt?.decode(data) as { claimData: Record<string, string> };
          return {
            ...rest,
            ...claimData
          };
        })
      );
      return claims;
    }
    return [];
  }

  /// ROLES

  private async createSubdomain({ subdomain, domain }: { subdomain: string; domain: string }) {
    if (this._signer && this._ensRegistry && this._address) {
      const roleHash = labelhash(subdomain) as string;
      const namespaceHash = namehash(domain) as string;
      const ttl = utils.bigNumberify(0);
      const setDomainTx = await this._ensRegistry.setSubnodeRecord(
        namespaceHash,
        roleHash,
        this._address,
        this._ensResolverAddress,
        ttl,
        {
          gasLimit: utils.hexlify(4900000),
          gasPrice: utils.hexlify(0.1)
        }
      );
      await setDomainTx.wait();
      console.log(`Subdomain ${subdomain + "." + domain} created`);
    }
  }

  private async setDomainName({ domain }) {
    if (this._ensResolver) {
      const namespaceHash = namehash(domain) as string;
      const setDomainNameTx = await this._ensResolver.setName(namespaceHash, domain, {
        gasLimit: utils.hexlify(4900000),
        gasPrice: utils.hexlify(0.1)
      });
      await setDomainNameTx.wait();
      console.log(`Set the name of the domain to ${domain}`);
    }
  }

  private async getFilteredDomainsFromEvent({ domain }: { domain: string }) {
    if (this._ensResolver && this._provider) {
      const ensInterface = new utils.Interface(ensResolverContract);
      const Event = this._ensResolver.filters.TextChanged(null, "metadata", null);
      const filter = {
        fromBlock: 0,
        toBlock: "latest",
        address: Event.address,
        topics: [...(Event.topics as string[])]
      };
      const logs = await this._provider.getLogs(filter);
      const rawLogs = logs.map(log => {
        const parsedLog = ensInterface.parseLog(log);
        return parsedLog.values;
      });
      const domains = await Promise.all(
        rawLogs.map(async ({ node }) => {
          return this._ensResolver?.name(node);
        })
      );
      const uniqDomains: Record<string, unknown> = {};
      for (const item of domains) {
        if (item && item.endsWith(domain) && !uniqDomains[item]) {
          uniqDomains[item] = null;
        }
      }
      return Object.keys(uniqDomains);
    }
    return [];
  }

  /**
   * setRoleDefinition
   *
   * @description sets role definition in ENS domain
   * @description please use it only when you want to update role definitions for already created role (domain)
   *
   */
  async setRoleDefinition({ domain, data }: { domain: string; data: string }) {
    if (this._signer && this._ensResolver) {
      const namespaceHash = namehash(domain) as string;
      const setTextTx = await this._ensResolver.setText(namespaceHash, "metadata", data, {
        gasLimit: utils.hexlify(4900000),
        gasPrice: utils.hexlify(0.1)
      });
      await setTextTx.wait();
      console.log(`Added data: ${data} to ${domain} metadata`);
    }
  }

  /**
   * createOrganization
   *
   * @description creates organization (create subdomain, sets the domain name and sets the role definition to metadata record in ENS Domain)
   * @description and sets subdomain for roles and app for org namespace
   *
   */
  async createOrganization({
    orgName,
    data,
    namespace,
    returnSteps
  }: {
    orgName: string;
    data: string;
    namespace: string;
    returnSteps?: boolean;
  }) {
    const newDomain = `${orgName}.${namespace}`;
    const rolesDomain = `${ENSPrefixes.Roles}.${newDomain}`;
    const appsDomain = `${ENSPrefixes.Application}.${newDomain}`;
    const steps = [
      {
        next: () => this.createSubdomain({ subdomain: orgName, domain: namespace }),
        info: "Create organization subdomain"
      },
      {
        next: () => this.setDomainName({ domain: newDomain }),
        info: "Register reverse name for organization subdomain"
      },
      {
        next: () => this.setRoleDefinition({ data, domain: newDomain }),
        info: "Set definition for organization"
      },
      {
        next: () => this.createSubdomain({ subdomain: ENSPrefixes.Roles, domain: newDomain }),
        info: "Create roles subdomain for organization"
      },
      {
        next: () => this.setDomainName({ domain: rolesDomain }),
        info: "Register reverse name for roles subdomain"
      },
      {
        next: () => this.createSubdomain({ subdomain: ENSPrefixes.Application, domain: newDomain }),
        info: "Create app subdomain for organization"
      },
      {
        next: () => this.setDomainName({ domain: appsDomain }),
        info: "Register reverse name for app subdomain"
      }
    ];
    if (returnSteps) {
      return steps;
    }
    for (const { next } of steps) {
      await next();
    }
    return [];
  }

  /**
   * createApp
   *
   * @description creates role (create subdomain, sets the domain name and sets the role definition to metadata record in ENS Domain)
   * @description creates roles subdomain for the app namespace
   *
   */
  async createApplication({
    appName,
    namespace,
    data,
    returnSteps
  }: {
    appName: string;
    namespace: string;
    data: string;
    returnSteps?: boolean;
  }) {
    const newDomain = `${appName}.${namespace}`;
    const rolesNamespace = `${ENSPrefixes.Roles}.${newDomain}`;
    const steps = [
      {
        next: () => this.createSubdomain({ subdomain: appName, domain: namespace }),
        info: "Set subdomain for application"
      },
      {
        next: () => this.setDomainName({ domain: newDomain }),
        info: "Set name for application"
      },
      {
        next: () => this.setRoleDefinition({ data, domain: newDomain }),
        info: "Set definition for application"
      },
      {
        next: () => this.createSubdomain({ subdomain: ENSPrefixes.Roles, domain: newDomain }),
        info: "Create roles subdomain for application"
      },
      {
        next: () => this.setDomainName({ domain: rolesNamespace }),
        info: "Set name for roles subdomain for application"
      }
    ];
    if (returnSteps) {
      return steps;
    }
    for (const { next } of steps) {
      await next();
    }
    return [];
  }

  /**
   * createRole
   *
   * @description creates role (create subdomain, sets the domain name and sets the role definition to metadata record in ENS Domain)
   * @returns information (true/false) if the role was created
   *
   */
  async createRole({
    roleName,
    namespace,
    data,
    returnSteps
  }: {
    roleName: string;
    namespace: string;
    data: string;
    returnSteps?: boolean;
  }) {
    const newDomain = `${roleName}.${namespace}`;
    const steps = [
      {
        next: () => this.createSubdomain({ subdomain: roleName, domain: namespace }),
        info: "Create subdomain for role"
      },
      {
        next: () => this.setDomainName({ domain: newDomain }),
        info: "Set name for role"
      },
      {
        next: () => this.setRoleDefinition({ data, domain: newDomain }),
        info: "Set role definition for role"
      }
    ];
    if (returnSteps) {
      return steps;
    }
    for (const { next } of steps) {
      await next();
    }
    return [];
  }

  /**
   * getRoleDefinition
   *
   * @description get role definition form ens domain metadata record
   * @returns metadata string or empty string when there is no metadata
   *
   */
  async getRoleDefinition({ roleName }: { roleName: string }) {
    if (this._ensResolver) {
      const roleHash = namehash(roleName);
      const meta = await this._ensResolver.text(roleHash, "metadata");
      return meta;
    }
    return "";
  }

  /**
   * getSubdomains
   *
   * @description get all subdomains for certain domain
   * @returns array of subdomains or empty array when there is no subdomains
   *
   */
  async getSubdomains({ domain }: { domain: string }) {
    if (this._ensRegistry) {
      const domains = await this.getFilteredDomainsFromEvent({ domain });
      const role = domain.split(".");
      const subdomains: Record<string, null> = {};
      for (const name of domains) {
        const nameArray = name.split(".").reverse();
        if (nameArray.length <= role.length) return;
        subdomains[nameArray[role.length]] = null;
      }
      return Object.keys(subdomains);
    }
    return [];
  }

  /**
   * checkExistenceOfDomain
   *
   * @description check existence of domain in ENS registry
   * @returns true or false whatever the domain is present
   *
   */
  async checkExistenceOfDomain({ domain }: { domain: string }) {
    if (this._ensRegistry) {
      const domainHash = namehash(domain);
      return this._ensRegistry.recordExists(domainHash);
    }
    return false;
  }

  /**
   * isOwner
   *
   * @description check ownership of the domain
   * @default if user is not specified it will check the current logged user
   * @returns true or false whatever the passed is user is a owner of domain
   *
   */
  async isOwner({ domain, user = this._address }: { domain: string; user?: string }) {
    if (this._ensRegistry) {
      const domainHash = namehash(domain);
      const owner = await this._ensRegistry.owner(domainHash);
      return owner === user;
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
