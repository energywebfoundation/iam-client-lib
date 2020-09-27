import { providers, Signer, utils } from "ethers";
import { EnrolmentFormData } from "./models/enrolment-form-data";
import { DIDAttribute, IDIDDocument, IUpdateData } from "@ew-did-registry/did-resolver-interface";
import { ISaltedFields } from "@ew-did-registry/claims";
declare type ConnectionOptions = {
    rpcUrl: string;
    chainId?: number;
    infuraId?: string;
    ensResolverAddress?: string;
    ensRegistryAddress?: string;
    ipfsUrl?: string;
};
declare type InitializeData = {
    did: string | undefined;
    connected: boolean;
    userClosedModal: boolean;
};
export declare class IAM {
    private _did;
    private _provider;
    private _walletConnectProvider;
    private _address;
    private _signer;
    private _resolverSetting;
    private _resolver;
    private _document;
    private _userClaims;
    private _issuerClaims;
    private _verifierClaims;
    private _ipfsStore;
    private _jwt;
    private _ensRegistry;
    private _ensResolver;
    private _ensResolverAddress;
    private _ensRegistryAddress;
    constructor({ rpcUrl, chainId, infuraId, ensRegistryAddress, ensResolverAddress, ipfsUrl }: ConnectionOptions);
    private init;
    private setAddress;
    private setSigner;
    private setResolver;
    private setDid;
    private setupENS;
    private setDocument;
    private setClaims;
    private setJWT;
    getDid(): string | undefined;
    getSigner(): providers.JsonRpcSigner | Signer | undefined;
    initializeConnection(): Promise<InitializeData>;
    closeConnection(): Promise<void>;
    isConnected(): boolean;
    getDidDocument(): Promise<IDIDDocument | null>;
    updateDidDocument({ didAttribute, data, validity }: {
        didAttribute: DIDAttribute;
        data: IUpdateData;
        validity?: number;
    }): Promise<boolean>;
    revokeDidDocument(): Promise<boolean>;
    createPublicClaim({ data }: {
        data: Record<string, unknown>;
    }): Promise<string | null>;
    publishPublicClaim({ token, claimData }: {
        token: string;
        claimData: Record<string, unknown>;
    }): Promise<string | null>;
    createProofClaim({ claimUrl, saltedFields }: {
        claimUrl: string;
        saltedFields: ISaltedFields;
    }): Promise<string | null>;
    issuePublicClaim({ token }: {
        token: string;
    }): Promise<string | null>;
    verifyPublicClaim({ issuedToken }: {
        issuedToken: string;
    }): Promise<import("@ew-did-registry/claims").IPublicClaim | null>;
    createSelfSignedClaim({ data }: {
        data: Record<string, unknown>;
    }): Promise<void>;
    getUserClaims(): Promise<{
        [x: string]: string | number | utils.BigNumber;
        id: string;
        type: string;
        description?: string | undefined;
        validity?: utils.BigNumber | undefined;
        block?: number | undefined;
        hash?: string | undefined;
    }[]>;
    private createSubdomain;
    private setDomainName;
    private getFilteredDomainsFromEvent;
    setRoleDefinition({ domain, data }: {
        domain: string;
        data: string;
    }): Promise<void>;
    createRole({ roleName, namespace, data }: {
        roleName: string;
        namespace: string;
        data: string;
    }): Promise<void>;
    getRoleDefinition({ roleName }: {
        roleName: string;
    }): Promise<string>;
    getSubdomains({ domain }: {
        domain: string;
    }): Promise<string[] | undefined>;
    checkExistenceOfDomain({ domain }: {
        domain: string;
    }): Promise<boolean>;
    isOwner({ domain, user }: {
        domain: string;
        user?: string;
    }): Promise<boolean>;
    getOrgRoles(orgKey: string): Promise<Array<Record<string, unknown>>>;
    enrol(data: EnrolmentFormData): Promise<Record<string, unknown>>;
    getEnrolmentStatus(): Promise<Record<string, unknown>>;
    getIdentities(): null;
}
export {};
