import { IPublicClaim } from '@ew-did-registry/claims';
import {
  DIDAttribute,
  IServiceEndpoint,
  IUpdateData,
  PubKeyType,
} from '@ew-did-registry/did-resolver-interface';
import { KeyType } from '@ew-did-registry/keys';
import { type ClaimData } from '@energyweb/vc-verification';
import { has } from 'lodash';

export interface AssetProfile {
  name?: string;
  icon?: string;
}

export interface IpfsConfig {
  host: string;
  port?: number;
  protocol?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  export interface ClaimData extends Record<string, unknown> {
    profile?: Profile;
    issuerFields?: { key: string; value: string | number }[];
  }
}
export { ClaimData };

export interface GetDIDDocumentOptions {
  /* DID of the user */
  did?: string;

  /* Indicates resolving claims object */
  includeClaims?: boolean;
}

export interface GetServicesOptions {
  /* DID of the user */
  did?: string;
}

export interface GetDidPublicKeysOptions {
  /* DID of the user */
  did?: string;
}

export interface GetDidDelegatesOptions {
  /* DID of the user */
  did?: string;
}

export interface CreatePublicClaimOptions {
  /* Claim data */
  data: Record<string, unknown>;

  /* Subject of the claim */
  subject?: string;
}

export interface IssuePublicClaimOptions {
  /* Signed JWT claim token */
  token?: string;

  /* Public claim data object */
  publicClaim?: IPublicClaim;

  /** A Unix timestamp expressed in milliseconds of when the claim expires. */
  expirationTimestamp?: number;
}

export interface UpdateDocumentOptions {
  /* Type of document to be updated */
  didAttribute: DIDAttribute;

  /* New attribute value */
  data: IUpdateData;

  /* DID of the document to be updated */
  did?: string;

  /* Time (s) for the attribute to expire */
  validity?: number;
}

export interface UpdateSignedDidPublicKeyOptions {
  /* DID of the document to be updated */
  did: string;

  /* New public key */
  publicKey: string;

  /* Algorithm of the new public key */
  algo: KeyType;

  /* Type of the new public key */
  type: PubKeyType;

  /* Tag for the new public key */
  tag: string;

  /* Time (s) for the attribute to expire */
  validity?: number;
}

export interface UpdateSignedDidDelegateOptions {
  /* DID of the document to be updated */
  did: string;

  /* New delegate public key */
  delegatePublicKey: string;

  /* Algorithm of the new public key */
  algo: KeyType;

  /* Type of the new public key */
  type: PubKeyType;

  /* Time (s) for the attribute to expire */
  validity?: number;
}

export interface DecodeJWTTokenOptions {
  /* Signed JWT token */
  token: string;
}

export interface DownloadClaimsOptions {
  /* services endpoint of the DID documents */
  services: IServiceEndpoint[];
}

export interface ValidDateUpdateDocumentRequestOptions {
  /* Type of document to be updated */
  didAttribute: DIDAttribute;

  /* New attribute value */
  data: IUpdateData;

  /* DID of the document to be updated */
  did: string;
}

export const isClaimService = (
  service: IServiceEndpoint
): service is IServiceEndpoint &
  Pick<ClaimData, 'claimType' | 'claimTypeVersion'> => {
  return has(service, 'claimType') && has(service, 'claimTypeVersion');
};
