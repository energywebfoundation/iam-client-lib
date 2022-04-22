/* eslint-disable @typescript-eslint/no-unused-vars */
import { utils, Wallet } from 'ethers';
import jsonwebtoken from 'jsonwebtoken';
import { v4 } from 'uuid';
import {
  IRoleDefinition,
  PreconditionType,
} from '@energyweb/credential-governance';
import { Methods } from '@ew-did-registry/did';
import { Algorithms } from '@ew-did-registry/jwt';
import { addressOf } from '@ew-did-registry/did-ethr-resolver';
import { hashes, IPublicClaim } from '@ew-did-registry/claims';
import {
  DIDAttribute,
  IServiceEndpoint,
} from '@ew-did-registry/did-resolver-interface';
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
  defaultClaimExpiry,
  erc712_type_hash,
  proof_type_hash,
  typedMsgPrefix,
} from './claims.types';
import { DidRegistry } from '../did-registry/did-registry.service';
import { ClaimData } from '../did-registry/did.types';
import { compareDID, isValidDID } from '../../utils/did';
import { JWT } from '@ew-did-registry/jwt';
import { privToPem, KeyType } from '@ew-did-registry/keys';
import { readyToBeRegisteredOnchain } from './claims.types';
import { VerifiableCredentialsServiceBase } from '../verifiable-credentials';
import { NotAuthorizedIssuer } from '../../errors/not-authorized-issuer';

const {
  id,
  keccak256,
  defaultAbiCoder,
  solidityKeccak256,
  namehash,
  arrayify,
} = utils;

export class ClaimsService {
  private _claimManager: string;
  private _claimManagerInterface = ClaimManager__factory.createInterface();

  constructor(
    private _signerService: SignerService,
    private _domainsService: DomainsService,
    private _cacheClient: CacheClient,
    private _didRegistry: DidRegistry,
    private _verifiableCredentialService: VerifiableCredentialsServiceBase
  ) {
    this._signerService.onInit(this.init.bind(this));
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
  }

  /**
   * A utility function to check the blockchain directly if a DID has a role
   * TODO: fail if the DID chain ID doesn't match the configured signer network connect
   * @param did The ethr DID to check
   * @param role The role to check (the full namespace)
   * @param version The version to check
   * @returns true if DID has role at the version. false if not.
   */
  async hasOnChainRole(
    did: string,
    role: string,
    version: number
  ): Promise<boolean> {
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

  async getClaimsBySubjects(subjects: string[]) {
    return this._cacheClient.getClaimsBySubjects(subjects);
  }

  /**
   * @description - Returns claims for given requester. Allows filtering by status and parent namespace
   */
  async getClaimsByRequester({
    did,
    isAccepted,
    namespace,
  }: {
    did: string;
    isAccepted?: boolean;
    namespace?: string;
  }) {
    return this._cacheClient.getClaimsByRequester(did, {
      isAccepted,
      namespace,
    });
  }

  /**
   * @description - Returns claims for given issuer. Allows filtering by status and parent namespace
   */
  async getClaimsByIssuer({
    did,
    isAccepted,
    namespace,
  }: {
    did: string;
    isAccepted?: boolean;
    namespace?: string;
  }) {
    return this._cacheClient.getClaimsByIssuer(did, { isAccepted, namespace });
  }

  /**
   * @description - Returns claims for given subject. Allows filtering by status and parent namespace
   */
  async getClaimsBySubject({
    did,
    isAccepted,
    namespace,
  }: {
    did: string;
    isAccepted?: boolean;
    namespace?: string;
  }) {
    return this._cacheClient.getClaimsBySubject(did, { isAccepted, namespace });
  }

  /**
   * @description - Returns claim with the given Id or null if claim does not exist
   */
  async getClaimById(claimId: string) {
    return this._cacheClient.getClaimById(claimId);
  }

  /**
   * @description allows subject to request for credential
   */
  async createClaimRequest({
    claim,
    subject = this._signerService.did,
    registrationTypes = [RegistrationTypes.OffChain],
  }: {
    claim: {
      claimType: string;
      claimTypeVersion: number;
      requestorFields?: { key: string; value: string | number }[];
      issuerFields?: { key: string; value: string | number }[];
    };
    subject?: string;
    registrationTypes?: RegistrationTypes[];
  }) {
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
   * @param params.publishOnChain If issuing an on-chain role, then if true then will submit role to chain (incurring tx cost). Default is true
   */
  async issueClaimRequest({
    requester,
    token,
    id,
    subjectAgreement,
    registrationTypes,
    issuerFields,
    publishOnChain = true,
  }: {
    requester: string;
    token: string;
    id: string;
    subjectAgreement: string;
    registrationTypes: RegistrationTypes[];
    issuerFields?: { key: string; value: string | number }[];
    publishOnChain?: boolean;
  }) {
    const { claimData, sub } = this._didRegistry.jwt.decode(token) as {
      claimData: { claimType: string; claimTypeVersion: number };
      sub: string;
    };
    await this.verifyIssuer(claimData.claimType);

    await this.verifyEnrolmentPrerequisites({
      subject: sub,
      role: claimData.claimType,
    });

    const message: IClaimIssuance = {
      id,
      requester,
      claimIssuer: [this._signerService.did],
      acceptedBy: this._signerService.did,
    };
    const strippedClaimData = this.stripClaimData(claimData);
    const { claimType: role, claimTypeVersion: version } = claimData;

    if (registrationTypes.includes(RegistrationTypes.OnChain)) {
      const expiry = defaultClaimExpiry;
      const onChainProof = await this.createOnChainProof(
        role,
        version,
        expiry,
        sub
      );
      message.onChainProof = onChainProof;
      if (publishOnChain) {
        await this.registerOnchain({
          token,
          subjectAgreement,
          onChainProof,
          acceptedBy: this._signerService.did,
        });
      }
    }

    if (registrationTypes.includes(RegistrationTypes.OffChain)) {
      const publicClaim: IPublicClaim = {
        did: sub,
        signer: this._signerService.did,
        claimData: {
          ...strippedClaimData,
          ...(issuerFields && { issuerFields }),
        },
      };
      const [issuedToken, vp] = await Promise.all([
        this._didRegistry.issuePublicClaim({
          publicClaim,
        }),
        this.issueVerifiablePresentation({
          subject: sub,
          namespace: role,
          version: version.toString(),
          issuerFields,
        }),
      ]);
      message.issuedToken = issuedToken;
      message.vp = vp;
    }

    await this._cacheClient.issueClaim(this._signerService.did, message);
  }

  private async issueVerifiablePresentation(options: {
    subject: string;
    namespace: string;
    version: string;
    issuerFields?: { key: string; value: string | number }[];
  }) {
    const vc = await this._verifiableCredentialService.createRoleVC({
      id: options.subject,
      namespace: options.namespace,
      version: options.version,
      issuerFields: options.issuerFields,
    });
    const vp =
      await this._verifiableCredentialService.createVerifiablePresentation([
        vc,
      ]);
    return JSON.stringify(vp);
  }

  /**
   *
   * @param token optional token containing claimType, version and subject
   * @returns claim params obtained from token
   */
  private extractClaimRequest(token: string) {
    const { claimData, sub } = this._didRegistry.jwt.decode(token) as {
      claimData: { claimType: string; claimTypeVersion: string };
      sub: string;
    };
    return { ...claimData, subject: sub };
  }

  /**
   * @description Registers issued onchain claim with Claim manager
   *
   * @param claim - id of signed onchain claim.
   * @param token - @deprecated use subject, claimType, claimTypeVersion instead. Token should get removed and subject, claimType, claimTypeVersion should be required.
   */
  async registerOnchain(claim: {
    claimType?: string;
    claimTypeVersion?: string;
    token?: string;
    subjectAgreement?: string;
    onChainProof: string;
    acceptedBy: string;
    subject?: string;
  }) {
    // backward compatibility with token
    if (claim.token)
      claim = { ...claim, ...this.extractClaimRequest(claim.token) };

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
    } = claim;
    const expiry = defaultClaimExpiry;

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

  async rejectClaimRequest({
    id,
    requesterDID,
    rejectionReason,
  }: {
    id: string;
    requesterDID: string;
    rejectionReason?: string;
  }) {
    const message: IClaimRejection = {
      id,
      requester: requesterDID,
      claimIssuer: [this._signerService.did],
      isRejected: true,
      rejectionReason,
    };

    return this._cacheClient.rejectClaim(this._signerService.did, message);
  }

  async deleteClaim({ id }: { id: string }) {
    await this._cacheClient.deleteClaim(id);
  }

  async issueClaim({
    subject,
    registrationTypes = [RegistrationTypes.OffChain],
    claim,
  }: {
    subject: string;
    registrationTypes: RegistrationTypes[];
    claim: {
      claimType: string;
      claimTypeVersion: number;
      issuerFields: { key: string; value: string | number }[];
    };
  }) {
    await this.verifyIssuer(claim.claimType);
    await this.verifyEnrolmentPrerequisites({ subject, role: claim.claimType });

    const message: IClaimIssuance = {
      id: v4(),
      requester: subject,
      claimIssuer: [this._signerService.did],
      acceptedBy: this._signerService.did,
    };
    if (registrationTypes.includes(RegistrationTypes.OffChain)) {
      const publicClaim: IPublicClaim = {
        did: subject,
        signer: this._signerService.did,
        claimData: claim,
      };

      message.issuedToken = await this._didRegistry.issuePublicClaim({
        publicClaim,
      });
    }

    if (registrationTypes.includes(RegistrationTypes.OnChain)) {
      const { claimType: role, claimTypeVersion: version } = claim;
      const expiry = defaultClaimExpiry;
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
  async getClaimId({ claimData }: { claimData: ClaimData }) {
    const { service = [] } = await this._didRegistry.getDidDocument();
    const { id, claimTypeVersion } =
      service.find(
        ({ profile, claimType, claimTypeVersion }) =>
          Boolean(profile) ||
          (claimType === claimData.claimType &&
            claimTypeVersion === claimData.claimTypeVersion)
      ) || {};

    if (claimData.profile && id) {
      return id;
    }

    if (
      claimData.claimType &&
      id &&
      claimData.claimTypeVersion === claimTypeVersion
    ) {
      return id;
    }
    return v4();
  }

  /**
   *
   * @description validates publish public claim parameters depending on off or on chain registration type. Throws relevant error on invalid data.
   *
   */
  private validatePublishPublicClaimRequest(
    registrationTypes: RegistrationTypes[],
    claim: { token?: string; claimType?: string }
  ) {
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
   *
   * @description publishes claim off-chain (by storing claim data in ipfs and save url to DID document services) or registering on-chain depending on registrationTypes values.
   * @returns ulr to ipfs
   * @param token - @deprecated - use claim with claimType instead
   *
   */
  async publishPublicClaim({
    token, // backward compatibility
    registrationTypes = [RegistrationTypes.OffChain],
    claim,
  }: {
    token?: string;
    registrationTypes?: RegistrationTypes[];
    claim: { token?: string; claimType?: string };
  }) {
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
      await this._didRegistry.updateDocument({
        didAttribute: DIDAttribute.ServicePoint,
        data,
        did: sub,
      });
    }
    return url;
  }

  /**
   * @description Creates claim with `data` and adds it to `subject` document. Signer must own or control subject
   *
   * @param data claim payload
   * @param subject DID of claim subject
   *
   * @returns claim url
   */
  async createSelfSignedClaim({
    data,
    subject,
  }: {
    data: ClaimData;
    subject?: string;
  }) {
    const token = await this._didRegistry.createPublicClaim({ data, subject });
    return (await this.publishPublicClaim({ claim: { token } })) as string;
  }

  /**
   * getUserClaims
   *
   * @description get published offchain claims
   *
   */
  async getUserClaims({
    did = this._signerService.did,
  }: { did?: string } | undefined = {}): Promise<
    (IServiceEndpoint & ClaimData)[]
  > {
    const { service } = await this._didRegistry.getDidDocument({ did });
    const issuedClaims = await this.getClaimsBySubject({
      did,
      isAccepted: true,
    });
    if (service.length === 0 || issuedClaims.length === 0) return [];

    const issuedClaimsTypes = issuedClaims
      .filter((c) => c.registrationTypes.includes(RegistrationTypes.OffChain))
      .map(({ claimType }) => claimType);

    return service.filter(
      ({ claimType }) => claimType && issuedClaimsTypes.includes(claimType)
    );
  }

  private async verifyEnrolmentPrerequisites({
    subject,
    role,
  }: {
    subject: string;
    role: string;
  }) {
    const roleDefinition = await this._domainsService.getDefinition({
      type: NamespaceType.Role,
      namespace: role,
    });

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

  private async verifyIssuer(role: string) {
    if (
      !(
        await this._cacheClient.getAllowedRolesByIssuer(this._signerService.did)
      ).some((r) => r.namespace === role)
    ) {
      throw new NotAuthorizedIssuer(this._signerService.did, role);
    }
  }

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

  private async approveRolePublishing({
    subject,
    role,
    version,
  }: {
    subject: string;
    role: string;
    version: number;
  }) {
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
   * @description create a public claim to prove identity
   * @returns JWT token of created identity
   */
  async createIdentityProof() {
    const blockNumber = await this._signerService.provider.getBlockNumber();
    return this._didRegistry.createPublicClaim({
      data: {
        blockNumber,
      },
    });
  }

  /**
   * @description create a proof of identity delegate
   * @param delegateKey private key of the delegate in hexadecimal format
   * @param rpcUrl the url of the blockchain provider
   * @param identity Did of the delegate
   * @returns token of delegate
   */
  async createDelegateProof(
    delegateKey: string,
    identity: string,
    algorithm: Algorithms = Algorithms.EIP191
  ): Promise<string> {
    const provider = this._signerService.provider;
    const blockNumber = await provider.getBlockNumber();

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
   *
   * @description get `namespace` from claim type.
   * @returns namespace
   * @param {string} claimType
   *
   */
  getNamespaceFromClaimType(claimType: string) {
    return claimType.split('.roles.')[1];
  }

  private stripClaimData(data: ClaimData): ClaimData {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { fields, ...claimData } = data;

    return claimData;
  }
}
