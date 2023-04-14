import { IPublicClaim } from '@ew-did-registry/claims';
import { DIDAttribute, IServiceEndpoint, IUpdateData, PubKeyType } from '@ew-did-registry/did-resolver-interface';
import { KeyType } from '@ew-did-registry/keys';
import { type ClaimData } from '@energyweb/vc-verification';
export interface AssetProfile {
    name?: string;
    icon?: string;
}
export interface IpfsConfig {
    host: string;
    port?: number;
    protocol?: string;
    headers?: Record<string, any>;
}
export interface AssetProfiles {
    [key: string]: AssetProfile;
}
export interface Profile {
    name?: string;
    birthdate?: string;
    address?: string;
    assetProfiles?: AssetProfiles;
}
declare module '@energyweb/vc-verification' {
    interface ClaimData extends Record<string, unknown> {
        profile?: Profile;
        issuerFields?: {
            key: string;
            value: string | number;
        }[];
    }
}
export { ClaimData };
export interface GetDIDDocumentOptions {
    did?: string;
    includeClaims?: boolean;
}
export interface GetServicesOptions {
    did?: string;
}
export interface GetDidPublicKeysOptions {
    did?: string;
}
export interface GetDidDelegatesOptions {
    did?: string;
}
export interface CreatePublicClaimOptions {
    data: Record<string, unknown>;
    subject?: string;
}
export interface IssuePublicClaimOptions {
    token?: string;
    publicClaim?: IPublicClaim;
    /** A Unix timestamp expressed in milliseconds of when the claim expires. */
    expirationTimestamp?: number;
}
export interface UpdateDocumentOptions {
    didAttribute: DIDAttribute;
    data: IUpdateData;
    did?: string;
    validity?: number;
}
export interface UpdateSignedDidPublicKeyOptions {
    did: string;
    publicKey: string;
    algo: KeyType;
    type: PubKeyType;
    tag: string;
    validity?: number;
}
export interface UpdateSignedDidDelegateOptions {
    did: string;
    delegatePublicKey: string;
    algo: KeyType;
    type: PubKeyType;
    validity?: number;
}
export interface DecodeJWTTokenOptions {
    token: string;
}
export interface DownloadClaimsOptions {
    services: IServiceEndpoint[];
}
export interface ValidDateUpdateDocumentRequestOptions {
    didAttribute: DIDAttribute;
    data: IUpdateData;
    did: string;
}
export declare const isClaimService: (service: IServiceEndpoint) => service is IServiceEndpoint & Pick<ClaimData, "claimType" | "claimTypeVersion">;
