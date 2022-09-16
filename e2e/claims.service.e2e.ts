import jsonwebtoken from 'jsonwebtoken';
import {
  IRoleDefinitionV2,
  IssuerFields,
  PreconditionType,
} from '@energyweb/credential-governance';
import { Methods, Chain } from '@ew-did-registry/did';
import { addressOf } from '@ew-did-registry/did-ethr-resolver';
import { KeyTags } from '@ew-did-registry/did-resolver-interface';
import {
  CredentialStatusPurpose,
  VerifiablePresentation,
  Credential,
  StatusListEntryType,
  StatusList2021Entry,
} from '@ew-did-registry/credentials-interface';
import { BigNumber, providers, utils, Wallet } from 'ethers';
import nock from 'nock';
import {
  AssetsService,
  ClaimsService,
  DomainsService,
  ERROR_MESSAGES,
  initWithPrivateKeySigner,
  ProviderType,
  RegistrationTypes,
  SignerService,
  chainConfigs,
  DidRegistry,
  MessagingService,
  IClaimIssuance,
  SignerT,
  Claim,
  RoleCredentialSubject,
  CacheClient,
  VerifiableCredentialsServiceBase,
  getVerifiableCredentialsService,
  setLogger,
  ConsoleLogger,
  LogLevel,
} from '../src';
import { replenish, root, rpcUrl, setupENS } from './utils/setup-contracts';
import { ClaimManager__factory } from '../ethers/factories/ClaimManager__factory';
import { ProofVerifier } from '@ew-did-registry/claims';
import { ClaimManager } from '../ethers/ClaimManager';
import { RoleEIP191JWT } from '@energyweb/vc-verification';
import { JwtPayload } from '@ew-did-registry/jwt';
import { shutDownIpfsDaemon, spawnIpfsDaemon } from './utils/setup-ipfs';

const { namehash, id } = utils;

const provider = new providers.JsonRpcProvider(rpcUrl);
const staticIssuer = Wallet.createRandom().connect(provider);
const staticIssuerDID = `did:${Methods.Erc1056}:${Chain.VOLTA}:${staticIssuer.address}`;
const dynamicIssuer = Wallet.createRandom().connect(provider);
const dynamicIssuerDID = `did:${Methods.Erc1056}:${Chain.VOLTA}:${dynamicIssuer.address}`;
const projectInstallerCandidate = Wallet.createRandom().connect(provider);
const projectInstallerCandidateDID = `did:${Methods.Erc1056}:${Chain.VOLTA}:${projectInstallerCandidate.address}`;
const rootOwner = Wallet.createRandom().connect(provider);
const rootOwnerDID = `did:${Methods.Erc1056}:${Chain.VOLTA}:${rootOwner.address}`;
const myAsset = Wallet.createRandom().connect(provider);
//const myAssetDid = `did:${Methods.Erc1056}:${Chain.VOLTA}:${myAsset.address}`;
const roleName1 = 'myrole1';
const roleName2 = 'myrole2';
const roleName3 = 'myrole3';
const roleName4 = 'myrole4';
const roleName5 = 'myrole5';
const verifyVcRole = 'verifyVcRole';
const verifyVcRole2 = 'verifyVcRole2';
const verifyOffChainClaimRole = 'verifyOnChain';
const resolveVC = 'resolvevc';
const verifyResolvedVcExpired = 'vcResolvedExpired';
const eip191JwtExpired = 'eip191JwtExpired';
const vcExpired = 'vcExpired';
const electrician = 'electrician';
const projectElectrician = 'projectElectrician';
const projectInstaller = 'projectInstaller';
const roleForAsset = 'roleForAsset';
const namespace = root;
const version = 1;
const baseRoleDef = {
  roleType: 'org',
  fields: [],
  issuerFields: [],
  enrolmentPreconditions: [],
  issuer: { issuerType: 'DID', did: [staticIssuerDID] },
  version,
  metadata: {},
  revoker: { revokerType: 'DID', did: [staticIssuerDID] },
};
const roles: Record<string, IRoleDefinitionV2> = {
  [`${roleName1}.${root}`]: { ...baseRoleDef, roleName: roleName1 },
  [`${roleName2}.${root}`]: {
    ...baseRoleDef,
    roleName: roleName2,
    issuer: { issuerType: 'ROLE', roleName: `${roleName1}.${root}` },
  },
  [`${roleName3}.${root}`]: {
    ...baseRoleDef,
    roleName: roleName3,
    enrolmentPreconditions: [
      { type: PreconditionType.Role, conditions: [`${roleName1}.${root}`] },
    ],
  },
  [`${roleName4}.${root}`]: {
    ...baseRoleDef,
    roleName: roleName4,
    issuer: { issuerType: 'ROLE', roleName: `${roleName1}.${root}` },
  },
  [`${roleName5}.${root}`]: {
    ...baseRoleDef,
    roleName: roleName5,
    defaultValidityPeriod: 1000,
  },
  [`${verifyVcRole}.${root}`]: {
    ...baseRoleDef,
    roleName: verifyVcRole,
    issuer: { issuerType: 'DID', did: [rootOwnerDID] },
  },
  [`${resolveVC}.${root}`]: {
    ...baseRoleDef,
    roleName: resolveVC,
  },
  [`${verifyVcRole2}.${root}`]: {
    ...baseRoleDef,
    roleName: verifyVcRole2,
  },
  [`${verifyOffChainClaimRole}.${root}`]: {
    ...baseRoleDef,
    roleName: verifyOffChainClaimRole,
    issuer: { issuerType: 'DID', did: [staticIssuerDID] },
  },
  [`${verifyResolvedVcExpired}.${root}`]: {
    ...baseRoleDef,
    roleName: verifyResolvedVcExpired,
    issuer: { issuerType: 'DID', did: [staticIssuerDID] },
  },
  [`${vcExpired}.${root}`]: {
    ...baseRoleDef,
    roleName: vcExpired,
    issuer: { issuerType: 'DID', did: [staticIssuerDID] },
  },
  [`${eip191JwtExpired}.${root}`]: {
    ...baseRoleDef,
    roleName: eip191JwtExpired,
    issuer: { issuerType: 'DID', did: [staticIssuerDID] },
  },
  [`${electrician}.${root}`]: {
    ...baseRoleDef,
    roleName: electrician,
    issuer: { issuerType: 'DID', did: [staticIssuerDID] },
  },
  [`${projectElectrician}.${root}`]: {
    ...baseRoleDef,
    roleName: projectElectrician,
    issuer: { issuerType: 'DID', did: [projectInstallerCandidateDID] },
    enrolmentPreconditions: [
      { type: PreconditionType.Role, conditions: [`${electrician}.${root}`] },
    ],
  },
  [`${projectInstaller}.${root}`]: {
    ...baseRoleDef,
    roleName: projectInstaller,
    issuer: { issuerType: 'DID', did: [staticIssuerDID] },
  },
  [`${roleForAsset}.${root}`]: {
    ...baseRoleDef,
    roleName: roleForAsset,
    issuer: { issuerType: 'DID', did: [rootOwnerDID] },
  },
};
const mockGetRoleDefinition = jest
  .fn()
  .mockImplementation((namespace: string) => {
    return roles[namespace];
  });
const mockCachedDocument = jest.fn().mockImplementation((did: string) => {
  return {
    publicKey: [
      { id: `did:${Methods.Erc1056}:${Chain.VOLTA}:${did}-${KeyTags.OWNER}` },
    ],
  }; // all documents are created
});
const getClamsBySubjectInitMock: (did: string) => Partial<Claim>[] = () => [];

const mockGetCachedOwnedAssets = jest.fn();
const mockGetAssetById = jest.fn();
const mockGetClaimsBySubject = jest.fn();
const mockRequestClaim = jest.fn();
const mockIssueClaim = jest.fn();
const mockRejectClaim = jest.fn();
const mockGetAllowedRoles = jest.fn();
jest.mock('../src/modules/cache-client/cache-client.service', () => {
  return {
    CacheClient: jest.fn().mockImplementation(() => {
      return {
        getRoleDefinition: mockGetRoleDefinition,
        getDidDocument: mockCachedDocument,
        getAssetById: mockGetAssetById,
        getOwnedAssets: mockGetCachedOwnedAssets,
        getClaimsBySubject: mockGetClaimsBySubject,
        init: jest.fn(),
        login: jest.fn(),
        requestClaim: mockRequestClaim,
        issueClaim: mockIssueClaim,
        rejectClaim: mockRejectClaim,
        getAllowedRolesByIssuer: mockGetAllowedRoles,
        addStatusToCredential: (
          credential: Credential<RoleCredentialSubject>
        ): Credential<RoleCredentialSubject> => {
          return {
            ...credential,
            credentialStatus: {
              id: `https://energyweb.org/credential/${id(
                JSON.stringify(credential)
              )}#list`,
              type: StatusListEntryType.Entry2021,
              statusPurpose: CredentialStatusPurpose.REVOCATION,
              statusListIndex: '1',
              statusListCredential: `https://identitycache.org/v1/status-list/${credential.id}`,
            },
          };
        },
      };
    }),
  };
});

MessagingService.create = (signerService: SignerService) =>
  Promise.resolve(new MessagingService(signerService));
jest.mock('../src/modules/messaging/messaging.service', () => {
  return {
    MessagingService: jest.fn().mockImplementation(() => {
      return { publish: jest.fn() };
    }),
  };
});

describe('Сlaim tests', () => {
  let claimsService: ClaimsService;
  let signerService: SignerService;
  let assetsService: AssetsService;
  let domainsService: DomainsService;
  let claimManager: ClaimManager;
  let didRegistry: DidRegistry;
  let verifiableCredentialsService: VerifiableCredentialsServiceBase;

  beforeEach(async () => {
    jest.clearAllMocks();
    mockGetClaimsBySubject.mockImplementation(getClamsBySubjectInitMock);
    await replenish(await staticIssuer.getAddress());
    await replenish(await rootOwner.getAddress());
    await replenish(await dynamicIssuer.getAddress());
    await replenish(await projectInstallerCandidate.getAddress());
    await replenish(await myAsset.getAddress());

    await setupENS(await rootOwner.getAddress());
    let connectToCacheServer;
    ({ signerService, connectToCacheServer } = await initWithPrivateKeySigner(
      rootOwner.privateKey,
      rpcUrl
    ));
    await signerService.publicKeyAndIdentityToken();
    const chainId = signerService.chainId;
    claimManager = new ClaimManager__factory(rootOwner).attach(
      chainConfigs()[chainId].claimManagerAddress
    );
    let connectToDidRegistry;
    ({ domainsService, connectToDidRegistry, assetsService } =
      await connectToCacheServer());
    await domainsService.createRole({
      roleName: roleName1,
      namespace,
      data: roles[`${roleName1}.${root}`],
      returnSteps: false,
    });
    await domainsService.createRole({
      roleName: roleName4,
      namespace,
      data: roles[`${roleName4}.${root}`],
      returnSteps: false,
    });
    await domainsService.createRole({
      roleName: roleName5,
      namespace,
      data: roles[`${roleName5}.${root}`],
      returnSteps: false,
    });
    await domainsService.createRole({
      roleName: verifyVcRole,
      namespace,
      data: roles[`${verifyVcRole}.${root}`],
      returnSteps: false,
    });
    await domainsService.createRole({
      roleName: verifyVcRole2,
      namespace,
      data: roles[`${verifyVcRole2}.${root}`],
      returnSteps: false,
    });
    await domainsService.createRole({
      roleName: verifyOffChainClaimRole,
      namespace,
      data: roles[`${verifyOffChainClaimRole}.${root}`],
      returnSteps: false,
    });
    await domainsService.createRole({
      roleName: resolveVC,
      namespace,
      data: roles[`${resolveVC}.${root}`],
      returnSteps: false,
    });
    await domainsService.createRole({
      roleName: verifyResolvedVcExpired,
      namespace,
      data: roles[`${verifyResolvedVcExpired}.${root}`],
      returnSteps: false,
    });
    await domainsService.createRole({
      roleName: vcExpired,
      namespace,
      data: roles[`${vcExpired}.${root}`],
      returnSteps: false,
    });
    await domainsService.createRole({
      roleName: eip191JwtExpired,
      namespace,
      data: roles[`${eip191JwtExpired}.${root}`],
      returnSteps: false,
    });
    await domainsService.createRole({
      roleName: electrician,
      namespace,
      data: roles[`${electrician}.${root}`],
      returnSteps: false,
    });
    await domainsService.createRole({
      roleName: projectElectrician,
      namespace,
      data: roles[`${projectElectrician}.${root}`],
      returnSteps: false,
    });
    await domainsService.createRole({
      roleName: projectInstaller,
      namespace,
      data: roles[`${projectInstaller}.${root}`],
      returnSteps: false,
    });
    await domainsService.createRole({
      roleName: roleForAsset,
      namespace,
      data: roles[`${roleForAsset}.${root}`],
      returnSteps: false,
    });

    ({ didRegistry, claimsService } = await connectToDidRegistry(
      await spawnIpfsDaemon()
    ));
    mockGetAllowedRoles.mockImplementation(async (issuer) => {
      const roleDefs = Object.values(roles);
      const isRoleIssuerOfRole = await Promise.all(
        roleDefs.map(
          (r) =>
            r.issuer.roleName &&
            claimsService.hasOnChainRole(issuer, r.issuer.roleName, version)
        )
      );
      const allowedRoles = roleDefs
        .filter((r, i) => {
          return (
            (r.issuer.issuerType === 'DID' && r.issuer.did?.includes(issuer)) ||
            (r.issuer.issuerType === 'ROLE' && isRoleIssuerOfRole[i])
          );
        })
        .map((r) => ({ ...r, namespace: `${r.roleName}.${root}` }));

      return allowedRoles;
    });
    Reflect.set(didRegistry, '_cacheClient', undefined);
    setLogger(new ConsoleLogger(LogLevel.warn));
    const cacheClient = new CacheClient(signerService);
    verifiableCredentialsService = await getVerifiableCredentialsService(
      signerService,
      cacheClient
    );
  });

  afterEach(async () => {
    await shutDownIpfsDaemon();
  });

  describe('Role claim tests', () => {
    async function enrolAndIssue(
      requestSigner: Required<SignerT>,
      issueSigner: Required<SignerT>,
      {
        subjectDID,
        claimType,
        registrationTypes = [RegistrationTypes.OnChain],
        publishOnChain = true,
        issuerFields,
        expirationTimestamp,
      }: {
        subjectDID: string;
        claimType: string;
        registrationTypes?: RegistrationTypes[];
        publishOnChain?: boolean;
        issuerFields?: Record<string, string | number>[];
        expirationTimestamp?: number;
      }
    ) {
      await signerService.connect(requestSigner, ProviderType.PrivateKey);
      const requesterDID = signerService.did;
      const requestorFields = [{ key: 'temperature', value: 36 }];
      await claimsService.createClaimRequest({
        claim: {
          claimType,
          claimTypeVersion: version,
          requestorFields,
        },
        registrationTypes,
        subject: subjectDID,
      });
      const [message] = mockRequestClaim.mock.calls.pop();

      await signerService.connect(issueSigner, ProviderType.PrivateKey);
      const issuerDID = signerService.did;
      await claimsService.issueClaimRequest({
        publishOnChain,
        issuerFields,
        expirationTimestamp,
        ...message,
      });
      const [, issuedClaim] = <[string, Required<IClaimIssuance>]>(
        mockIssueClaim.mock.calls.pop()
      );

      const currentGetClaimsBySubjectMock =
        mockGetClaimsBySubject.getMockImplementation() as jest.Mock;
      mockGetClaimsBySubject.mockImplementation((did) =>
        [...currentGetClaimsBySubjectMock(did)].concat(
          did === subjectDID
            ? [
                {
                  claimType,
                  claimTypeVersion: version,
                  issuedToken: issuedClaim.issuedToken,
                },
              ]
            : []
        )
      );
      const {
        issuedToken,
        requester,
        claimIssuer,
        onChainProof,
        acceptedBy,
        vp,
      } = issuedClaim;

      const roleDefinitionValidityPeriod =
        roles[claimType].defaultValidityPeriod;

      if (registrationTypes.includes(RegistrationTypes.OffChain)) {
        expect(issuedToken).toBeDefined();
        const { credentialStatus } = (await didRegistry.decodeJWTToken({
          token: issuedToken,
        })) as { [key: string]: StatusList2021Entry };
        expect(credentialStatus).toBeDefined;
        expect(credentialStatus.type).toEqual(StatusListEntryType.Entry2021);
        expect(vp).toBeDefined();

        const vpObject = JSON.parse(vp) as VerifiablePresentation;

        expect(vpObject.verifiableCredential).toHaveLength(1);
        expect(vpObject.verifiableCredential[0].credentialSubject).toEqual({
          id: subjectDID,
          role: {
            namespace: claimType,
            version: version.toString(),
          },
          issuerFields: issuerFields || [],
        });
        expect(vpObject.verifiableCredential[0].issuer).toEqual(
          signerService.didHex
        );
        expirationTimestamp &&
          expect(vpObject.verifiableCredential[0].expirationDate).toEqual(
            new Date(expirationTimestamp).toISOString()
          );

        if (roleDefinitionValidityPeriod && !expirationTimestamp) {
          expect(vpObject.verifiableCredential[0].expirationDate).toEqual(
            new Date(Date.now() + roleDefinitionValidityPeriod).toISOString()
          );
        }

        expect(vpObject.holder).toEqual(signerService.didHex);

        const { claimData, signer, did, exp } =
          (await didRegistry.decodeJWTToken({
            token: issuedToken,
          })) as { [key: string]: string };

        expect(claimData).toEqual({
          claimType,
          claimTypeVersion: version,
          issuerFields,
          requestorFields,
        });

        expirationTimestamp &&
          expect(exp).toEqual(Math.floor(expirationTimestamp / 1000));

        expect(claimData).not.toContain({
          fields: [{ key: 'temperature', value: 36 }],
        });

        expect(signer).toBe(issuerDID);
        expect(did).toBe(requesterDID);
      }

      expect(requester).toEqual(requesterDID);
      expect(claimIssuer).toEqual([issuerDID]);

      if (registrationTypes.includes(RegistrationTypes.OnChain)) {
        expect(onChainProof).toHaveLength(132);

        if (expirationTimestamp || roleDefinitionValidityPeriod) {
          const filter = claimManager.filters.RoleRegistered();
          const logs = await claimManager.queryFilter(filter);

          logs.forEach((log) => {
            const parsedLog = claimManager.interface.parseLog(log);
            const args = parsedLog.args as unknown as {
              subject: string;
              role: string;
              version: BigNumber;
              expiry: BigNumber;
              issuer: string;
            };

            if (
              args.subject === addressOf(subjectDID) &&
              args.role === namehash(claimType)
            ) {
              expirationTimestamp &&
                expect(args.expiry.toNumber()).toEqual(
                  Math.floor(expirationTimestamp / 1000)
                );
            }
          });
        }
      }

      expect(acceptedBy).toBe(issuerDID);

      return issuedClaim;
    }

    async function issueWithoutRequest(
      issueSigner: Required<SignerT>,
      {
        subjectDID,
        claimType,
        registrationTypes = [RegistrationTypes.OnChain],
        issuerFields,
      }: {
        subjectDID: string;
        claimType: string;
        registrationTypes?: RegistrationTypes[];
        publishOnChain?: boolean;
        issuerFields?: { key: string; value: string | number }[];
      }
    ) {
      await signerService.connect(issueSigner, ProviderType.PrivateKey);
      const requesterDID = subjectDID;
      const issuerDID = signerService.did;
      const requestorFields = [{ key: 'temperature', value: 36 }];

      await claimsService.issueClaim({
        subject: subjectDID,
        registrationTypes,
        claim: {
          claimType,
          claimTypeVersion: version,
          issuerFields: issuerFields || [],
        },
      });

      const [did, issuedClaim] = <[string, Required<IClaimIssuance>]>(
        mockIssueClaim.mock.calls.pop()
      );

      expect(did).toBe(issuerDID);

      const { issuedToken, requester, claimIssuer, acceptedBy } = issuedClaim;

      if (registrationTypes.includes(RegistrationTypes.OffChain)) {
        expect(issuedToken).toBeDefined();

        const { claimData, signer, did } = (await didRegistry.decodeJWTToken({
          token: issuedToken,
        })) as { [key: string]: string };

        expect(claimData).toEqual({
          claimType,
          claimTypeVersion: version,
          issuerFields,
          requestorFields,
        });

        expect(signer).toBe(issuerDID);
        expect(did).toBe(requesterDID);
      }

      expect(requester).toEqual(subjectDID);
      expect(claimIssuer).toEqual([issuerDID]);
      expect(acceptedBy).toBe(issuerDID);

      return issuedClaim;
    }

    test('enrollment by issuer of type DID', async () => {
      const requester = rootOwner;
      const issuer = staticIssuer;
      const subjectDID = rootOwnerDID;
      const role = `${roleName1}.${root}`;
      const claimType = `${roleName1}.${root}`;
      expect(
        await claimsService.hasOnChainRole(rootOwnerDID, role, version)
      ).toBe(false);
      await enrolAndIssue(requester, issuer, {
        subjectDID,
        claimType,
      });

      expect(
        await claimManager.hasRole(
          addressOf(subjectDID),
          namehash(role),
          version
        )
      ).toBe(true);
      expect(
        await claimsService.hasOnChainRole(subjectDID, role, version)
      ).toBe(true);
    });

    test('asset enrollment by issuer of type DID', async () => {
      mockGetAssetById.mockImplementationOnce(({ id }: { id: string }) => ({
        id,
      }));
      await signerService.connect(rootOwner, ProviderType.PrivateKey);
      const assetAddress = await assetsService.registerAsset();
      const assetDID = `did:${Methods.Erc1056}:${Chain.VOLTA}:${assetAddress}`;
      await enrolAndIssue(rootOwner, staticIssuer, {
        subjectDID: assetDID,
        claimType: `${roleName1}.${root}`,
      });

      return expect(
        await claimsService.hasOnChainRole(
          assetDID,
          `${roleName1}.${root}`,
          version
        )
      ).toBe(true);
    });

    test('enrollment by issuer of type ROLE', async () => {
      await signerService.connect(rootOwner, ProviderType.PrivateKey);
      await domainsService.createRole({
        roleName: roleName2,
        namespace,
        data: roles[`${roleName2}.${root}`],
        returnSteps: false,
      });
      await enrolAndIssue(dynamicIssuer, staticIssuer, {
        subjectDID: dynamicIssuerDID,
        claimType: `${roleName1}.${root}`,
        registrationTypes: [
          RegistrationTypes.OnChain,
          RegistrationTypes.OffChain, // role type issuer should have offchain claim
        ],
        issuerFields: [],
      });

      expect(
        await claimManager.hasRole(
          addressOf(dynamicIssuerDID),
          namehash(`${roleName1}.${root}`),
          version
        )
      );

      await enrolAndIssue(rootOwner, dynamicIssuer, {
        subjectDID: rootOwnerDID,
        claimType: `${roleName2}.${root}`,
      });
      return expect(
        await claimsService.hasOnChainRole(
          rootOwnerDID,
          `${roleName2}.${root}`,
          version
        )
      ).toBe(true);
    });

    test('should enrol when prerequisites are met', async () => {
      await signerService.connect(rootOwner, ProviderType.PrivateKey);
      await domainsService.createRole({
        roleName: roleName3,
        namespace,
        data: roles[`${roleName3}.${root}`],
        returnSteps: false,
      });

      const roleOneIssuance = await enrolAndIssue(rootOwner, staticIssuer, {
        subjectDID: rootOwnerDID,
        claimType: `${roleName1}.${root}`,
        registrationTypes: [
          RegistrationTypes.OnChain,
          RegistrationTypes.OffChain,
        ],
        publishOnChain: true,
        issuerFields: [],
      });
      await signerService.connect(rootOwner, ProviderType.PrivateKey);
      await claimsService.publishPublicClaim({
        claim: { token: roleOneIssuance.issuedToken },
      });

      const roleTwoIssuance = await enrolAndIssue(rootOwner, staticIssuer, {
        subjectDID: rootOwnerDID,
        claimType: `${roleName3}.${root}`,
        registrationTypes: [
          RegistrationTypes.OnChain,
          RegistrationTypes.OffChain,
        ],
        publishOnChain: true,
        issuerFields: [],
      });
      await signerService.connect(rootOwner, ProviderType.PrivateKey);
      await claimsService.publishPublicClaim({
        claim: { token: roleTwoIssuance.issuedToken },
      });
      return expect(
        await claimsService.hasOnChainRole(
          rootOwnerDID,
          `${roleName3}.${root}`,
          version
        )
      ).toBe(true);
    });
    test('should enrol when prerequisite role is met and the issuer is not the issuer of the prerequisite role', async () => {
      //Root Owner enrols to 'Electrician' role
      const enrolToElectrician = await enrolAndIssue(rootOwner, staticIssuer, {
        subjectDID: rootOwnerDID,
        claimType: `${electrician}.${root}`,
        registrationTypes: [
          RegistrationTypes.OnChain,
          RegistrationTypes.OffChain,
        ],
        publishOnChain: true,
        issuerFields: [],
      });
      await signerService.connect(rootOwner, ProviderType.PrivateKey);
      await claimsService.publishPublicClaim({
        claim: { token: enrolToElectrician.issuedToken },
      });

      //Project Installer Candidate enrols to 'Project Installer' role
      const enrolToProjectInstaller = await enrolAndIssue(
        projectInstallerCandidate,
        staticIssuer,
        {
          subjectDID: projectInstallerCandidateDID,
          claimType: `${projectInstaller}.${root}`,
          registrationTypes: [
            RegistrationTypes.OnChain,
            RegistrationTypes.OffChain,
          ],
          publishOnChain: true,
          issuerFields: [],
        }
      );
      await signerService.connect(
        projectInstallerCandidate,
        ProviderType.PrivateKey
      );
      await claimsService.publishPublicClaim({
        claim: { token: enrolToProjectInstaller.issuedToken },
      });

      //Root Owner enrols to 'Project Electrician' role. 'Electrician' is pre-requisite role; Project Installer is issuer of 'Project Electrician' role, not issuer of 'Electrician' role
      const enrolToProjectElectrician = await enrolAndIssue(
        rootOwner,
        projectInstallerCandidate,
        {
          subjectDID: rootOwnerDID,
          claimType: `${projectElectrician}.${root}`,
          registrationTypes: [
            RegistrationTypes.OnChain,
            RegistrationTypes.OffChain,
          ],
          publishOnChain: true,
          issuerFields: [],
        }
      );
      await signerService.connect(rootOwner, ProviderType.PrivateKey);
      await claimsService.publishPublicClaim({
        claim: { token: enrolToProjectElectrician.issuedToken },
      });

      //Expect Root Owner to have role of Project Electrician
      return expect(
        await claimsService.hasOnChainRole(
          rootOwnerDID,
          `${projectElectrician}.${root}`,
          version
        )
      ).toBe(true);
    });

    test('should reject to enrol when prerequisites are not met', async () => {
      await signerService.connect(rootOwner, ProviderType.PrivateKey);
      await domainsService.createRole({
        roleName: roleName3,
        namespace,
        data: roles[`${roleName3}.${root}`],
        returnSteps: false,
      });

      return expect(
        enrolAndIssue(rootOwner, staticIssuer, {
          subjectDID: rootOwnerDID,
          claimType: `${roleName3}.${root}`,
        })
      ).rejects.toEqual(new Error(ERROR_MESSAGES.ROLE_PREREQUISITES_NOT_MET));
    });

    test('enrollment with credential/claim time expiration', async () => {
      const requester = rootOwner;
      const issuer = staticIssuer;
      const subjectDID = rootOwnerDID;
      const claimType = `${roleName1}.${root}`;

      await enrolAndIssue(requester, issuer, {
        subjectDID,
        claimType,
        expirationTimestamp: Date.now() + 100000,
      });

      expect(
        await claimsService.hasOnChainRole(subjectDID, claimType, version)
      ).toBe(true);
    });

    test('enrolment should fail if issuer authoritative credential has expired', async () => {
      await signerService.connect(rootOwner, ProviderType.PrivateKey);
      await domainsService.createRole({
        roleName: roleName2,
        namespace,
        data: roles[`${roleName2}.${root}`],
        returnSteps: false,
      });
      const res = await enrolAndIssue(dynamicIssuer, staticIssuer, {
        subjectDID: dynamicIssuerDID,
        claimType: `${roleName1}.${root}`,
        registrationTypes: [
          RegistrationTypes.OnChain,
          RegistrationTypes.OffChain, // role type issuer should have offchain claim
        ],
        issuerFields: [],
        expirationTimestamp: Date.now() + 7000,
      });

      await signerService.connect(dynamicIssuer, ProviderType.PrivateKey);
      await claimsService.publishPublicClaim({
        claim: { token: res.issuedToken },
      });

      const delay = (ms) => new Promise((res) => setTimeout(res, ms));
      await delay(8000);

      return expect(
        enrolAndIssue(rootOwner, dynamicIssuer, {
          subjectDID: rootOwnerDID,
          claimType: `${roleName2}.${root}`,
          expirationTimestamp: Date.now() + 100000,
          registrationTypes: [RegistrationTypes.OffChain],
        })
      ).rejects.toEqual(new Error('Issuer credential has expired'));
    });

    test('enrollment with credential/claim default time expiration from role definition', async () => {
      const requester = rootOwner;
      const issuer = staticIssuer;
      const subjectDID = rootOwnerDID;
      const claimType = `${roleName5}.${root}`;

      await enrolAndIssue(requester, issuer, {
        subjectDID,
        claimType,
      });

      expect(
        await claimsService.hasOnChainRole(subjectDID, claimType, version)
      ).toBe(true);
    });

    describe('Publishing onchain', () => {
      const registrationTypes = [RegistrationTypes.OnChain];
      const claimType = `${roleName1}.${root}`;
      const role1Claim = {
        claimType,
        claimTypeVersion: version,
        isAccepted: true,
        subject: rootOwnerDID,
      };

      test('should be able to issue and publish onchain', async () => {
        await enrolAndIssue(rootOwner, staticIssuer, {
          subjectDID: rootOwnerDID,
          claimType,
          registrationTypes,
          publishOnChain: true,
        });
        expect(
          await claimsService.hasOnChainRole(rootOwnerDID, claimType, version)
        ).toBe(true);
      });

      test('should be able to issue and publish onchain without request', async () => {
        const claim = await issueWithoutRequest(staticIssuer, {
          subjectDID: rootOwnerDID,
          claimType,
          registrationTypes,
        });
        expect(claim.onChainProof).toHaveLength(132);

        await signerService.connect(rootOwner, ProviderType.PrivateKey);
        const mockedClaim = {
          claimType,
          isApproved: true,
          onChainProof: claim.onChainProof,
          claimTypeVersion: version,
          acceptedBy: claim.acceptedBy,
          subject: rootOwnerDID,
        };
        mockGetClaimsBySubject
          .mockReset()
          .mockImplementationOnce(() => [mockedClaim]);

        await claimsService.publishPublicClaim({
          claim: { claimType },
          registrationTypes,
        });
        expect(
          await claimsService.hasOnChainRole(rootOwnerDID, claimType, version)
        ).toBe(true);
      });

      test('should be able to issue without request and publish onchain for owned asset', async () => {
        await signerService.connect(rootOwner, ProviderType.PrivateKey);
        const claimType = `${roleForAsset}.${root}`;
        const assetDID = `did:${Methods.Erc1056}:${
          Chain.VOLTA
        }:${await assetsService.registerAsset()}`;

        const claim = await issueWithoutRequest(rootOwner, {
          subjectDID: assetDID,
          claimType,
          registrationTypes,
        });
        expect(claim.onChainProof).toHaveLength(132);
        const mockedClaim = {
          claimType,
          isApproved: true,
          onChainProof: claim.onChainProof,
          claimTypeVersion: version,
          acceptedBy: claim.acceptedBy,
          subject: assetDID,
        };
        mockGetClaimsBySubject
          .mockReset()
          .mockImplementationOnce(() => [mockedClaim]);

        await claimsService.publishPublicClaim({
          claim: { claimType },
          registrationTypes,
        });
        expect(
          await claimsService.hasOnChainRole(assetDID, claimType, version)
        ).toBe(true);
      });

      test('should be able to issue without publishing onchain', async () => {
        mockGetClaimsBySubject.mockImplementationOnce(() => [role1Claim]);

        await enrolAndIssue(rootOwner, staticIssuer, {
          subjectDID: rootOwnerDID,
          claimType,
          registrationTypes,
          publishOnChain: false,
        });
        expect(
          await claimsService.hasOnChainRole(rootOwnerDID, claimType, version)
        ).toBe(false);
      });

      test('should be able to issue when role registered onchain', async () => {
        await enrolAndIssue(rootOwner, staticIssuer, {
          subjectDID: rootOwnerDID,
          claimType,
          registrationTypes: [
            RegistrationTypes.OffChain,
            RegistrationTypes.OnChain,
          ],
          publishOnChain: true,
        });
        expect(
          await claimsService.hasOnChainRole(rootOwnerDID, claimType, version)
        ).toBe(true);

        await enrolAndIssue(rootOwner, staticIssuer, {
          subjectDID: rootOwnerDID,
          claimType,
          registrationTypes: [
            RegistrationTypes.OffChain,
            RegistrationTypes.OnChain,
          ],
          publishOnChain: true,
        });
      });

      test('should be able to issue without publishing onchain', async () => {
        await enrolAndIssue(rootOwner, staticIssuer, {
          subjectDID: rootOwnerDID,
          claimType,
          registrationTypes: [
            RegistrationTypes.OffChain,
            RegistrationTypes.OnChain,
          ],
          publishOnChain: false,
        });
        expect(
          await claimsService.hasOnChainRole(rootOwnerDID, claimType, version)
        ).toBe(false);
      });

      test('should be able to set expiry', async () => {
        const expirationTimestamp = new Date().getTime() + 60_1000;
        const waitForRegister = new Promise((resolve) =>
          claimManager.once(
            'RoleRegistered',
            (subject, role, version, expiry: BigNumber) =>
              resolve(expiry.toNumber())
          )
        );
        const { issuedToken } = await enrolAndIssue(rootOwner, staticIssuer, {
          subjectDID: rootOwnerDID,
          claimType,
          expirationTimestamp,
          registrationTypes: [
            RegistrationTypes.OffChain,
            RegistrationTypes.OnChain,
          ],
          publishOnChain: true,
        });
        const payload = jsonwebtoken.decode(issuedToken) as JwtPayload;
        const exp = payload.exp as number;
        expect(exp).not.toBeUndefined;

        const expiry = await waitForRegister;

        expect(
          await claimsService.hasOnChainRole(rootOwnerDID, claimType, version)
        ).toBe(true);
        expect(expiry).toBe(Math.floor(expirationTimestamp / 1000));
        expect(expiry).toBe(exp);
      });
    });

    test('should issue claim request with additional issuer fields', async () => {
      const requester = rootOwner;
      const issuer = staticIssuer;
      const subject = rootOwner;
      const subjectDID = rootOwnerDID;
      const claimType = `${roleName1}.${root}`;
      const registrationTypes = [
        RegistrationTypes.OnChain,
        RegistrationTypes.OffChain,
      ];
      await claimsService.createClaimRequest({
        claim: {
          claimType: `${roleName1}.${root}`,
          claimTypeVersion: version,
        },
        registrationTypes,
      });

      const issuerFields: { key: string; value: string | number }[] = [
        {
          key: 'document ID',
          value: 'ASG 123222',
        },
        {
          key: 'DOB',
          value: '1990-01-07',
        },
      ];

      const { issuedToken } = await enrolAndIssue(requester, issuer, {
        subjectDID,
        claimType,
        registrationTypes,
        issuerFields,
      });

      const data = didRegistry.jwt.decode(issuedToken) as {
        claimData: { issuerFields };
      };
      expect(data.claimData.issuerFields).toEqual(issuerFields);

      let subjectDoc = await didRegistry.getDidDocument({
        did: subjectDID,
        includeClaims: true,
      });
      mockCachedDocument.mockResolvedValueOnce(subjectDoc);

      await signerService.connect(subject, ProviderType.PrivateKey);
      const claimUrl = await claimsService.publishPublicClaim({
        claim: { token: issuedToken },
      });

      subjectDoc = await didRegistry.getDidDocument({
        did: subjectDID,
        includeClaims: true,
      });
      expect(
        subjectDoc.service.find(
          (s) => s.serviceEndpoint === claimUrl && s.claimType === claimType
        )
      ).toBeDefined();
    });

    const createExampleSignedCredential = async (
      issuerFields: IssuerFields[],
      namespace: string,
      expirationDate?: Date
    ) => {
      return await verifiableCredentialsService.createRoleVC({
        id: rootOwnerDID,
        namespace: namespace,
        version: '1',
        issuerFields,
        expirationDate,
      });
    };
    describe('Verification tests', () => {
      describe('resolveCredentialAndVerify tests', () => {
        test('resolveCredentialAndVerify should resolve and verify a Verifiable Credential', async () => {
          const roleName = `${resolveVC}.${root}`;
          const { issuedToken } = await enrolAndIssue(rootOwner, staticIssuer, {
            subjectDID: rootOwnerDID,
            claimType: roleName,
            registrationTypes: [
              RegistrationTypes.OnChain,
              RegistrationTypes.OffChain,
            ],
            publishOnChain: true,
            issuerFields: [],
          });
          await signerService.connect(rootOwner, ProviderType.PrivateKey);
          const subjectDoc = await didRegistry.getDidDocument({
            did: rootOwnerDID,
            includeClaims: true,
          });
          mockCachedDocument.mockResolvedValueOnce(subjectDoc);
          await claimsService.publishPublicClaim({
            claim: { token: issuedToken },
          });
          const result = await claimsService.resolveCredentialAndVerify(
            rootOwnerDID,
            roleName
          );
          expect(result.errors).toHaveLength(0);
          expect(result.isVerified).toBe(true);
        });

        test('resolveCredentialAndVerify should resolve and verify an EIP191JWT', async () => {
          const roleName = `${verifyOffChainClaimRole}.${root}`;
          const { issuedToken } = await enrolAndIssue(rootOwner, staticIssuer, {
            subjectDID: rootOwnerDID,
            claimType: roleName,
            registrationTypes: [
              RegistrationTypes.OnChain,
              RegistrationTypes.OffChain,
            ],
            publishOnChain: true,
            issuerFields: [],
          });
          await signerService.connect(rootOwner, ProviderType.PrivateKey);
          await claimsService.publishPublicClaim({
            claim: { token: issuedToken },
          });
          const result = await claimsService.resolveCredentialAndVerify(
            rootOwnerDID,
            roleName
          );
          expect(result.errors).toHaveLength(0);
          expect(result.isVerified).toBe(true);
        });
        test('resolveCredentialAndVerify should return a "No claim found" error if no credential and no claim is resolved', async () => {
          const roleName = `${resolveVC}.${root}`;
          const result = await claimsService.resolveCredentialAndVerify(
            staticIssuerDID,
            roleName
          );
          expect(result.errors).toContain(
            'No claim found for given DID and role'
          );
          expect(result.isVerified).toBe(false);
        });

        test('resolveCredentialAndVerify should return an expiration error if the credential is expired', async () => {
          const roleName = `${verifyResolvedVcExpired}.${root}`;
          const { issuedToken } = await enrolAndIssue(rootOwner, staticIssuer, {
            subjectDID: rootOwnerDID,
            claimType: roleName,
            registrationTypes: [
              RegistrationTypes.OnChain,
              RegistrationTypes.OffChain,
            ],
            publishOnChain: true,
            issuerFields: [],
            expirationTimestamp: Date.now() + 7000,
          });
          await signerService.connect(rootOwner, ProviderType.PrivateKey);
          const subjectDoc = await didRegistry.getDidDocument({
            did: rootOwnerDID,
            includeClaims: true,
          });
          mockCachedDocument.mockResolvedValueOnce(subjectDoc);
          await claimsService.publishPublicClaim({
            claim: { token: issuedToken },
          });
          const delay = (ms) => new Promise((res) => setTimeout(res, ms));
          await delay(8000);
          const result = await claimsService.resolveCredentialAndVerify(
            rootOwnerDID,
            roleName
          );
          expect(result.errors).toContain('Credential Expired');
          expect(result.isVerified).toBe(false);
        });
      });
      test('verifyVc should verify a VC with no errors if the issuer is authorized', async () => {
        await signerService.connect(rootOwner, ProviderType.PrivateKey);
        const issuerFields = [];
        const vc = await createExampleSignedCredential(
          issuerFields,
          `${verifyVcRole}.${root}`
        );
        nock(vc.credentialStatus?.statusListCredential as string)
          .get('')
          .reply(200, undefined);
        const result = await claimsService.verifyVc(vc);
        expect(result.errors).toHaveLength(0);
        expect(result.isVerified).toBe(true);
      });
      test('verifyVc should return a credential expired error if credential is expired', async () => {
        await signerService.connect(rootOwner, ProviderType.PrivateKey);
        const issuerFields = [];
        const vc = await createExampleSignedCredential(
          issuerFields,
          `${vcExpired}.${root}`,
          new Date(Date.now() + 8000)
        );
        nock(vc.credentialStatus?.statusListCredential as string)
          .get('')
          .reply(200, undefined);
        const delay = (ms) => new Promise((res) => setTimeout(res, ms));
        await delay(8000);
        const result = await claimsService.verifyVc(vc);
        expect(result.errors).toContain('Verifiable Credential is expired.');
        expect(result.isVerified).toBe(false);
      });
      test('verifyEIP should return an expiration error if the credential is expired', async () => {
        const roleName = `${eip191JwtExpired}.${root}`;
        const { issuedToken } = await enrolAndIssue(rootOwner, staticIssuer, {
          subjectDID: rootOwnerDID,
          claimType: roleName,
          registrationTypes: [
            RegistrationTypes.OnChain,
            RegistrationTypes.OffChain,
          ],
          publishOnChain: true,
          issuerFields: [],
          expirationTimestamp: Date.now() + 7000,
        });
        await signerService.connect(rootOwner, ProviderType.PrivateKey);
        const subjectDoc = await didRegistry.getDidDocument({
          did: rootOwnerDID,
          includeClaims: true,
        });
        mockCachedDocument.mockResolvedValueOnce(subjectDoc);
        await claimsService.publishPublicClaim({
          claim: { token: issuedToken },
        });
        const delay = (ms) => new Promise((res) => setTimeout(res, ms));
        await delay(8000);
        await signerService.connect(staticIssuer, ProviderType.PrivateKey);
        const credential = await claimsService.fetchCredential(
          rootOwnerDID,
          roleName
        );
        const result = await claimsService.verifyRoleEIP191JWT(
          credential as RoleEIP191JWT
        );
        expect(result.errors).toContain('Credential Expired');
        expect(result.isVerified).toBe(false);
      });
    });
  });

  describe('Selfsigned claim tests', () => {
    test('Selfsigned claim should be verified', async () => {
      const claimUrl = await claimsService.createSelfSignedClaim({
        data: {
          claimType: roleName1,
          claimTypeVersion: 1,
        },
        subject: rootOwnerDID,
      });
      const claim = await didRegistry.ipfsStore.get(claimUrl);

      const document = await didRegistry.getDidDocument();
      const proofVerivier = new ProofVerifier(document);

      expect(await proofVerivier.verifyAuthenticationProof(claim)).toEqual(
        document.id
      );
    });

    test('Should be able to create selfsigned claim for owned identity', async () => {
      const assetDID = `did:${Methods.Erc1056}:${
        Chain.VOLTA
      }:${await assetsService.registerAsset()}`;
      mockGetCachedOwnedAssets.mockResolvedValueOnce([
        { document: { id: assetDID }, id: assetDID },
      ]);
      mockGetCachedOwnedAssets.mockResolvedValueOnce([
        { document: { id: assetDID }, id: assetDID },
      ]);
      const claimType = 'test claim';
      const claimUrl = await claimsService.createSelfSignedClaim({
        data: { claimType, claimTypeVersion: 1 },
        subject: assetDID,
      });
      const claim = await didRegistry.ipfsStore.get(claimUrl);

      const ownerDoc = await didRegistry.getDidDocument({
        did: rootOwnerDID,
        includeClaims: true,
      });
      const proofVerivier = new ProofVerifier(ownerDoc);

      expect(await proofVerivier.verifyAuthenticationProof(claim)).toEqual(
        ownerDoc.id
      );

      const assetDoc = await didRegistry.getDidDocument({
        did: assetDID,
        includeClaims: true,
      });
      expect(
        assetDoc.service.find(
          (s) => s.claimType === claimType && s.serviceEndpoint === claimUrl
        )
      ).toBeDefined();
    });
  });
});
