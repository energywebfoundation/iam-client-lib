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

import { providers, Signer, utils, Wallet } from "ethers";
import {
    IRoleDefinition,
    IAppDefinition,
    IOrganizationDefinition,
    PreconditionType,
    EncodedCall,
    DomainReader,
} from "@energyweb/iam-contracts";
import {
    Algorithms,
    DIDAttribute,
    Encoding,
    IDIDDocument,
    IServiceEndpoint,
    IUpdateData,
} from "@ew-did-registry/did-resolver-interface";
import { hashes, IProofData, IPublicClaim, ISaltedFields } from "@ew-did-registry/claims";
import { ProxyOperator } from "@ew-did-registry/proxyidentity";
import { v4 as uuid } from "uuid";
import { IAMBase } from "./iam/iam-base";
import {
    CacheClientNotProvidedError,
    ChangeOwnershipNotPossibleError,
    DeletingNamespaceNotPossibleError,
    ENSRegistryNotInitializedError,
    ENSResolverNotInitializedError,
    ENSTypeNotSupportedError,
    ERROR_MESSAGES,
    NATSConnectionNotEstablishedError,
} from "./errors";
import {
    AssetHistoryEventType,
    ClaimData,
    IOrganization,
    Order,
    RegistrationTypes,
} from "./cacheServerClient/cacheServerClient.types";
import detectEthereumProvider from "@metamask/detect-provider";
import { WalletProvider } from "./types/WalletProvider";
import {
    defaultClaimExpiry,
    emptyAddress,
    erc712_type_hash,
    NATS_EXCHANGE_TOPIC,
    proof_type_hash,
    typedMsgPrefix,
} from "./utils/constants";
import { Subscription } from "nats.ws";
import { AxiosError } from "axios";
import { DIDDocumentFull } from "@ew-did-registry/did-document";
import { Methods } from "@ew-did-registry/did";
import { addressOf } from "@ew-did-registry/did-ethr-resolver";
import { isValidDID, parseDID } from "./utils/did";
import { chainConfigs } from "./iam/chainConfig";
import { canonizeSig } from "./utils/enrollment";
import { JWT } from "@ew-did-registry/jwt";
const { id, keccak256, defaultAbiCoder, solidityKeccak256, arrayify, namehash } = utils;

export type InitializeData = {
    did: string | undefined;
    connected: boolean;
    userClosedModal: boolean;
    didDocument: IDIDDocument | null;
    identityToken?: string;
    realtimeExchangeConnected: boolean;
    accountInfo: AccountInfo | undefined;
};

export type AccountInfo = {
    chainName: string;
    chainId: number;
    account: string;
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

export enum ENSNamespaceTypes {
    Roles = "roles",
    Application = "apps",
    Organization = "org",
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

    /**
     * Initialize connection to wallet
     * @description creates web3 provider and establishes secure connection to selected wallet
     * @summary if not connected to wallet will show connection modal, but if already connected (data stored in localStorage) will only return initial data without showing modal
     * @requires needs to be called before any of other methods
     *
     * @returns did string, status of connection and info if the user closed the wallet selection modal
     */
    async initializeConnection({
        walletProvider = this._providerType,
        reinitializeMetamask,
        initCacheServer = true,
        createDocument = true,
    }: {
        walletProvider?: WalletProvider;
        reinitializeMetamask?: boolean;
        initCacheServer?: boolean;
        createDocument?: boolean;
    } = {}): Promise<InitializeData> {
        const { privateKey } = this._connectionOptions;
        let accountInfo: AccountInfo | undefined = undefined;

        if (!walletProvider && !privateKey) {
            throw new Error(ERROR_MESSAGES.WALLET_TYPE_NOT_PROVIDED);
        }
        if (walletProvider && !Object.values(WalletProvider).includes(walletProvider)) {
            throw new Error(ERROR_MESSAGES.WALLET_PROVIDER_NOT_SUPPORTED);
        }
        try {
            accountInfo = await this.init({
                initializeMetamask: reinitializeMetamask,
                walletProvider,
            });
            if (initCacheServer) {
                await this.connectToCacheServer();
            }
            if (createDocument) {
                await this.connectToDIDRegistry();
            }
        } catch (err) {
            if ((err as Error).message === "User closed modal") {
                return {
                    did: undefined,
                    connected: false,
                    userClosedModal: true,
                    didDocument: null,
                    realtimeExchangeConnected: false,
                    accountInfo: undefined,
                };
            }
            throw err as Error;
        }

        return {
            did: this.getDid(),
            connected: this.isConnected() || false,
            userClosedModal: false,
            didDocument: await this.getDidDocument(),
            identityToken: this._identityToken,
            realtimeExchangeConnected: Boolean(this._natsConnection),
            accountInfo: accountInfo,
        };
    }

    /**
     * isConnected
     *
     * @returns info if the connection to wallet/signer is already established
     *
     */
    isConnected(): boolean {
        if (
            this._providerType &&
            [WalletProvider.EwKeyManager, WalletProvider.WalletConnect].includes(this._providerType)
        ) {
            return this._walletConnectService.isConnected();
        }
        return !!this._address;
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

    /**
     * createPublicClaim
     *
     * @description create a public claim based on data provided
     * @returns JWT token of created claim
     *
     */
    async createPublicClaim({ data, subject }: { data: ClaimData; subject?: string }) {
        if (this._userClaims) {
            if (subject) {
                return this._userClaims.createPublicClaim(data, { subject, issuer: "" });
            }
            return this._userClaims.createPublicClaim(data);
        }
        throw new Error(ERROR_MESSAGES.CLAIMS_NOT_INITIALIZED);
    }

    private async getClaimId({ claimData }: { claimData: ClaimData }) {
        const { service = [] } = await this.getDidDocument();
        const { id, claimTypeVersion } =
            service.find(
                ({ profile, claimType, claimTypeVersion }) =>
                    Boolean(profile) ||
                    (claimType === claimData.claimType && claimTypeVersion === claimData.claimTypeVersion),
            ) || {};

        if (claimData.profile && id) {
            return id;
        }

        if (claimData.claimType && id && claimData.claimTypeVersion === claimTypeVersion) {
            return id;
        }
        return uuid();
    }

    /**
     * publishPublicClaim
     *
     * @description store claim data in ipfs and save url to DID document services
     * @returns ulr to ipfs
     *
     */
    async publishPublicClaim({ token }: { token: string }) {
        if (!this._did) {
            throw new Error(ERROR_MESSAGES.USER_NOT_LOGGED_IN);
        }
        if (!this._didSigner) {
            throw new Error(ERROR_MESSAGES.SIGNER_NOT_INITIALIZED);
        }
        if (!this._userClaims) {
            throw new Error(ERROR_MESSAGES.CLAIMS_NOT_INITIALIZED);
        }
        if (!this._document) {
            throw new Error(ERROR_MESSAGES.DID_DOCUMENT_NOT_INITIALIZED);
        }

        const payload = (await this.decodeJWTToken({ token })) as {
            iss: string;
            sub: string;
            claimData: ClaimData;
        };
        const { iss, claimData } = payload;
        let sub = payload.sub;
        // Initial claim design assumed that role subject is requester because of which
        // sub filed was ignored
        if (!sub || sub.length === 0 || !isValidDID(sub)) {
            sub = this._did;
        }

        if (!(await this._userClaims.verifySignature(token, iss))) {
            throw new Error("Incorrect signature");
        }

        let document: DIDDocumentFull;
        if (sub === this._did) {
            document = this._document;
        } else if ((await this.getOwnedAssets({})).find((a) => a.document.id === sub)) {
            const operator = new ProxyOperator(this._didSigner, this._registrySetting, addressOf(sub));
            document = new DIDDocumentFull(sub, operator);
        } else {
            throw new Error(ERROR_MESSAGES.CLAIM_PUBLISHER_NOT_REQUESTER);
        }

        const url = await this._ipfsStore.save(token);
        const claimId = await this.getClaimId({ claimData });
        await document.update(DIDAttribute.ServicePoint, {
            type: DIDAttribute.ServicePoint,
            value: {
                id: claimId,
                serviceEndpoint: url,
                hash: hashes.SHA256(token),
                hashAlg: "SHA256",
            },
        });

        return url;
    }

    /**
     * createProofClaim
     *
     * @description creates a proof of a claim
     * @returns proof token
     *
     */
    async createProofClaim({ claimUrl, saltedFields }: { claimUrl: string; saltedFields: ISaltedFields }) {
        if (this._userClaims) {
            const encryptedSaltedFields: IProofData = {};
            let counter = 0;
            Object.entries(saltedFields).forEach(([key, value]) => {
                if (counter % 2 === 0) {
                    encryptedSaltedFields[key] = {
                        value,
                        encrypted: true,
                    };
                } else {
                    encryptedSaltedFields[key] = {
                        value,
                        encrypted: false,
                    };
                }
                counter++;
            });
            return this._userClaims?.createProofClaim(claimUrl, encryptedSaltedFields);
        }
        throw new Error(ERROR_MESSAGES.CLAIMS_NOT_INITIALIZED);
    }

    /**
     * issuePublicClaim
     *
     * @description issue a public claim
     * @returns return issued token
     *
     */
    async issuePublicClaim({ token, publicClaim }: { token?: string; publicClaim?: IPublicClaim }) {
        if (this._issuerClaims) {
            if (publicClaim) {
                return this._issuerClaims.issuePublicClaim(publicClaim);
            }
            if (token) {
                return this._issuerClaims.issuePublicClaim(token);
            }
            throw new Error("unable to issue Public Claim");
        }
        throw new Error(ERROR_MESSAGES.CLAIMS_NOT_INITIALIZED);
    }

    /**
     * verifyPublicClaim
     *
     * @description verifies issued token of claim
     * @returns { Promise<IPublicClaim> } public claim data
     * @throws if the proof failed
     *
     */
    async verifyPublicClaim({ claimUrl }: { claimUrl: string }) {
        if (this._verifierClaims) {
            return this._verifierClaims.verifyPublicProof(claimUrl);
        }
        throw new Error(ERROR_MESSAGES.CLAIMS_NOT_INITIALIZED);
    }

    /**
     * createSelfSignedClaim
     *
     * @description creates self signed claim and upload the data to ipfs
     *
     */
    async createSelfSignedClaim({ data, subject }: { data: ClaimData; subject?: string }) {
        if (this._userClaims) {
            const token = await this.createPublicClaim({ data, subject });
            return this.publishPublicClaim({ token });
        }
        throw new Error(ERROR_MESSAGES.CLAIMS_NOT_INITIALIZED);
    }

    /**
     * getUserClaims
     *
     * @description get user claims
     *
     */
    async getUserClaims({ did = this._did }: { did?: string } | undefined = {}) {
        const { service } = (await this.getDidDocument({ did })) || {};
        return service;
    }

    async decodeJWTToken({ token }: { token: string }) {
        if (!this._jwt) {
            throw new Error(ERROR_MESSAGES.JWT_NOT_INITIALIZED);
        }
        return this._jwt.decode(token);
    }

    /**
     * @description create a public claim to prove identity
     * @returns JWT token of created identity
     */
    async createIdentityProof() {
        if (this._provider) {
            const blockNumber = await this._provider.getBlockNumber();
            return this.createPublicClaim({
                data: {
                    blockNumber,
                },
            });
        }
        throw new Error(ERROR_MESSAGES.PROVIDER_NOT_INITIALIZED);
    }

    /**
     * @description create a proof of identity delegate
     * @param delegateKey private key of the delegate
     * @param rpcUrl the url of the blockchain provider
     * @param identity Did of the delegate
     * @returns token of delegate
     */
    async createDelegateProof(delegateKey: string, rpcUrl: string, identity: string): Promise<string> {
        const provider = new providers.JsonRpcProvider(rpcUrl);
        const blockNumber = (await provider.getBlockNumber()).toString();

        const payload: { iss: string; claimData: { blockNumber: string } } = {
            iss: identity,
            claimData: {
                blockNumber,
            },
        };
        const jwt = new JWT(new Wallet(delegateKey));
        const identityToken = jwt.sign(payload, { algorithm: "ES256" });
        return identityToken;
    }

    /// ROLES

    /**
     * setRoleDefinition
     *
     * @description sets role definition in ENS domain
     * @description please use it only when you want to update role definitions for already created role (domain)
     *
     */
    async setRoleDefinition({
        domain,
        data,
    }: {
        domain: string;
        data: IAppDefinition | IOrganizationDefinition | IRoleDefinition;
    }) {
        // Special case of updating legacy PublicResolver definitions
        if (await this.updateLegacyDefinition(domain, data)) {
            return;
        }
        // Standard update
        await this.send({
            calls: [this._domainDefinitionTransactionFactory.editDomain({ domain, domainDefinition: data })],
            from: await this.getOwner({ namespace: domain }),
        });
    }

    /**
     * In initial version of Switchboard, role definitions where contained in ENS PublicResolver.
     * However, in order for key properties of role definitions to be readable on-chain, a new RoleDefinitionResolver is used.
     * This function sets the resolver in the ENS to the new contract for definitions that are pointing to the old contract
     * @param domain domain to potentially update
     * @param data definition to apply to domain
     */
    protected async updateLegacyDefinition(
        domain: string,
        data: IAppDefinition | IOrganizationDefinition | IRoleDefinition,
    ): Promise<boolean> {
        const node = namehash(domain);
        const currentResolverAddress = await this._ensRegistry.resolver(node);
        const { chainId } = await this._provider.getNetwork();
        const { ensPublicResolverAddress, ensResolverAddress, ensRegistryAddress } = chainConfigs[chainId];
        if (currentResolverAddress === ensPublicResolverAddress) {
            const updateResolverTransaction: EncodedCall = {
                to: ensRegistryAddress,
                data: this._ensRegistry.interface.encodeFunctionData("setResolver", [node, ensResolverAddress]),
            };
            // Need to use newRole/newDomain as need to set reverse domain name
            const updateDomain = DomainReader.isRoleDefinition(data)
                ? this._domainDefinitionTransactionFactory.newRole({ domain, roleDefinition: data })
                : this._domainDefinitionTransactionFactory.newDomain({ domain, domainDefinition: data });
            await this.send({
                calls: [updateResolverTransaction, updateDomain],
                from: await this.getOwner({ namespace: domain }),
            });
            return true;
        }
        return false;
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
        namespace,
        data,
        returnSteps,
    }: {
        orgName: string;
        data: IOrganizationDefinition;
        namespace: string;
        returnSteps?: boolean;
    }) {
        const orgDomain = `${orgName}.${namespace}`;
        const rolesDomain = `${ENSNamespaceTypes.Roles}.${orgDomain}`;
        const appsDomain = `${ENSNamespaceTypes.Application}.${orgDomain}`;
        const from = await this.getOwner({ namespace });
        const steps = [
            {
                tx: this.createSubdomainTx({ domain: namespace, nodeName: orgName, owner: from }),
                info: "Create organization subdomain",
            },
            {
                tx: this._domainDefinitionTransactionFactory.newDomain({ domain: orgDomain, domainDefinition: data }),
                info: "Register reverse name and set definition for organization subdomain",
            },
            {
                tx: this.createSubdomainTx({
                    domain: orgDomain,
                    nodeName: ENSNamespaceTypes.Roles,
                    owner: from,
                }),
                info: "Create roles subdomain for organization",
            },
            {
                tx: this._domainDefinitionTransactionFactory.setDomainNameTx({ domain: rolesDomain }),
                info: "Register reverse name for roles subdomain",
            },
            {
                tx: this.createSubdomainTx({
                    domain: orgDomain,
                    nodeName: ENSNamespaceTypes.Application,
                    owner: from,
                }),
                info: "Create app subdomain for organization",
            },
            {
                tx: this._domainDefinitionTransactionFactory.setDomainNameTx({ domain: appsDomain }),
                info: "Register reverse name for app subdomain",
            },
        ].map((step) => ({
            ...step,
            next: async () => {
                await this.send({ calls: [step.tx], from });
            },
        }));
        if (returnSteps) {
            return steps;
        }
        await this.send({ calls: steps.map(({ tx }) => tx), from });
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
        namespace: domain,
        data,
        returnSteps,
    }: {
        namespace: string;
        appName: string;
        data: IAppDefinition;
        returnSteps?: boolean;
    }) {
        const appDomain = `${appName}.${domain}`;
        const from = await this.getOwner({ namespace: domain });
        const steps = [
            {
                tx: this.createSubdomainTx({ domain, nodeName: appName, owner: from }),
                info: "Set subdomain for application",
            },
            {
                tx: this._domainDefinitionTransactionFactory.newDomain({ domainDefinition: data, domain: appDomain }),
                info: "Set name definition for application",
            },
            {
                tx: this.createSubdomainTx({
                    domain: appDomain,
                    nodeName: ENSNamespaceTypes.Roles,
                    owner: from,
                }),
                info: "Create roles subdomain for application",
            },
            {
                tx: this._domainDefinitionTransactionFactory.setDomainNameTx({
                    domain: `${ENSNamespaceTypes.Roles}.${appDomain}`,
                }),
                info: "Set name for roles subdomain for application",
            },
        ].map((step) => ({
            ...step,
            next: async () => {
                await this.send({ calls: [step.tx], from });
            },
        }));
        if (returnSteps) {
            return steps;
        }
        await this.send({ calls: steps.map(({ tx }) => tx), from });
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
        returnSteps,
    }: {
        roleName: string;
        namespace: string;
        data: IRoleDefinition;
        returnSteps?: boolean;
    }) {
        const newDomain = `${roleName}.${namespace}`;
        const from = await this.getOwner({ namespace });
        const steps = [
            {
                tx: this.createSubdomainTx({ domain: namespace, nodeName: roleName, owner: from }),
                info: "Create subdomain for role",
            },
            {
                tx: this._domainDefinitionTransactionFactory.newRole({ domain: newDomain, roleDefinition: data }),
                info: "Set name and definition for role",
            },
        ].map((step) => ({
            ...step,
            next: async () => {
                await this.send({ calls: [step.tx], from });
            },
        }));
        if (returnSteps) {
            return steps;
        }
        await this.send({ calls: steps.map(({ tx }) => tx), from });
        return [];
    }

    /**
     * changeOrgOwnership
     *
     * @description change owner ship of org subdomain and all org owned roles subdomains
     * @returns return array of steps needed to change ownership
     *
     */
    async changeOrgOwnership({
        namespace,
        newOwner,
        returnSteps = false,
    }: {
        namespace: string;
        newOwner: string;
        returnSteps?: boolean;
    }) {
        newOwner = parseDID(newOwner);
        const orgNamespaces = [
            `${ENSNamespaceTypes.Roles}.${namespace}`,
            `${ENSNamespaceTypes.Application}.${namespace}`,
            namespace,
        ];
        const { alreadyFinished, changeOwnerNamespaces, notOwnedNamespaces } = await this.validateChangeOwnership({
            newOwner,
            namespaces: orgNamespaces,
        });

        if (notOwnedNamespaces.length > 0) {
            throw new ChangeOwnershipNotPossibleError({ namespace, notOwnedNamespaces });
        }
        const from = await this.getOwner({ namespace });

        const apps = this._cacheClient
            ? await this.getAppsByOrgNamespace({ namespace })
            : await this.getSubdomains({
                  domain: `${ENSNamespaceTypes.Application}.${namespace}`,
              });
        if (apps && apps.length > 0) {
            throw new Error("You are not able to change ownership of organization with registered apps");
        }

        if (alreadyFinished.length > 0) {
            console.log(`Already changed ownership of ${alreadyFinished.join(", ")}`);
        }

        const steps = changeOwnerNamespaces.map((namespace) => {
            const tx = this.changeDomainOwnerTx({ newOwner, namespace });
            return {
                tx,
                next: async ({ retryCheck }: { retryCheck?: boolean } = {}) => {
                    if (retryCheck) {
                        const owner = await this.getOwner({ namespace });
                        if (owner === newOwner) return;
                    }
                    return this.send({ calls: [tx], from });
                },
                info: `Changing ownership of ${namespace}`,
            };
        });

        if (returnSteps) {
            return steps;
        }
        await this.send({ calls: steps.map(({ tx }) => tx), from });
        return [];
    }

    /**
     * changeAppOwnership
     *
     * @description change owner ship of app subdomain and all app owned subdomains
     * @returns return array of steps needed to change ownership
     *
     */
    async changeAppOwnership({
        namespace,
        newOwner,
        returnSteps,
    }: {
        namespace: string;
        newOwner: string;
        returnSteps?: boolean;
    }) {
        newOwner = parseDID(newOwner);
        const appNamespaces = [`${ENSNamespaceTypes.Roles}.${namespace}`, namespace];

        const { alreadyFinished, changeOwnerNamespaces, notOwnedNamespaces } = await this.validateChangeOwnership({
            newOwner,
            namespaces: appNamespaces,
        });

        if (notOwnedNamespaces.length > 0) {
            throw new ChangeOwnershipNotPossibleError({ namespace, notOwnedNamespaces });
        }
        const from = await this.getOwner({ namespace });

        if (alreadyFinished.length > 0) {
            console.log(`Already changed ownership of ${alreadyFinished.join(", ")}`);
        }

        const steps = changeOwnerNamespaces.map((namespace) => {
            const tx = this.changeDomainOwnerTx({ newOwner, namespace });
            return {
                tx,
                next: async ({ retryCheck }: { retryCheck?: boolean } = {}) => {
                    if (retryCheck) {
                        const owner = await this.getOwner({ namespace });
                        if (owner === newOwner) return;
                    }
                    return this.send({ calls: [tx], from });
                },
                info: `Changing ownership of ${namespace}`,
            };
        });

        if (returnSteps) {
            return steps;
        }
        await this.send({ calls: steps.map(({ tx }) => tx), from });
        return [];
    }

    /**
     * changeRoleOwnership
     *
     * @description change ownership of role subdomain
     *
     */
    async changeRoleOwnership({ namespace, newOwner }: { namespace: string; newOwner: string }) {
        newOwner = parseDID(newOwner);
        const notOwnedNamespaces = await this.validateOwnership({
            namespace,
            type: ENSNamespaceTypes.Roles,
        });
        if (notOwnedNamespaces.length > 0) {
            throw new ChangeOwnershipNotPossibleError({ namespace, notOwnedNamespaces });
        }
        const from = await this.getOwner({ namespace });
        await this.send({
            calls: [this.changeDomainOwnerTx({ namespace, newOwner })],
            from,
        });
    }

    /**
     * deleteOrganization
     *
     * @description delete organization and roles
     *
     */
    async deleteOrganization({ namespace, returnSteps }: { namespace: string; returnSteps?: boolean }) {
        const apps = this._cacheClient
            ? await this.getAppsByOrgNamespace({ namespace })
            : await this.getSubdomains({
                  domain: `${ENSNamespaceTypes.Application}.${namespace}`,
              });
        if (apps && apps.length > 0) {
            throw new Error(ERROR_MESSAGES.ORG_WITH_APPS);
        }
        const from = await this.getOwner({ namespace });

        const roles = this._cacheClient
            ? await this._cacheClient.getOrganizationRoles({ namespace })
            : await this.getSubdomains({ domain: `${ENSNamespaceTypes.Roles}.${namespace}` });

        if (roles && roles.length > 0) {
            throw new Error(ERROR_MESSAGES.ORG_WITH_ROLES);
        }

        const orgNamespaces = [
            `${ENSNamespaceTypes.Roles}.${namespace}`,
            `${ENSNamespaceTypes.Application}.${namespace}`,
            namespace,
        ];

        const { alreadyFinished, namespacesToDelete, notOwnedNamespaces } = await this.validateDeletePossibility({
            namespaces: orgNamespaces,
        });

        if (notOwnedNamespaces.length > 0) {
            throw new DeletingNamespaceNotPossibleError({ namespace, notOwnedNamespaces });
        }

        if (alreadyFinished.length > 0) {
            console.log(`Already deleted: ${alreadyFinished.join(", ")}`);
        }

        const steps = namespacesToDelete.map((namespace) => {
            const tx = this.deleteDomainTx({ namespace });
            return {
                tx,
                next: async ({ retryCheck }: { retryCheck?: boolean } = {}) => {
                    if (retryCheck) {
                        const owner = await this.getOwner({ namespace });
                        if (owner === emptyAddress) return;
                    }
                    return this.send({ calls: [tx], from });
                },
                info: `Deleting ${namespace}`,
            };
        });

        if (returnSteps) {
            return steps;
        }
        await this.send({ calls: steps.map(({ tx }) => tx), from });
        return [];
    }

    /**
     * deleteApplication
     *
     * @description delete application and roles
     *
     */
    async deleteApplication({ namespace, returnSteps }: { namespace: string; returnSteps?: boolean }) {
        const from = await this.getOwner({ namespace });

        const roles = this._cacheClient
            ? await this._cacheClient.getApplicationRoles({ namespace })
            : await this.getSubdomains({ domain: `${ENSNamespaceTypes.Roles}.${namespace}` });

        if (roles && roles.length > 0) {
            throw new Error(ERROR_MESSAGES.APP_WITH_ROLES);
        }

        const appNamespaces = [`${ENSNamespaceTypes.Roles}.${namespace}`, namespace];

        const { alreadyFinished, namespacesToDelete, notOwnedNamespaces } = await this.validateDeletePossibility({
            namespaces: appNamespaces,
        });

        if (notOwnedNamespaces.length > 0) {
            throw new DeletingNamespaceNotPossibleError({ namespace, notOwnedNamespaces });
        }

        if (alreadyFinished.length > 0) {
            console.log(`Already deleted: ${alreadyFinished.join(", ")}`);
        }

        const steps = namespacesToDelete.map((namespace) => {
            const tx = this.deleteDomainTx({ namespace });
            return {
                tx,
                next: async ({ retryCheck }: { retryCheck?: boolean } = {}) => {
                    if (retryCheck) {
                        const owner = await this.getOwner({ namespace });
                        if (owner === emptyAddress) return;
                    }
                    return this.send({ calls: [tx], from });
                },
                info: `Deleting ${namespace}`,
            };
        });

        if (returnSteps) {
            return steps;
        }
        await this.send({ calls: steps.map(({ tx }) => tx), from });
        return [];
    }

    /**
     * deleteRole
     *
     * @description delete role
     *
     */
    async deleteRole({ namespace }: { namespace: string }) {
        const notOwnedNamespaces = await this.validateOwnership({
            namespace,
            type: ENSNamespaceTypes.Roles,
        });
        if (notOwnedNamespaces.length > 0) {
            throw new DeletingNamespaceNotPossibleError({ namespace, notOwnedNamespaces });
        }
        await this.send({
            calls: [this.deleteDomainTx({ namespace })],
            from: await this.getOwner({ namespace }),
        });
    }

    /**
     * getRoleDefinition
     *
     * @description get role definition form ens domain metadata record
     * @returns metadata string or empty string when there is no metadata
     *
     */
    async getDefinition({
        type,
        namespace,
    }: {
        type: ENSNamespaceTypes;
        namespace: string;
    }): Promise<IRoleDefinition | IAppDefinition | IOrganizationDefinition> {
        if (this._cacheClient && type) {
            if (type === ENSNamespaceTypes.Roles) {
                return this._cacheClient.getRoleDefinition({ namespace });
            }
            if (type === ENSNamespaceTypes.Application) {
                return this._cacheClient.getAppDefinition({ namespace });
            }
            if (type === ENSNamespaceTypes.Organization) {
                return this._cacheClient.getOrgDefinition({ namespace });
            }
            throw new ENSTypeNotSupportedError();
        }
        if (this._domainDefinitionReader) {
            const roleHash = namehash(namespace);
            return await this._domainDefinitionReader.read({ node: roleHash });
        }
        throw new ENSResolverNotInitializedError();
    }

    /**
     * getRolesByNamespace
     *
     * @description get all subdomains for certain domain
     * @returns array of subdomains or empty array when there is no subdomains
     *
     */
    getRolesByNamespace({
        parentType,
        namespace,
    }: {
        parentType: ENSNamespaceTypes.Application | ENSNamespaceTypes.Organization;
        namespace: string;
    }) {
        if (!this._cacheClient) {
            throw new CacheClientNotProvidedError();
        }
        if (parentType === ENSNamespaceTypes.Organization) {
            return this._cacheClient.getOrganizationRoles({ namespace });
        }
        if (parentType === ENSNamespaceTypes.Application) {
            return this._cacheClient.getApplicationRoles({ namespace });
        }
        throw new ENSTypeNotSupportedError();
    }

    /**
     * getENSTypesByOwner
     */
    getENSTypesByOwner({
        type,
        owner,
        excludeSubOrgs = false,
    }: {
        type: ENSNamespaceTypes;
        owner: string;
        excludeSubOrgs?: boolean;
    }) {
        owner = parseDID(owner);
        if (!this._cacheClient) {
            throw new CacheClientNotProvidedError();
        }
        if (type === ENSNamespaceTypes.Organization) {
            return this._cacheClient.getOrganizationsByOwner({ owner, excludeSubOrgs });
        }
        if (type === ENSNamespaceTypes.Application) {
            return this._cacheClient.getApplicationsByOwner({ owner });
        }
        if (type === ENSNamespaceTypes.Roles) {
            return this._cacheClient.getRolesByOwner({ owner });
        }
        throw new ENSTypeNotSupportedError();
    }

    /**
     * getENSTypesBySearchPhrase
     */
    getENSTypesBySearchPhrase({ types, search }: { types?: ("App" | "Org" | "Role")[]; search: string }) {
        if (!this._cacheClient) {
            throw new CacheClientNotProvidedError();
        }

        return this._cacheClient.getNamespaceBySearchPhrase({ search, types });
    }

    /**
     * getENSTypesByOwner
     *
     * @description get all applications for organization namespace
     * @returns array of subdomains or empty array when there is no subdomains
     *
     */
    getAppsByOrgNamespace({ namespace }: { namespace: string }) {
        if (!this._cacheClient) {
            throw new CacheClientNotProvidedError();
        }
        return this._cacheClient.getApplicationsByOrganization({ namespace });
    }

    /**
     * getSubOrgsByOrgNamespace
     *
     * @description get all sub organizations for organization namespace
     * @returns array of subdomains or empty array when there is no subdomains
     *
     */
    getSubOrgsByOrgNamespace({ namespace }: { namespace: string }) {
        if (!this._cacheClient) {
            throw new CacheClientNotProvidedError();
        }
        return this._cacheClient.getSubOrganizationsByOrganization({ namespace });
    }

    /**
     * getOrgHierarchy
     *
     * @description get all hierarchy of an organization (20 levels deep)
     * @returns organization with all nested subOrgs
     *
     */
    async getOrgHierarchy({ namespace }: { namespace: string }): Promise<IOrganization> {
        if (!this._cacheClient) {
            throw new CacheClientNotProvidedError();
        }
        const org = await this._cacheClient.getOrgHierarchy({ namespace });
        [org, ...(org.subOrgs || []), ...(org.apps || []), ...(org.roles || [])].forEach(
            (domain) => (domain.isOwnedByCurrentUser = domain.owner === this.address),
        );
        return org;
    }

    /**
     * getRoleDIDs
     *
     * @description get all users did which have certain role
     * @returns array of did's
     *
     */
    getRoleDIDs({ namespace }: { namespace: string }) {
        if (!this._cacheClient) {
            throw new CacheClientNotProvidedError();
        }
        return this._cacheClient.getDIDsForRole({ namespace });
    }

    /**
     * getSubdomains
     *
     * @description get all subdomains for certain domain
     * @returns array of subdomains or empty array when there is no subdomains
     *
     */
    async getSubdomains({
        domain,
        mode = "FIRSTLEVEL",
    }: {
        domain: string;
        mode?: "ALL" | "FIRSTLEVEL";
    }): Promise<string[]> {
        return this._domainHierarchy.getSubdomainsUsingResolver({
            domain,
            mode,
        });
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
            const [exists, isOwned] = await Promise.all([
                this._ensRegistry.recordExists(domainHash),
                (async () => {
                    const owner = await this._ensRegistry?.owner(domainHash);
                    return owner !== emptyAddress;
                })(),
            ]);
            return exists && isOwned;
        }
        throw new ENSRegistryNotInitializedError();
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
        throw new ENSRegistryNotInitializedError();
    }

    /**
     * validateOwnership
     *
     * @description check ownership of the domain and subdomains of org, app or role
     * @returns true or false whatever the passed is user is a owner of org, app or role
     *
     */
    async validateOwnership({ namespace, type }: { namespace: string; type: ENSNamespaceTypes }) {
        return this.nonOwnedNodesOf({ namespace, type, owner: this._address as string });
    }

    protected async validateChangeOwnership({ namespaces, newOwner }: { namespaces: string[]; newOwner: string }) {
        const namespacesOwners = await this.namespacesWithRelations(namespaces);
        return namespacesOwners.reduce(
            (acc, { namespace, owner }) => {
                if (owner === newOwner) {
                    acc.alreadyFinished.push(namespace);
                    return acc;
                }
                if (owner === emptyAddress || owner === this._address) {
                    acc.changeOwnerNamespaces.push(namespace);
                    return acc;
                }
                acc.notOwnedNamespaces.push(namespace);
                return acc;
            },
            {
                notOwnedNamespaces: [],
                alreadyFinished: [],
                changeOwnerNamespaces: [],
            } as {
                notOwnedNamespaces: string[];
                alreadyFinished: string[];
                changeOwnerNamespaces: string[];
            },
        );
    }

    protected async validateDeletePossibility({ namespaces }: { namespaces: string[] }) {
        const namespacesOwners = await this.namespacesWithRelations(namespaces);
        return namespacesOwners.reduce(
            (acc, { namespace, owner }) => {
                if (owner === emptyAddress) {
                    acc.alreadyFinished.push(namespace);
                    return acc;
                }
                if (owner === this._address) {
                    acc.namespacesToDelete.push(namespace);
                    return acc;
                }
                acc.notOwnedNamespaces.push(namespace);
                return acc;
            },
            {
                notOwnedNamespaces: [],
                alreadyFinished: [],
                namespacesToDelete: [],
            } as {
                notOwnedNamespaces: string[];
                alreadyFinished: string[];
                namespacesToDelete: string[];
            },
        );
    }

    private async verifyEnrolmentPrerequisites({ subject, role }: { subject: string; role: string }) {
        const roleDefinition = await this.getDefinition({
            type: ENSNamespaceTypes.Roles,
            namespace: role,
        });

        if (!roleDefinition) {
            throw new Error(ERROR_MESSAGES.ROLE_NOT_EXISTS);
        }

        const { enrolmentPreconditions } = roleDefinition as IRoleDefinition;

        if (!enrolmentPreconditions || enrolmentPreconditions.length === 0) return;

        const enroledRoles = new Set(
            (await this.getClaimsBySubject({ did: subject, isAccepted: true })).map(({ claimType }) => claimType),
        );
        const requiredRoles = new Set(
            enrolmentPreconditions
                .filter(({ type }) => type === PreconditionType.Role)
                .map(({ conditions }) => conditions)
                .reduce((all, cur) => all.concat(cur), []),
        );
        for (const role in requiredRoles) {
            if (!enroledRoles.has(role)) {
                throw new Error(ERROR_MESSAGES.ROLE_PREREQUISITES_NOT_MET);
            }
        }
    }

    private async approveRolePublishing({
        subject,
        role,
        version,
    }: {
        subject: string;
        role: string;
        version: number;
    }) {
        if (!this._signer) {
            throw new Error(ERROR_MESSAGES.SIGNER_NOT_INITIALIZED);
        }

        const erc712_type_hash = id(
            "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)",
        );
        const agreement_type_hash = id("Agreement(address subject,bytes32 role,uint256 version)");

        const domainSeparator = keccak256(
            defaultAbiCoder.encode(
                ["bytes32", "bytes32", "bytes32", "uint256", "address"],
                [
                    erc712_type_hash,
                    id("Claim Manager"),
                    id("1.0"),
                    (await this._provider.getNetwork()).chainId,
                    this._claimManager.address,
                ],
            ),
        );

        const messageId = Buffer.from(typedMsgPrefix, "hex");

        const agreementHash = solidityKeccak256(
            ["bytes", "bytes32", "bytes32"],
            [
                messageId,
                domainSeparator,
                keccak256(
                    defaultAbiCoder.encode(
                        ["bytes32", "address", "bytes32", "uint256"],
                        [agreement_type_hash, addressOf(subject), namehash(role), version],
                    ),
                ),
            ],
        );

        return canonizeSig(await this._signer.signMessage(arrayify(agreementHash)));
    }

    private async createOnChainProof(role: string, version: number, expiry: number, subject: string): Promise<string> {
        if (!this._did) {
            throw new Error(ERROR_MESSAGES.USER_NOT_LOGGED_IN);
        }
        if (!this._signer) {
            throw new Error(ERROR_MESSAGES.SIGNER_NOT_INITIALIZED);
        }
        const messageId = Buffer.from(typedMsgPrefix, "hex");

        const domainSeparator = utils.keccak256(
            defaultAbiCoder.encode(
                ["bytes32", "bytes32", "bytes32", "uint256", "address"],
                [
                    erc712_type_hash,
                    utils.id("Claim Manager"),
                    utils.id("1.0"),
                    (await this._provider.getNetwork()).chainId,
                    this._claimManager.address,
                ],
            ),
        );

        const proofHash = solidityKeccak256(
            ["bytes", "bytes32", "bytes32"],
            [
                messageId,
                domainSeparator,
                utils.keccak256(
                    defaultAbiCoder.encode(
                        ["bytes32", "address", "bytes32", "uint", "uint", "address"],
                        [proof_type_hash, addressOf(subject), namehash(role), version, expiry, addressOf(this._did)],
                    ),
                ),
            ],
        );

        return canonizeSig(await this._signer.signMessage(arrayify(proofHash)));
    }

    async createClaimRequest({
        claim,
        subject,
        registrationTypes = [RegistrationTypes.OffChain],
    }: {
        claim: { claimType: string; claimTypeVersion: number; fields: { key: string; value: string | number }[] };
        subject?: string;
        registrationTypes?: RegistrationTypes[];
    }) {
        if (!this._did) {
            throw new Error(ERROR_MESSAGES.USER_NOT_LOGGED_IN);
        }
        if (!subject) {
            subject = this._did;
        }

        const { claimType: role, claimTypeVersion: version } = claim;
        const token = await this.createPublicClaim({ data: claim, subject });

        await this.verifyEnrolmentPrerequisites({ subject, role });

        // temporarily, until claimIssuer is not removed from Claim entity
        const issuer = [`did:${Methods.Erc1056}:${emptyAddress}`];

        const message: IClaimRequest = {
            id: uuid(),
            token,
            claimIssuer: issuer,
            requester: this._did,
            registrationTypes,
        };

        if (registrationTypes.includes(RegistrationTypes.OnChain)) {
            if (!version) {
                throw new Error(ERROR_MESSAGES.ONCHAIN_ROLE_VERSION_NOT_SPECIFIED);
            }
            message.subjectAgreement = await this.approveRolePublishing({ subject, role, version });
        }

        if (this._natsConnection) {
            issuer.map((issuerDID) =>
                this._natsConnection?.publish(`${issuerDID}.${NATS_EXCHANGE_TOPIC}`, this._jsonCodec?.encode(message)),
            );
        } else if (this._cacheClient) {
            await this._cacheClient.requestClaim({ did: subject, message });
        } else {
            throw new NATSConnectionNotEstablishedError();
        }
    }

    async issueClaimRequest({
        requester,
        token,
        id,
        subjectAgreement,
        registrationTypes,
    }: {
        requester: string;
        token: string;
        id: string;
        subjectAgreement: string;
        registrationTypes: RegistrationTypes[];
    }) {
        if (!this._did) {
            throw new Error(ERROR_MESSAGES.USER_NOT_LOGGED_IN);
        }
        if (!this._jwt) {
            throw new Error(ERROR_MESSAGES.JWT_NOT_INITIALIZED);
        }
        if (!this._signer) {
            throw new Error(ERROR_MESSAGES.SIGNER_NOT_INITIALIZED);
        }

        const { claimData, sub } = this._jwt.decode(token) as {
            claimData: { claimType: string; claimTypeVersion: number; expiry: number };
            sub: string;
        };

        await this.verifyEnrolmentPrerequisites({ subject: sub, role: claimData.claimType });

        const message: IClaimIssuance = {
            id,
            requester,
            claimIssuer: [this._did],
            acceptedBy: this._did,
        };
        if (registrationTypes.includes(RegistrationTypes.OffChain)) {
            const publicClaim: IPublicClaim = {
                did: sub,
                signer: this._did,
                claimData,
            };
            message.issuedToken = await this.issuePublicClaim({
                publicClaim,
            });
        }
        if (registrationTypes.includes(RegistrationTypes.OnChain)) {
            const { claimType: role, claimTypeVersion: version } = claimData;
            const expiry = claimData.expiry === undefined ? defaultClaimExpiry : claimData.expiry;
            const onChainProof = await this.createOnChainProof(role, version, expiry, sub);
            await (
                await this._claimManager.register(
                    addressOf(sub),
                    namehash(role),
                    version,
                    expiry,
                    addressOf(this._did),
                    subjectAgreement,
                    onChainProof,
                )
            ).wait();
            message.onChainProof = onChainProof;
        }

        if (this._natsConnection) {
            const dataToSend = this._jsonCodec?.encode(message);
            this._natsConnection.publish(`${requester}.${NATS_EXCHANGE_TOPIC}`, dataToSend);
        } else if (this._cacheClient) {
            return this._cacheClient.issueClaim({ did: this._did, message });
        } else {
            throw new NATSConnectionNotEstablishedError();
        }
    }

    async rejectClaimRequest({ id, requesterDID }: { id: string; requesterDID: string }) {
        if (!this._did) {
            throw new Error(ERROR_MESSAGES.USER_NOT_LOGGED_IN);
        }

        const preparedData: IClaimRejection = {
            id,
            requester: requesterDID,
            claimIssuer: [this._did],
            isRejected: true,
        };

        if (!this._natsConnection) {
            if (this._cacheClient) {
                return this._cacheClient.rejectClaim({ did: this._did, message: preparedData });
            }
            throw new NATSConnectionNotEstablishedError();
        }

        const dataToSend = this._jsonCodec?.encode(preparedData);
        this._natsConnection.publish(`${requesterDID}.${NATS_EXCHANGE_TOPIC}`, dataToSend);
    }

    async deleteClaim({ id }: { id: string }) {
        if (this._cacheClient) {
            await this._cacheClient.deleteClaim({ claimId: id });
        } else {
            throw new CacheClientNotProvidedError();
        }
    }

    async registrationTypesOfRoles(roles: string[]): Promise<Record<string, Set<RegistrationTypes>>> {
        const types: Record<string, Set<RegistrationTypes>> = roles.reduce(
            (acc, role) => ({ ...acc, [role]: new Set() }),
            {},
        );
        for await (const role of roles) {
            const def = await this.getDefinition({ type: ENSNamespaceTypes.Roles, namespace: role });
            if (!DomainReader.isRoleDefinition(def)) {
                continue;
            }
            const resolver = await this._ensRegistry.resolver(namehash(role));
            const { chainId } = await this._provider.getNetwork();
            const { ensResolverAddress, ensPublicResolverAddress } = chainConfigs[chainId];
            if (resolver === ensResolverAddress) {
                types[role].add(RegistrationTypes.OnChain);
                types[role].add(RegistrationTypes.OffChain);
            } else if (resolver === ensPublicResolverAddress) {
                types[role].add(RegistrationTypes.OffChain);
            }
        }
        return types;
    }

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

    async getClaimsBySubjects(subjects: string[]) {
        return this._cacheClient.getClaimsBySubjects(subjects);
    }

    /**
     * @description - Returns claims for given requester. Allows filtering by status and parent namespace
     */
    async getClaimsByRequester({
        did,
        isAccepted,
        parentNamespace,
    }: {
        did: string;
        isAccepted?: boolean;
        parentNamespace?: string;
    }) {
        if (!this._cacheClient) {
            throw new CacheClientNotProvidedError();
        }
        return this._cacheClient.getClaimsByRequester({ did, isAccepted, parentNamespace });
    }

    /**
     * @description - Returns claims for given issuer. Allows filtering by status and parent namespace
     */
    async getClaimsByIssuer({
        did,
        isAccepted,
        parentNamespace,
    }: {
        did: string;
        isAccepted?: boolean;
        parentNamespace?: string;
    }) {
        if (!this._cacheClient) {
            throw new CacheClientNotProvidedError();
        }
        return this._cacheClient.getClaimsByIssuer({ did, isAccepted, parentNamespace });
    }

    /**
     * @description - Returns claims for given subject. Allows filtering by status and parent namespace
     */
    async getClaimsBySubject({
        did,
        isAccepted,
        parentNamespace,
    }: {
        did: string;
        isAccepted?: boolean;
        parentNamespace?: string;
    }) {
        if (!this._cacheClient) {
            throw new CacheClientNotProvidedError();
        }
        return this._cacheClient.getClaimsBySubject({ did, isAccepted, parentNamespace });
    }

    protected async nonOwnedNodesOf({
        namespace,
        type,
        owner,
    }: {
        namespace: string;
        type: ENSNamespaceTypes;
        owner: string;
    }) {
        if (![ENSNamespaceTypes.Roles, ENSNamespaceTypes.Application, ENSNamespaceTypes.Organization].includes(type)) {
            throw new Error(ERROR_MESSAGES.ENS_TYPE_NOT_SUPPORTED);
        }
        if (this._address) {
            const namespacesToCheck =
                type === ENSNamespaceTypes.Roles
                    ? [namespace]
                    : type === ENSNamespaceTypes.Application
                    ? [namespace, ENSNamespaceTypes.Application]
                    : [namespace, ENSNamespaceTypes.Application, ENSNamespaceTypes.Organization];
            return Promise.all(namespacesToCheck.map((ns) => this.getOwner({ namespace: ns }))).then((owners) =>
                owners.filter((o) => ![owner, emptyAddress].includes(o)),
            );
        }
        throw new Error(ERROR_MESSAGES.USER_NOT_LOGGED_IN);
    }

    /**
     * @description Collects all namespaces related data. Currently its includes only owner
     * @param namespaces
     */
    async namespacesWithRelations(namespaces: string[]) {
        return Promise.all(
            namespaces.map(async (namespace) => {
                const owner = await this.getOwner({ namespace });
                return {
                    namespace,
                    owner,
                };
            }),
        );
    }

    // ### ASSETS ###
    public async registerAsset(): Promise<string> {
        if (!this._address) {
            throw new Error(ERROR_MESSAGES.USER_NOT_LOGGED_IN);
        }
        try {
            const waitForIdentityCreated = new Promise<string>((resolve) =>
                this._assetManager.once(
                    this._assetManager.filters.IdentityCreated(null, this._address as string, null),
                    (identity) => resolve(identity),
                ),
            );

            await (await this._assetManager.createIdentity(this._address)).wait();

            const identity = await waitForIdentityCreated;

            if (this._cacheClient) {
                let asset = await this.getAssetById({ id: `did:ethr:${identity}` });
                let loops = 0;
                /*
                 * we need to wait until cache server will resolve assets did document
                 * which is taking some time
                 */
                while (!asset && loops < 20) {
                    asset = await this.getAssetById({ id: `did:${Methods.Erc1056}:${identity}` });
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    loops++;
                }
            }
            return identity;
        } catch (err) {
            throw err as Error;
        }
    }

    public async offerAsset({ assetDID, offerTo }: { assetDID: string; offerTo: string }) {
        if (!this._address) {
            throw new Error(ERROR_MESSAGES.USER_NOT_LOGGED_IN);
        }
        const [, , assetContractAddress] = assetDID.split(":");
        const tx = this.offerAssetTx({ assetContractAddress, offerTo });
        await this.send({
            calls: [tx],
            from: this._address,
        });
    }

    public async acceptAssetOffer({ assetDID }: { assetDID: string }) {
        if (!this._address) {
            throw new Error(ERROR_MESSAGES.USER_NOT_LOGGED_IN);
        }
        const [, , assetContractAddress] = assetDID.split(":");
        const tx = this.acceptOfferTx({ assetContractAddress });
        await this.send({
            calls: [tx],
            from: this._address,
        });
    }

    public async rejectAssetOffer({ assetDID }: { assetDID: string }) {
        if (!this._address) {
            throw new Error(ERROR_MESSAGES.USER_NOT_LOGGED_IN);
        }
        const [, , assetContractAddress] = assetDID.split(":");
        const tx = this.rejectOfferTx({ assetContractAddress });
        await this.send({
            calls: [tx],
            from: this._address,
        });
    }

    public async cancelAssetOffer({ assetDID }: { assetDID: string }) {
        if (!this._address) {
            throw new Error(ERROR_MESSAGES.USER_NOT_LOGGED_IN);
        }
        const [, , assetContractAddress] = assetDID.split(":");
        const tx = this.cancelOfferTx({ assetContractAddress });
        await this.send({ calls: [tx], from: this._address });
    }

    public async getOwnedAssets({ did = this._did }: { did?: string } = {}) {
        if (!did) {
            throw new Error(ERROR_MESSAGES.USER_NOT_LOGGED_IN);
        }
        return this._cacheClient.getOwnedAssets({ did });
    }

    public async getOfferedAssets({ did = this._did }: { did?: string } = {}) {
        if (!did) {
            throw new Error(ERROR_MESSAGES.USER_NOT_LOGGED_IN);
        }
        return this._cacheClient.getOfferedAssets({ did });
    }

    public async getAssetById({ id }: { id: string }) {
        if (this._cacheClient) {
            return this._cacheClient.getAssetById({ id });
        }
        throw new Error(ERROR_MESSAGES.CACHE_CLIENT_NOT_PROVIDED);
    }

    public async getPreviouslyOwnedAssets({ owner }: { owner: string }) {
        if (this._cacheClient) {
            return this._cacheClient.getPreviouslyOwnedAssets({ owner });
        }
        throw new Error(ERROR_MESSAGES.CACHE_CLIENT_NOT_PROVIDED);
    }

    public async getAssetHistory({
        id,
        ...query
    }: {
        id: string;
        order?: Order;
        take?: number;
        skip?: number;
        type?: AssetHistoryEventType;
    }) {
        if (this._cacheClient) {
            return this._cacheClient.getAssetHistory({ id, ...query });
        }
        throw new Error(ERROR_MESSAGES.CACHE_CLIENT_NOT_PROVIDED);
    }
}
