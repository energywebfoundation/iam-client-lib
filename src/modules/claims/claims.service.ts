import { providers, utils, Wallet } from 'ethers';
import jsonwebtoken from 'jsonwebtoken';
import { v4 } from 'uuid';
import {
  IRoleDefinition,
  IRoleDefinitionV2,
  PreconditionType,
  RoleCredentialSubject,
} from '@energyweb/credential-governance';
import {
  VerifiableCredential,
  VerifiablePresentation,
} from '@ew-did-registry/credentials-interface';
import { ClaimRevocation } from '@energyweb/onchain-claims';
import { Methods } from '@ew-did-registry/did';
import { Algorithms } from '@ew-did-registry/jwt';
import { addressOf, EwSigner } from '@ew-did-registry/did-ethr-resolver';
import { hashes, IPublicClaim } from '@ew-did-registry/claims';
import {
  DIDAttribute,
  IServiceEndpoint,
  ProviderTypes,
} from '@ew-did-registry/did-resolver-interface';
import { JWT } from '@ew-did-registry/jwt';
import { privToPem, KeyType } from '@ew-did-registry/keys';
import { ClaimManager__factory } from '../../../ethers/factories/ClaimManager__factory';
import { ERROR_MESSAGES } from '../../errors';
import { emptyAddress } from '../../utils/constants';
import { canonizeSig } from '../../utils/enrollment';
import { CacheClient } from '../cache-client/cache-client.service';
import { DomainsService } from '../domains/domains.service';
import { NamespaceType } from '../domains/domains.types';
import { SignerService } from '../signer/signer.service';
import { chainConfigs } from '../../config/chain.config';
import {
  IClaimIssuance,
  IClaimRejection,
  IClaimRequest,
  RegistrationTypes,
  eternityTimestamp,
  erc712_type_hash,
  proof_type_hash,
  typedMsgPrefix,
  Claim,
  GetClaimsByRequesterOptions,
  GetClaimsByIssuerOptions,
  GetClaimsBySubjectOptions,
  CreateClaimRequestOptions,
  IssueClaimRequestOptions,
  RegisterOnchainOptions,
  RejectClaimRequestOptions,
  DeleteClaimOptions,
  IssueClaimOptions,
  PublishPublicClaimOptions,
  CreateSelfSignedClaimOptions,
  GetUserClaimsOptions,
  VerifyEnrolmentPrerequisitesOptions,
  IssueVerifiablePresentationOptions,
  ApproveRolePublishingOptions,
  RevokeClaimOptions,
  RevokeMultipleClaimOptions,
  IsClaimRevokedOptions,
  ClaimRevocationDetailsOptions,
  GetRevocationClaimDetailsOptions,
  GetRevocationClaimDetailsResult,
  ClaimRevocationDetailsResult,
  GetClaimsByRevokerOptions,
  CredentialVerificationResult,
} from './claims.types';
import {
  CredentialResolver,
  EthersProviderIssuerResolver,
  EthersProviderRevokerResolver,
  IpfsCredentialResolver,
  IssuerVerification,
  RevocationVerification,
  RoleEIP191JWT,
} from '@energyweb/vc-verification';
import { DidRegistry } from '../did-registry/did-registry.service';
import { ClaimData } from '../did-registry/did.types';
import { compareDID, isValidDID } from '../../utils/did';
import { readyToBeRegisteredOnchain } from './claims.types';
import { VerifiableCredentialsServiceBase } from '../verifiable-credentials';
import { StatusListEntryVerification } from '@ew-did-registry/revocation';

const {
  id,
  keccak256,
  defaultAbiCoder,
  solidityKeccak256,
  namehash,
  arrayify,
} = utils;

/**
 * Service responsible for handling the request and issuance of claims.
 * See more information about claims in IAM stack [here](../../../docs/guides/claim.md).
 *
 * ```typescript
 * const { connectToCacheServer } = await initWithPrivateKeySigner(privateKey, rpcUrl);
 * const { connectToDidRegistry } = await connectToCacheServer();
 * const { claimsService } = await connectToDidRegistry();
 * claimsService.getClaimById(claim.id);
 * ```
 */
export class ClaimsService {
  private _claimManager: string;
  private _claimManagerInterface = ClaimManager__factory.createInterface();
  private _claimRevocation: ClaimRevocation;
  private _issuerVerification: IssuerVerification;
  private _issuerResolver: EthersProviderIssuerResolver;
  private _credentialResolver: CredentialResolver;
  private _statusVerifier: StatusListEntryVerification;

  constructor(
    private _signerService: SignerService,
    private _domainsService: DomainsService,
    private _cacheClient: CacheClient,
    private _didRegistry: DidRegistry,
    private _verifiableCredentialService: VerifiableCredentialsServiceBase
  ) {
    this._signerService.onInit(this.init.bind(this));
    this._setIssuerVerifier();
    this._setStatusVerifier();
  }

  static async create(
    signerService: SignerService,
    domainsService: DomainsService,
    cacheClient: CacheClient,
    didRegistry: DidRegistry,
    verifiableCredentialService: VerifiableCredentialsServiceBase
  ) {
    const service = new ClaimsService(
      signerService,
      domainsService,
      cacheClient,
      didRegistry,
      verifiableCredentialService
    );
    await service.init();
    return service;
  }

  async init() {
    const chainId = this._signerService.chainId;
    this._claimManager = chainConfigs()[chainId].claimManagerAddress;

    const signer = this._signerService.signer;
    const provider = signer.provider;
    const publicKey = await this._signerService.publicKey();
    let ewSigner: EwSigner;
    if (
      signer instanceof Wallet &&
      provider instanceof providers.JsonRpcProvider
    ) {
      ewSigner = EwSigner.fromPrivateKey(signer.privateKey, {
        type: ProviderTypes.HTTP,
        uriOrInfo: provider.connection.url,
      });
    } else if (provider instanceof providers.JsonRpcProvider) {
      ewSigner = EwSigner.fromEthersSigner(signer, publicKey);
    } else {
      /** @todo from EIP1193Provider */
      throw new Error(ERROR_MESSAGES.UNKNOWN_PROVIDER);
    }

    this._claimRevocation = new ClaimRevocation(
      ewSigner,
      chainConfigs()[chainId].claimsRevocationRegistryAddress
    );
  }

  /**
   * A utility function to check the blockchain directly if a DID has a role.
   *
   * ```typescript
   * claimsService.hasOnChainRole('did:ethr:ewc:0x00...0', 'email.roles.iam.ewc', 1);
   * ```
   *
   * @param {string} did The ethr DID to check
   * @param {string} role The role to check (the full namespace)
   * @param {number} version The version to check
   * @return `true` if DID has role at the version. `false` if not.
   */
  async hasOnChainRole(
    did: string,
    role: string,
    version: number
  ): Promise<boolean> {
    // TODO: fail if the DID chain ID doesn't match the configured signer network connection
    const data = this._claimManagerInterface.encodeFunctionData('hasRole', [
      addressOf(did),
      namehash(role),
      version,
    ]);
    // Expect result to be either:
    // '0x0000000000000000000000000000000000000000000000000000000000000000'
    // '0x0000000000000000000000000000000000000000000000000000000000000001'
    const result = await this._signerService.call({
      to: this._claimManager,
      data,
    });
    const intFromHexString = Number.parseInt(result);
    return Boolean(intFromHexString);
  }

  /**
   * Retrieve claims related to a given subjects.
   *
   * ```typescript
   * claimsService.getClaimsBySubjects(['did:ethr:0x00...0', 'did:ethr:0x00...1', ...]);
   * ```
   *
   * @param {Array<string>} subjects list of subjects
   * @returns list of claims
   */
  async getClaimsBySubjects(subjects: string[]): Promise<Claim[]> {
    return this._cacheClient.getClaimsBySubjects(subjects);
  }

  /**
   * Retrieve claims requested by a given requester with allowing filter by status and parent namespace.
   *
   * ```typescript
   * claimsService.getClaimsByRequester({
   *     did: 'did:ethr:0x00...0',
   *     isAccepted: false,
   *     namespace: 'energyweb.iam.ewc',
   * });
   * ```
   *
   * @param {GetClaimsByRequesterOptions} options object containing options
   * @returns list of claims
   */
  async getClaimsByRequester({
    did,
    isAccepted,
    namespace,
  }: GetClaimsByRequesterOptions): Promise<Claim[]> {
    return this._cacheClient.getClaimsByRequester(did, {
      isAccepted,
      namespace,
    });
  }

  /**
   * Retrieve claims issued by a given issuer with allowing filter by status and parent namespace.
   *
   * ```typescript
   * claimsService.getClaimsByIssuer({
   *     did: 'did:ethr:0x00...0',
   *     isAccepted: false,
   *     namespace: 'energyweb.iam.ewc',
   * });
   * ```
   *
   * @param {GetClaimsByIssuerOptions} options object containing options
   * @returns list of claims
   */
  async getClaimsByIssuer({
    did,
    isAccepted,
    namespace,
  }: GetClaimsByIssuerOptions): Promise<Claim[]> {
    return this._cacheClient.getClaimsByIssuer(did, { isAccepted, namespace });
  }

  /**
   * Retrieve claims for given subject with allowing filter by status and parent namespace.
   *
   * ```typescript
   * claimsService.getClaimsBySubject({
   *     did: 'did:ethr:0x00...0',
   *     isAccepted: false,
   *     namespace: 'energyweb.iam.ewc',
   * });
   * ```
   *
   * @param {GetClaimsBySubjectOptions} options object containing options
   * @returns list of claims
   */
  async getClaimsBySubject({
    did,
    isAccepted,
    namespace,
  }: GetClaimsBySubjectOptions): Promise<Claim[]> {
    return this._cacheClient.getClaimsBySubject(did, { isAccepted, namespace });
  }

  /**
   * Retrieve all claims that a user can revoke. Allow to filter by namespace
   *
   * ```typescript
   * claimsService.getClaimsByRevoker({
   *  did: 'did:ethr:0x00...0',
   *  namespace: 'energyweb.iam.ewc',
   * });
   * ```
   *
   * @param {GetClaimsByRevokerOptions} options
   * @return list of claims
   */
  async getClaimsByRevoker({
    did,
    namespace,
  }: GetClaimsByRevokerOptions): Promise<Claim[]> {
    return this._cacheClient.getClaimsByRevoker(did, { namespace });
  }

  /**
   * Retrieve claim with given id.
   *
   * ```typescript
   * const claimId = '7281a130-e2b1-430d-8c14-201010eae901';
   * claimsService.getClaimById(claimId);
   * ```
   *
   * @param {string} claimId claim id
   * @return claim with given id
   */
  async getClaimById(claimId: string): Promise<Claim | undefined> {
    return this._cacheClient.getClaimById(claimId);
  }

  /**
   * Allows subject to request for credential by creating and sending a claim request to claim issuer.
   *
   * ```typescript
   * claimsService.createClaimRequest({
   *     claim: {
   *          claimType: 'email.roles.energyweb.iam.ewc',
   *          claimTypeVersion: 1,
   *          requestorFields: [{key: 'foo', value: 'bar'}],
   *     };
   *     subject: 'did:ethr:0x00...0',
   *     registrationTypes: [RegistrationTypes.OnChain, RegistrationTypes.OffChain]
   * });
   * ```
   *
   * @param {CreateClaimRequestOptions} options object containing options
   */
  async createClaimRequest({
    claim,
    subject = this._signerService.did,
    registrationTypes = [RegistrationTypes.OffChain],
  }: CreateClaimRequestOptions): Promise<void> {
    const { claimType: role, claimTypeVersion: version } = claim;
    const token = await this._didRegistry.createPublicClaim({
      data: claim,
      subject,
    });

    await this.verifyEnrolmentPrerequisites({ subject, role });

    // temporarily, until claimIssuer is not removed from Claim entity
    const issuer = [
      `did:${
        Methods.Erc1056
      }:${this._signerService.chainName()}:${emptyAddress}`,
    ];

    const message: IClaimRequest = {
      id: v4(),
      token,
      claimIssuer: issuer,
      requester: this._signerService.did,
      registrationTypes,
      claimType: role,
      claimTypeVersion: version.toString(),
    };

    if (registrationTypes.includes(RegistrationTypes.OnChain)) {
      if (!version) {
        throw new Error(ERROR_MESSAGES.ONCHAIN_ROLE_VERSION_NOT_SPECIFIED);
      }
      message.subjectAgreement = await this.approveRolePublishing({
        subject,
        role,
        version,
      });
    }

    await this._cacheClient.requestClaim(message);
  }

  /**
   * Issue a claim request by signing both off-chain and on-chain request and persisting result to the cache-server.
   * Optionally, issue on-chain role can be submitted to the ClaimManager contract as well.
   * If `credentialStatus` is not overridden then status from ssi-hub will be set.
   *
   * ```typescript
   * const claim: Claim = await claimsService.getClaimById('7281a130-e2b1-430d-8c14-201010eae901');
   * claimsService.issueClaimRequest({
   *     requester: claim.requester,
   *     token: claim.token,
   *     id: claim.id,
   *     subjectAgreement: claim.subjectAgreement,
   *     registrationTypes: claim.registrationTypes;
   *     issuerFields: [{key: 'foo', value: 'bar'}],
   *     publishOnChain: false,
   * });
   * ```
   *
   * @param {IssueClaimRequestOptions} options object containing options
   */
  async issueClaimRequest({
    requester,
    token,
    id,
    subjectAgreement,
    registrationTypes,
    issuerFields,
    publishOnChain = true,
    credentialStatusOverride,
    expirationTimestamp,
  }: IssueClaimRequestOptions): Promise<void> {
    const { claimData, sub } = this._didRegistry.jwt.decode(token) as {
      claimData: { claimType: string; claimTypeVersion: number };
      sub: string;
    };

    const roleDefinition = await this._domainsService.getDefinition({
      type: NamespaceType.Role,
      namespace: claimData.claimType,
    });

    await this.verifyEnrolmentPrerequisites({
      subject: sub,
      role: claimData.claimType,
      roleDefinition,
    });

    const strippedClaimData = this.stripClaimData(claimData);
    const { claimType: role, claimTypeVersion: version } = claimData;

    const claimExpirationTimestamp = this.getClaimExpirationTimestamp(
      roleDefinition as IRoleDefinitionV2,
      expirationTimestamp
    );

    const message: IClaimIssuance = {
      id,
      requester,
      claimIssuer: [this._signerService.did],
      acceptedBy: this._signerService.did,
      expirationTimestamp: claimExpirationTimestamp,
    };

    if (registrationTypes.includes(RegistrationTypes.OnChain)) {
      const expiry = claimExpirationTimestamp || eternityTimestamp;
      const onChainProof = await this.createOnChainProof(
        role,
        version,
        expiry,
        sub
      );
      if (!subjectAgreement) {
        throw new Error(
          ERROR_MESSAGES.ONCHAIN_ROLE_SUBJECT_AGREEMENT_NOT_SPECIFIED
        );
      }
      message.onChainProof = onChainProof;
      if (publishOnChain) {
        await this.registerOnchain({
          token,
          subjectAgreement,
          onChainProof,
          acceptedBy: this._signerService.did,
          expirationTimestamp: expiry,
        });
      }
    }

    if (registrationTypes.includes(RegistrationTypes.OffChain)) {
      await this.verifyIssuer(claimData.claimType);
      const vp = await this.issueVerifiablePresentation({
        subject: sub,
        namespace: role,
        version: version.toString(),
        issuerFields,
        credentialStatus: credentialStatusOverride,
        expirationTimestamp: claimExpirationTimestamp,
      });
      const vpCredentialStatus = vp?.verifiableCredential[0]?.credentialStatus;
      const credentialStatus = credentialStatusOverride || vpCredentialStatus;
      const publicClaim: IPublicClaim = {
        did: sub,
        signer: this._signerService.did,
        claimData: {
          ...strippedClaimData,
          ...(issuerFields && { issuerFields }),
        },
        ...(credentialStatus && { credentialStatus }),
      };
      const issuedToken = await this._didRegistry.issuePublicClaim({
        publicClaim,
        expirationTimestamp: claimExpirationTimestamp,
      });
      message.issuedToken = issuedToken;
      message.vp = JSON.stringify(vp);
    }

    await this._cacheClient.issueClaim(this._signerService.did, message);
  }

  /**
   * Register issued on-chain claim on Claim Manager contract.
   *
   * ```typescript
   * const claim: Claim = await claimsService.getClaimById('7281a130-e2b1-430d-8c14-201010eae901');
   * claimsService.registerOnchain({
   *     claimType: claim.claimType,
   *     claimTypeVersion: claim.claimTypeVersion,
   *     subjectAgreement: claim.subjectAgreement,
   *     onChainProof: claim.onChainProof,
   *     acceptedBy: claim.acceptedBy;
   *     subject: claim.subject,
   * });
   * ```
   *
   * @param {RegisterOnchainOptions} claim object containing options
   */
  async registerOnchain(claim: RegisterOnchainOptions): Promise<void> {
    // backward compatibility with token
    if (claim.token) {
      claim = { ...claim, ...this.extractClaimRequest(claim.token) };
    }

    if (
      !claim.subjectAgreement &&
      claim.subject === this._signerService.did &&
      claim.claimType &&
      claim.claimTypeVersion
    ) {
      claim.subjectAgreement = await this.approveRolePublishing({
        subject: this._signerService.did,
        role: claim.claimType as string,
        version: +claim.claimTypeVersion,
      });
    }

    if (!readyToBeRegisteredOnchain(claim)) {
      throw new Error(ERROR_MESSAGES.CLAIM_WAS_NOT_ISSUED);
    }
    const {
      subject,
      claimTypeVersion,
      claimType,
      acceptedBy,
      subjectAgreement,
      onChainProof,
      expirationTimestamp,
    } = claim;
    const expiry = expirationTimestamp || eternityTimestamp;
    const data = this._claimManagerInterface.encodeFunctionData('register', [
      addressOf(subject),
      namehash(claimType),
      claimTypeVersion,
      expiry,
      addressOf(acceptedBy),
      subjectAgreement,
      onChainProof,
    ]);
    await this._signerService.send({
      to: this._claimManager,
      data,
    });
  }

  /**
   * Reject claim request.
   *
   * ```typescript
   * const claim: Claim = await claimsService.getClaimById('7281a130-e2b1-430d-8c14-201010eae901');
   * claimsService.rejectClaimRequest({
   *     id: claim.id,
   *     requesterDID: claim.requester,
   *     rejectionReason: 'some reason',
   * });
   * ```
   *
   * @param {RejectClaimRequestOptions} options object containing options
   */
  async rejectClaimRequest({
    id,
    requesterDID,
    rejectionReason,
  }: RejectClaimRequestOptions): Promise<void> {
    const message: IClaimRejection = {
      id,
      requester: requesterDID,
      claimIssuer: [this._signerService.did],
      isRejected: true,
      rejectionReason,
    };

    return this._cacheClient.rejectClaim(this._signerService.did, message);
  }

  /**
   * Delete claim request. Works only for pending claims (not issued or rejected).
   *
   * ```typescript
   * claimsService.deleteClaim({
   *     id: '7281a130-e2b1-430d-8c14-201010eae901',
   * });
   * ```
   *
   * @param {DeleteClaimOptions} options object containing options
   */
  async deleteClaim({ id }: DeleteClaimOptions): Promise<void> {
    await this._cacheClient.deleteClaim(id);
  }

  /**
   * Issue claim without previous request. Option available for issuers only.
   * If `credentialStatus` is not overridden then status from ssi-hub will be set.
   *
   * ```typescript
   * claimsService.issueClaim({
   *     claim: {
   *          claimType: 'email.roles.energyweb.iam.ewc',
   *          claimTypeVersion: 1,
   *          issuerFields: [{key: 'foo', value: 'bar'}],
   *     };
   *     subject: 'did:ethr:0x00...0',
   *     registrationTypes: [RegistrationTypes.OnChain, RegistrationTypes.OffChain]
   * });
   * ```
   *
   * @param {IssueClaimOptions} options object containing options
   * @return Issued token if registrationTypes includes RegistrationTypes.OffChain
   */
  async issueClaim({
    subject,
    registrationTypes = [RegistrationTypes.OffChain],
    claim,
    credentialStatusOverride,
    expirationTimestamp,
  }: IssueClaimOptions): Promise<string | undefined> {
    const roleDefinition = await this._domainsService.getDefinition({
      type: NamespaceType.Role,
      namespace: claim.claimType,
    });

    await this.verifyIssuer(claim.claimType);
    await this.verifyEnrolmentPrerequisites({
      subject,
      role: claim.claimType,
      roleDefinition,
    });

    const claimExpirationTimestamp = this.getClaimExpirationTimestamp(
      roleDefinition as IRoleDefinitionV2,
      expirationTimestamp
    );

    const message: IClaimIssuance = {
      id: v4(),
      requester: subject,
      claimIssuer: [this._signerService.did],
      acceptedBy: this._signerService.did,
      expirationTimestamp: claimExpirationTimestamp,
    };

    if (registrationTypes.includes(RegistrationTypes.OffChain)) {
      const vp = await this.issueVerifiablePresentation({
        subject,
        namespace: claim.claimType,
        version: claim.claimTypeVersion.toString(),
        issuerFields: claim.issuerFields,
        credentialStatus: credentialStatusOverride,
        expirationTimestamp: claimExpirationTimestamp,
      });
      const vpCredentialStatus = vp?.verifiableCredential[0]?.credentialStatus;
      const credentialStatus = credentialStatusOverride || vpCredentialStatus;
      const publicClaim: IPublicClaim = {
        did: subject,
        signer: this._signerService.did,
        claimData: claim,
        ...(credentialStatus && { credentialStatus }),
      };
      const issuedToken = await this._didRegistry.issuePublicClaim({
        publicClaim,
        expirationTimestamp: claimExpirationTimestamp,
      });
      message.issuedToken = issuedToken;
      message.vp = JSON.stringify(vp);
    }

    if (registrationTypes.includes(RegistrationTypes.OnChain)) {
      const { claimType: role, claimTypeVersion: version } = claim;
      const expiry = claimExpirationTimestamp || eternityTimestamp;
      const onChainProof = await this.createOnChainProof(
        role,
        version,
        expiry,
        subject
      );
      message.onChainProof = onChainProof;
      message.claimType = role;
      message.claimTypeVersion = version.toString();
    }

    await this._cacheClient.issueClaim(this._signerService.did, message);

    return message.issuedToken;
  }

  // TODO: create docs annotations
  async getClaimId({ claimData }: { claimData: ClaimData }) {
    const services = await this._didRegistry.getServices();
    const service = services.find(
      ({ profile, claimType, claimTypeVersion }) =>
        Boolean(profile) ||
        (claimType === claimData.claimType &&
          claimTypeVersion === claimData.claimTypeVersion)
    );

    if (!service) return v4();

    if (claimData.profile && service.id) {
      return service.id;
    }

    if (
      claimData.claimType &&
      service.id &&
      claimData.claimTypeVersion === service.claimTypeVersion
    ) {
      return service.id;
    }
    return v4();
  }

  /**
   * Register role to claim manager contract if registrationTypes includes RegistrationTypes.OnChain
   * Publish role to IPFS and add DID document service if registrationTypes includes RegistrationTypes.OffChain
   *
   * ```typescript
   * const claim: Claim = await claimsService.getClaimById('7281a130-e2b1-430d-8c14-201010eae901');
   * claimsService.publishPublicClaim({
   *     claim: {
   *          token: claim.token,
   *          claimType: claim.claimType,
   *     };
   *     registrationTypes: claim.registrationTypes,
   * });
   * ```
   *
   * @param {PublishPublicClaimOptions} options object containing options
   * @return URl to IPFS if registrationTypes includes RegistrationTypes.OffChain
   */
  async publishPublicClaim({
    token, // backward compatibility
    registrationTypes = [RegistrationTypes.OffChain],
    claim,
  }: PublishPublicClaimOptions): Promise<string | undefined> {
    claim.token = claim.token || token;
    this.validatePublishPublicClaimRequest(registrationTypes, claim);
    let url: string | undefined = undefined;
    if (registrationTypes.includes(RegistrationTypes.OnChain)) {
      if (!claim.claimType) {
        throw new Error(ERROR_MESSAGES.CLAIM_TYPE_MISSING);
      }

      const claims = await this.getClaimsBySubject({
        did: this._signerService.did,
        namespace: this.getNamespaceFromClaimType(claim.claimType),
        isAccepted: true,
      });
      const claimData = claims.find((c) => c.claimType === claim.claimType);

      if (!claimData) {
        throw new Error(ERROR_MESSAGES.PUBLISH_NOT_ISSUED_CLAIM);
      }

      await this.registerOnchain({
        ...claimData,
        expirationTimestamp: claimData.expirationTimestamp
          ? +claimData.expirationTimestamp
          : undefined,
        onChainProof: claimData.onChainProof as string,
        acceptedBy: claimData.acceptedBy as string,
      });
    }

    // add scenario for offchain without request based on claimType instead of token
    // can we break API so that register on chain required only claim type and claim type version and subject
    if (registrationTypes.includes(RegistrationTypes.OffChain)) {
      const token = claim.token as string;
      const payload = (await this._didRegistry.decodeJWTToken({ token })) as {
        iss: string;
        sub: string;

        claimData: ClaimData;
      };
      const { iss, claimData } = payload;
      let sub = payload.sub;
      // Initialy subject was ignored because it was requester
      if (!sub || sub.length === 0 || !isValidDID(sub)) {
        sub = this._signerService.did;
      }
      const verifiedDid = await this._didRegistry.verifyPublicClaim(token, iss);
      if (!verifiedDid || !compareDID(verifiedDid, iss)) {
        throw new Error('Incorrect signature');
      }
      url = await this._didRegistry.ipfsStore.save(token);
      const data = {
        type: DIDAttribute.ServicePoint,
        value: {
          id: await this.getClaimId({ claimData }),
          serviceEndpoint: url,
          hash: hashes.SHA256(token),
          hashAlg: 'SHA256',
        },
      };
      const isDocUpdated = await this._didRegistry.updateDocument({
        didAttribute: DIDAttribute.ServicePoint,
        data,
        did: sub,
      });

      if (!isDocUpdated) {
        throw new Error(ERROR_MESSAGES.DID_DOCUMENT_NOT_UPDATED);
      }
    }
    return url;
  }

  /**
   * Creates self signed off-chain claim with `data` and adds it to `subject` document. Signer must own or control subject.
   *
   * ```typescript
   * claimsService.createSelfSignedClaim({
   *     data: {
   *          claimType: 'email.roles.energyweb.iam.ewc',
   *          claimTypeVersion: 1,
   *          issuerFields: [{key: 'foo', value: 'bar'}],
   *          profile: {
   *              name: 'John Doe',
   *              birthdate: '1990-01-01',
   *              address: '123 Main St',
   *          },
   *     },
   *     subject: 'did:ethr:volta:0x00...0',
   * });
   * ```
   *
   * @param {CreateSelfSignedClaimOptions} options object containing options
   * @return URl to IPFS
   */
  async createSelfSignedClaim({
    data,
    subject,
  }: CreateSelfSignedClaimOptions): Promise<string> {
    const token = await this._didRegistry.createPublicClaim({ data, subject });
    return (await this.publishPublicClaim({ claim: { token } })) as string;
  }

  /**
   * Get published off-chain claims of the given subject.
   *
   * ```typescript
   * claimsService.getUserClaims({
   *     did: 'did:ethr:0x00...0',
   * });
   * ```
   *
   * @param {GetUserClaimsOptions} options object containing options
   * @returns Claims containing DID document service endpoints
   */
  async getUserClaims({
    did = this._signerService.did,
  }: GetUserClaimsOptions): Promise<(IServiceEndpoint & ClaimData)[]> {
    const [services, issuedClaims] = await Promise.all([
      this._didRegistry.getServices({ did }),
      this.getClaimsBySubject({
        did,
        isAccepted: true,
      }),
    ]);

    if (services.length === 0 || issuedClaims.length === 0) return [];

    const issuedClaimsTypes = issuedClaims
      .filter((c) => c.registrationTypes.includes(RegistrationTypes.OffChain))
      .map(({ claimType }) => claimType);

    return services.filter(
      ({ claimType }) =>
        claimType &&
        typeof claimType === 'string' &&
        issuedClaimsTypes.includes(claimType)
    );
  }

  /**
   * Create a public claim to prove identity.
   *
   * ```typescript
   * claimsService.createIdentityProof();
   * ```
   *
   * @return JWT token of created identity
   */
  async createIdentityProof(): Promise<string> {
    const blockNumber = await this._signerService.provider.getBlockNumber();
    return this._didRegistry.createPublicClaim({
      data: {
        blockNumber,
      },
    });
  }

  /**
   * Create a public claim to prove identity.
   *
   * ```typescript
   * claimsService.createDelegateProof(
   *     '245a40a9...776071ca57cec',
   *     'did:ethr:0x00...0',
   *     Algorithms.EIP191,
   * );
   * ```
   *
   * @param {String} delegateKey Private key of the delegate in hexadecimal format
   * @param {String} identity DID of the delegate
   * @param {String} algorithm Algorithm used to sign the delegate (EIP191 and ES256 available)
   *
   * @return JWT token of delegate
   */
  async createDelegateProof(
    delegateKey: string,
    identity: string,
    algorithm: Algorithms = Algorithms.EIP191
  ): Promise<string> {
    const provider = this._signerService.provider;
    const blockNumber = (await provider.getBlockNumber()).toString();

    const payload = {
      iss: identity,
      claimData: {
        blockNumber,
      },
    };
    if (algorithm === Algorithms.EIP191) {
      return new JWT(new Wallet(delegateKey)).sign(payload, {
        issuer: identity,
      });
    } else if (algorithm === Algorithms.ES256) {
      /** @todo move to @ew-did-registry/jwt */
      return jsonwebtoken.sign(
        payload,
        privToPem(delegateKey, KeyType.Secp256r1),
        {
          issuer: identity,
        }
      );
    } else {
      throw new Error(ERROR_MESSAGES.JWT_ALGORITHM_NOT_SUPPORTED);
    }
  }

  /**
   * Get `namespace` from claim type.
   *
   * ```typescript
   * claimsService.getNamespaceFromClaimType(
   *     'email.roles.energyweb.iam.ewc'
   * );
   * ```
   *
   * @param {String} claimType Private key of the delegate in hexadecimal format
   *
   * @return Namespace of given claim type
   */
  getNamespaceFromClaimType(claimType: string): string {
    return claimType.split('.roles.')[1];
  }

  /**
   * Revoke On-Chain issued claim by `claimId` or given `namespace` and `subject`. Required `claimId` or `claim` parameters.
   *
   * ```typescript
   * claimsService.revokeClaim({
   *     claim: {
   *         namespace: 'root.roles.energyweb.iam.ewc',
   *         subject: 'did:ethr:volta:0x00...0',
   *     },
   *     registrationTypes = [RegistrationTypes.OnChain, RegistrationTypes.OffChain],
   * });
   * ```
   * or
   * ```typescript
   * claimsService.revokeClaim({
   *     claimId: claim.id,
   *     registrationTypes = [RegistrationTypes.OnChain, RegistrationTypes.OffChain],
   * });
   * ```
   *
   * @param {RevokeClaimOptions} options object containing options
   * @return true if claim was revoked
   */
  async revokeClaim(options: RevokeClaimOptions): Promise<boolean> {
    const revoker = this._signerService.did;
    const { namespace, subject } = await this.getRevocationClaimDetails(
      options
    );

    return await this._claimRevocation.revokeClaim(namespace, subject, revoker);
  }

  /**
   * Revoke On-Chain issued claims of the given namespace for multiple subjects. Namespace must be the same for all subjects.
   * Specify `claims` or `claimIds` parameters.
   *
   * ```typescript
   * claimsService.revokeMultipleClaim({
   *     claims: [{
   *         namespace: 'root.roles.energyweb.iam.ewc',
   *         subject: 'did:ethr:volta:0x00...0',
   *         registrationTypes = [RegistrationTypes.OnChain, RegistrationTypes.OffChain],
   *     },
   *     {
   *         namespace: 'root.roles.energyweb.iam.ewc',
   *         subject: 'did:ethr:volta:0x00...1',
   *         registrationTypes = [RegistrationTypes.OnChain],
   *     }],
   * });
   * ```
   * or
   * ```typescript
   * claimsService.revokeMultipleClaim({
   *     claimIds: ['245a40a9...776071ca57cec', '245a40a9...776071ca57cec'],
   * });
   * ```
   *
   * @param {RevokeMultipleClaimOptions} options object containing options
   */
  async revokeMultipleClaim({
    claimIds,
    claims,
  }: RevokeMultipleClaimOptions): Promise<void> {
    if (!claimIds && !claims) {
      throw new Error(ERROR_MESSAGES.REVOKE_CLAIM_MISSING_PARAMETERS);
    }

    const revoker = this._signerService.did;
    let claimsDetailsToRevoke: RevokeMultipleClaimOptions['claims'] = [
      ...(claims || []),
    ];
    let namespace = claims?.[0]?.namespace || '';

    if (claimIds) {
      const claimsDetails = await Promise.all([
        ...claimIds.map(async (claimId) => {
          const claim = await this.getClaimById(claimId);
          if (!claim) return undefined;
          return {
            namespace: claim.claimType,
            subject: claim.subject,
          };
        }),
      ]);
      claimsDetailsToRevoke = [
        ...(claimsDetails.filter((claim) => !!claim) as Claim[]),
      ];
      namespace = claimsDetailsToRevoke[0]?.namespace;
    }

    await this._claimRevocation.revokeClaimforDIDs(
      namespace,
      claimsDetailsToRevoke.map((claim) => claim.subject),
      revoker
    );
  }

  /**
   * Check if On-Chain claim is revoked.
   *
   * ```typescript
   * claimsService.isClaimRevoked({
   *     claim: {
   *         namespace: 'root.roles.energyweb.iam.ewc',
   *         subject: 'did:ethr:volta:0x00...0',
   *     },
   * });
   * ```
   * or
   * ```typescript
   * claimsService.isClaimRevoked({
   *     claimId: claim.id,
   * });
   * ```
   *
   * @param {IsClaimRevokedOptions} options object containing options
   * @return true if claim is revoked
   */
  async isClaimRevoked(options: IsClaimRevokedOptions): Promise<boolean> {
    const { namespace, subject } = await this.getRevocationClaimDetails(
      options
    );

    return this._claimRevocation.isClaimRevoked(namespace, subject);
  }

  /**
   * Get the revocation details for a subject's On-Chain claim. Returns the revoker and revocationTimeStamp for the revocation.
   *
   * ```typescript
   * claimsService.claimRevocationDetails({
   *     claim: {
   *         namespace: 'root.roles.energyweb.iam.ewc',
   *         subject: 'did:ethr:volta:0x00...0',
   *     },
   * });
   * ```
   * or
   * ```typescript
   * claimsService.claimRevocationDetails({
   *     claimId: claim.id,
   * });
   * ```
   *
   * @param {ClaimRevocationDetailsOptions} options object containing options
   * @return revocation details
   */
  async claimRevocationDetails(
    options: ClaimRevocationDetailsOptions
  ): Promise<ClaimRevocationDetailsResult | undefined> {
    const { namespace, subject } = await this.getRevocationClaimDetails(
      options
    );

    const { 0: revoker, 1: timestamp } =
      await this._claimRevocation.getRevocationDetail(namespace, subject);

    if (revoker === emptyAddress) {
      return undefined;
    }

    return {
      revoker,
      timestamp: parseInt(timestamp, 10),
    };
  }

  /**
   * Pick up the claim from the params and return the claim data.
   * Choose `claimId` first, then `claim`. Throw an error if both are missing.
   *
   * @param {GetRevocationClaimDetailsOptions} data claim data or claim id
   * @return claim data
   */
  private async getRevocationClaimDetails({
    claimId,
    claim,
  }: GetRevocationClaimDetailsOptions): Promise<GetRevocationClaimDetailsResult> {
    if (!claimId && !claim) {
      throw new Error(ERROR_MESSAGES.REVOKE_CLAIM_MISSING_PARAMETERS);
    }

    let namespace: string | undefined = claim?.namespace || '';
    let subject: string | undefined = claim?.subject || '';

    if (claimId) {
      const claimData = await this.getClaimById(claimId);

      if (!claimData) {
        throw new Error(ERROR_MESSAGES.REVOKE_CLAIM_NOT_FOUND);
      }

      namespace = claimData.claimType;
      subject = claimData.subject;
    }

    return {
      namespace,
      subject,
    };
  }

  /**
   * Remove `fields` from claim data.
   *
   * @param {ClaimData} data Claim data to remove fields from
   * @return Claim data without fields
   */
  private stripClaimData(data: ClaimData): ClaimData {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { fields, ...claimData } = data;

    return claimData;
  }

  /**
   * Validates publish public claim parameters depending on off-chain or on-chain registration type. Throws relevant error on invalid data.
   *
   * @param {Array<RegistrationTypes>} registrationTypes Registration types of the claim
   * @param {Object} claim `token` and `claimType` of the claim
   */
  private validatePublishPublicClaimRequest(
    registrationTypes: RegistrationTypes[],
    claim: { token?: string; claimType?: string }
  ): void {
    if (
      registrationTypes.includes(RegistrationTypes.OnChain) &&
      !claim.claimType
    ) {
      throw new Error(
        ERROR_MESSAGES.CLAIM_TYPE_REQUIRED_FOR_ON_CHAIN_REGISTRATION
      );
    }
    if (
      registrationTypes.includes(RegistrationTypes.OffChain) &&
      !claim.token
    ) {
      throw new Error(ERROR_MESSAGES.TOKEN_REQUIRED_FOR_OFF_CHAIN_REGISTRATION);
    }
  }

  /**
   * Verify if the user is an authorized issuer of a role
   *
   * @param {String} role Registration types of the claim
   */
  private async verifyIssuer(role: string): Promise<void> {
    await this._issuerVerification.verifyIssuer(this._signerService.did, role);
  }

  /**
   * Verify claim request prerequisites for given role and subject. Throws relevant error on invalid data.
   *
   * @param {VerifyEnrolmentPrerequisitesOptions} options object containing options
   */
  private async verifyEnrolmentPrerequisites({
    subject,
    role,
    roleDefinition: cachedRoleDefinition,
  }: VerifyEnrolmentPrerequisitesOptions): Promise<void> {
    const roleDefinition =
      cachedRoleDefinition ||
      (await this._domainsService.getDefinition({
        type: NamespaceType.Role,
        namespace: role,
      }));

    if (!roleDefinition) {
      throw new Error(ERROR_MESSAGES.ROLE_NOT_EXISTS);
    }

    const { enrolmentPreconditions } = roleDefinition as IRoleDefinition;

    if (!enrolmentPreconditions || enrolmentPreconditions.length === 0) return;

    const enroledRoles = new Set(
      (await this.getClaimsBySubject({ did: subject, isAccepted: true })).map(
        ({ claimType }) => claimType
      )
    );
    const requiredRoles = new Set(
      enrolmentPreconditions
        .filter(({ type }) => type === PreconditionType.Role)
        .map(({ conditions }) => conditions)
        .reduce((all, cur) => all.concat(cur), [])
    );
    if (Array.from(requiredRoles).some((role) => !enroledRoles.has(role))) {
      throw new Error(ERROR_MESSAGES.ROLE_PREREQUISITES_NOT_MET);
    }
  }

  /**
   * Create verifiable credential and wrap it into verifiable presentation.
   *
   * @param {VerifyEnrolmentPrerequisitesOptions} options object containing options
   * @return JSON representation of verifiable presentation
   */
  private async issueVerifiablePresentation(
    options: IssueVerifiablePresentationOptions
  ): Promise<VerifiablePresentation> {
    const vc = await this._verifiableCredentialService.createRoleVC({
      id: options.subject,
      namespace: options.namespace,
      version: options.version,
      issuerFields: options.issuerFields,
      credentialStatus: options.credentialStatus,
      expirationDate: options.expirationTimestamp
        ? new Date(options.expirationTimestamp)
        : undefined,
    });
    return await this._verifiableCredentialService.createVerifiablePresentation(
      [vc]
    );
  }

  /**
   * Extract data from claim token.
   *
   * @param {String} token JWT token containing claimType, version and subject
   * @return Claim data
   */
  private extractClaimRequest(token: string) {
    const { claimData, sub } = this._didRegistry.jwt.decode(token) as {
      claimData: { claimType: string; claimTypeVersion: string };
      sub: string;
    };
    return {
      ...claimData,
      subject: sub,
    };
  }

  /**
   * Create subject agreement signature.
   *
   * @param {ApproveRolePublishingOptions} options object containing options
   * @return subject agreement signature
   */
  private async approveRolePublishing({
    subject,
    role,
    version,
  }: ApproveRolePublishingOptions): Promise<string> {
    const erc712_type_hash = id(
      'EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)'
    );
    const agreement_type_hash = id(
      'Agreement(address subject,bytes32 role,uint256 version)'
    );

    const chainId = this._signerService.chainId;
    const domainSeparator = keccak256(
      defaultAbiCoder.encode(
        ['bytes32', 'bytes32', 'bytes32', 'uint256', 'address'],
        [
          erc712_type_hash,
          id('Claim Manager'),
          id('1.0'),
          chainId,
          this._claimManager,
        ]
      )
    );

    const messageId = Buffer.from(typedMsgPrefix, 'hex');

    const agreementHash = solidityKeccak256(
      ['bytes', 'bytes32', 'bytes32'],
      [
        messageId,
        domainSeparator,
        keccak256(
          defaultAbiCoder.encode(
            ['bytes32', 'address', 'bytes32', 'uint256'],
            [agreement_type_hash, addressOf(subject), namehash(role), version]
          )
        ),
      ]
    );

    return canonizeSig(
      await this._signerService.signMessage(arrayify(agreementHash))
    );
  }

  /**
   * Create on-chain proof signature.
   *
   * @param {String} role role claim type
   * @param {Number} version role version
   * @param {Number} expiry time when the claim expires
   * @param {String} subject DID of the subject
   *
   * @return on-chain proof signature
   */
  private async createOnChainProof(
    role: string,
    version: number,
    expiry: number,
    subject: string
  ): Promise<string> {
    const messageId = Buffer.from(typedMsgPrefix, 'hex');

    const chainId = this._signerService.chainId;
    const domainSeparator = utils.keccak256(
      defaultAbiCoder.encode(
        ['bytes32', 'bytes32', 'bytes32', 'uint256', 'address'],
        [
          erc712_type_hash,
          utils.id('Claim Manager'),
          utils.id('1.0'),
          chainId,
          this._claimManager,
        ]
      )
    );

    const proofHash = solidityKeccak256(
      ['bytes', 'bytes32', 'bytes32'],
      [
        messageId,
        domainSeparator,
        utils.keccak256(
          defaultAbiCoder.encode(
            ['bytes32', 'address', 'bytes32', 'uint', 'uint', 'address'],
            [
              proof_type_hash,
              addressOf(subject),
              namehash(role),
              version,
              expiry,
              this._signerService.address,
            ]
          )
        ),
      ]
    );

    return canonizeSig(
      await this._signerService.signMessage(arrayify(proofHash))
    );
  }

  /**
   * Verifies:
   * - That credential proof is valid
   * - That credential was issued by authorized issuer
   * - That credential was not revoked
   *
   * @param {VerifiableCredential<RoleCredentialSubject} vc to be verified
   * @return Boolean indicating if verified and array of error messages
   */
  async verifyVc(
    vc: VerifiableCredential<RoleCredentialSubject>
  ): Promise<CredentialVerificationResult> {
    const errors: string[] = [];
    const issuerDID = this._signerService.did;

    let proofVerified;
    try {
      proofVerified = await this._verifiableCredentialService.verify(vc);
    } catch (e) {
      proofVerified = false;
      errors.push((e as Error).message);
    }

    if (!proofVerified) {
      errors.push(ERROR_MESSAGES.PROOF_NOT_VERIFIED);
    }
    const role = vc.credentialSubject.role.namespace;
    let issuerVerified = true;
    try {
      await this._issuerVerification.verifyIssuer(issuerDID, role);
    } catch (e) {
      issuerVerified = false;
      errors.push((e as Error).message);
    }

    if (vc.credentialStatus) {
      try {
        await this._statusVerifier.verifyCredentialStatus(vc.credentialStatus);
      } catch (e) {
        issuerVerified = false;
        errors.push((e as Error).message);
      }
    }
    return {
      errors,
      isVerified: proofVerified && issuerVerified,
    };
  }

  /**
   * Verifies:
   * - That off-chain claim was issued by authorized issuer
   * - That off-chain claim proof is valid
   *
   * @param {OffChainClaim} off chain claim to verify
   * @return Boolean indicating if verified and array of error messages
   */
  async verifyRoleEIP191JWT(
    roleEIP191JWT: RoleEIP191JWT
  ): Promise<CredentialVerificationResult> {
    const { payload, eip191Jwt } = roleEIP191JWT;
    const errors: string[] = [];
    const issuerDID = this._signerService.did;
    const { status: issuerVerified, error } =
      await this._issuerVerification.verifyIssuer(
        issuerDID,
        payload?.claimData?.claimType
      );
    if (!issuerVerified && error) {
      errors.push(error);
    }
    const proofVerified = await this._didRegistry.verifyPublicClaim(
      eip191Jwt,
      payload?.iss as string
    );
    if (!proofVerified) {
      errors.push(ERROR_MESSAGES.PROOF_NOT_VERIFIED);
    }
    const isExpired = payload?.exp && (payload?.exp * 1000) < Date.now();
      if (isExpired) {
        errors.push(ERROR_MESSAGES.CREDENTIAL_EXPIRED);
      }
    return {
      errors: errors,
      isVerified: !!proofVerified && !!issuerVerified && !isExpired,
    };
  }

  /**
   * Fetch a credential from storage
   *
   * @param subjectDID The DID to try to resolve a credential for
   * @param roleNamesapce The role to try to get a credential for. Should be a full role namespace (for example, "myrole.roles.myorg.auth.ewc")
   * @return credential if available or undefined if not
   */
  async fetchCredential(
    subjectDID: string,
    roleNamespace: string
  ): Promise<
    VerifiableCredential<RoleCredentialSubject> | RoleEIP191JWT | undefined
  > {
    return await this._credentialResolver.getCredential(
      subjectDID,
      roleNamespace
    );
  }

  /**
   * Resolve a credential from storage and verify its proof/signature and its issuer's authority
   *
   * @param subjectDID The DID to try to resolve a credential for
   * @param roleNamesapce The role to try to get a credential for. Should be a full role namespace (for example, "myrole.roles.myorg.auth.ewc")
   * @return void. Returns "Proof Not Verified" error if VC not verified. Returns error if issuer not verified
   */
  async resolveCredentialAndVerify(
    subjectDID: string,
    roleNamespace: string
  ): Promise<CredentialVerificationResult> {
    const resolvedCredential = await this._credentialResolver.getCredential(
      subjectDID,
      roleNamespace
    );
    if (!resolvedCredential) {
      return {
        isVerified: false,
        errors: [ERROR_MESSAGES.NO_CLAIM_RESOLVED],
      };
    }
    const credentialIsOffChain = resolvedCredential.eip191Jwt;
    return credentialIsOffChain
      ? this.verifyRoleEIP191JWT(resolvedCredential as RoleEIP191JWT)
      : this.verifyVc(
          resolvedCredential as VerifiableCredential<RoleCredentialSubject>
        );
  }

  /**
   *
   * Set the Verifier for Claim Issuance.
   *
   */
  private _setIssuerVerifier() {
    this._credentialResolver = new IpfsCredentialResolver(
      this._signerService.provider,
      this._didRegistry.registrySettings,
      this._didRegistry.ipfsStore
    );
    const domainReader = this._domainsService.domainReader;
    this._issuerResolver = new EthersProviderIssuerResolver(domainReader);
    const revokerResolver = new EthersProviderRevokerResolver(domainReader);
    const verifyProof = (vc: string, proofOptions: string) =>
      this._verifiableCredentialService.verify(
        JSON.parse(vc),
        JSON.parse(proofOptions)
      );
    const revocationVerification = new RevocationVerification(
      revokerResolver,
      this._issuerResolver,
      this._credentialResolver,
      this._signerService.provider,
      this._didRegistry.registrySettings,
      verifyProof
    );
    this._issuerVerification = new IssuerVerification(
      this._issuerResolver,
      this._credentialResolver,
      this._signerService.provider,
      this._didRegistry.registrySettings,
      revocationVerification,
      verifyProof
    );
  }

  private _setStatusVerifier() {
    this._statusVerifier = new StatusListEntryVerification(async (vc) => {
      try {
        await this._verifiableCredentialService.verify(JSON.parse(vc));
      } catch (e) {
        return JSON.stringify({ errors: [(e as Error).message] });
      }
      return JSON.stringify({ errors: [] });
    });
  }

  /**
   * Get claim expiration timestamp based on issuer value and role definition.
   *
   * @param {IRoleDefinitionV2} roleDefinition role definition
   * @param {Number} [expirationTimestamp] issuer-defined expiration timestamp
   *
   * @return claim expiration timestamp
   */
  private getClaimExpirationTimestamp(
    roleDefinition: IRoleDefinitionV2,
    expirationTimestamp?: number
  ) {
    const defaultValidityPeriod = roleDefinition?.defaultValidityPeriod;
    const roleDefinitionExpirationTimestamp = defaultValidityPeriod
      ? Date.now() + defaultValidityPeriod
      : undefined;

    return expirationTimestamp || roleDefinitionExpirationTimestamp;
  }
}
