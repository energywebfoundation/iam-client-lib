import type { RoleCredentialSubject } from '@energyweb/credential-governance';
import {
  CredentialResolver,
  RoleEIP191JWT,
  RolePayload,
  filterOutMaliciousClaims,
  isEIP191Jwt,
  isVerifiableCredential,
  transformClaim,
} from '@energyweb/vc-verification';
import { VerifiableCredential } from '@ew-did-registry/credentials-interface';
import { Resolver } from '@ew-did-registry/did-ethr-resolver';
import {
  IServiceEndpoint,
  RegistrySettings,
} from '@ew-did-registry/did-resolver-interface';
import { IDidStore } from '@ew-did-registry/did-store-interface';
import { providers, utils } from 'ethers';
import * as jwt from 'jsonwebtoken';
import { S3DidStore } from '../did-registry/did.store';

export class S3CredentialResolver implements CredentialResolver {
  private _didStore: IDidStore;
  private _resolver: Resolver;

  constructor(
    provider: providers.Provider,
    registrySetting: RegistrySettings,
    didStore: S3DidStore
  ) {
    this._didStore = didStore;
    this._resolver = new Resolver(provider, registrySetting);
  }

  /**
   * Fetches credential for the given did and role for a vc issuance hierarchy
   *
   * ```typescript
   * const credentialResolver = new IpfsCredentialResolver(
   *  provider,
   *  registrySettings,
   *  didStore );
   * const credential = credentialResolver.getCredential('did:ethr:1234', 'sampleRole');
   * ```
   *
   * @param did subject DID for which the credential needs to be fetched
   * @param namespace role for which the credential needs to be fetched
   * @returns
   */
  async getCredential(
    did: string,
    namespace: string
  ): Promise<
    VerifiableCredential<RoleCredentialSubject> | RoleEIP191JWT | undefined
  > {
    let credential:
      | VerifiableCredential<RoleCredentialSubject>
      | RoleEIP191JWT
      | undefined;
    credential = await this.getVerifiableCredential(did, namespace);
    if (!credential) {
      credential = await this.getEIP191JWT(did, namespace);
    }
    return credential;
  }

  /**
   * Fetches Verifiable Credential for the given did and role for a vc issuance hierarchy
   *
   * ```typescript
   * const credentialResolver = new IpfsCredentialResolver(
   *  provider,
   *  registrySettings,
   *  didStore );
   * const credential = credentialResolver.getVerifiableCredential('did:ethr:1234', 'sampleRole');
   * ```
   *
   * @param did subject DID for which the credential needs to be fetched
   * @param namespace role for which the credential needs to be fetched
   * @returns
   */
  async getVerifiableCredential(did: string, namespace: string) {
    const credentials = await this.credentialsOf(did);
    return credentials.find(
      (claim) =>
        claim.credentialSubject.role.namespace === namespace ||
        utils.namehash(claim.credentialSubject.role.namespace) === namespace
    );
  }

  /**
   * Fetches RoleEIP191JWT for the given did and role for an RoleEIP191JWT issuance hierarchy
   *
   * ```typescript
   * const credentialResolver = new IpfsCredentialResolver(
   *  provider,
   *  registrySettings,
   *  didStore );
   * const credential = credentialResolver.getEIP191JWT('did:ethr:1234', 'sampleRole');
   * ```
   *
   * @param did subject DID for which the credential to be fetched
   * @param namespace role for which the credential need to be fetched
   * @returns RoleEIP191JWT
   */
  async getEIP191JWT(
    did: string,
    namespace: string
  ): Promise<RoleEIP191JWT | undefined> {
    const eip191Jwts = await this.eip191JwtsOf(did);
    return eip191Jwts.find(
      (jwt) =>
        jwt?.payload?.claimData.claimType === namespace ||
        utils.namehash(jwt?.payload?.claimData.claimType) === namespace
    );
  }

  /**
   * Fetches all the Role eip191Jwts belonging to the subject DID
   * @param did subject DID
   * @returns RoleEIP191JWT list
   */
  async eip191JwtsOf(did: string): Promise<RoleEIP191JWT[]> {
    const didDocument = await this._resolver.read(did);
    const services: IServiceEndpoint[] = didDocument.service || [];
    return (
      await Promise.all(
        services.map(async ({ serviceEndpoint }) => {
          const claimToken = await this._didStore.get(serviceEndpoint);
          let rolePayload: RolePayload | undefined;
          // expect that JWT has 3 dot-separated parts
          if (claimToken.split('.').length === 3) {
            rolePayload = jwt.decode(claimToken) as RolePayload;
          }
          return {
            payload: rolePayload,
            eip191Jwt: claimToken,
          } as RoleEIP191JWT;
        })
      )
    )
      .filter(isEIP191Jwt)
      .map(transformClaim)
      .filter(filterOutMaliciousClaims);
  }

  /**
   * Fetches all the Verifiable Credential belonging to the subject DID
   * @param did subject DID
   * @returns VerifiableCredential<RoleCredentialSubject> list
   */
  async credentialsOf(
    did: string
  ): Promise<VerifiableCredential<RoleCredentialSubject>[]> {
    const didDocument = await this._resolver.read(did);
    const services: IServiceEndpoint[] = didDocument.service || [];
    return (
      await Promise.all(
        services.map(async ({ serviceEndpoint }) => {
          const credential = await this._didStore.get(serviceEndpoint);
          let vc;
          // expect that JWT would have 3 dot-separated parts, VC is non-JWT credential
          if (!(credential.split('.').length === 3)) {
            vc = JSON.parse(credential);
          }
          return vc as VerifiableCredential<RoleCredentialSubject>;
        })
      )
    ).filter(isVerifiableCredential);
  }
}