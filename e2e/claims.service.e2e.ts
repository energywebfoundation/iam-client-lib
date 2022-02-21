import { IRoleDefinition, PreconditionType } from '@energyweb/iam-contracts';
import { Methods, Chain } from '@ew-did-registry/did';
import { addressOf } from '@ew-did-registry/did-ethr-resolver';
import { KeyTags } from '@ew-did-registry/did-resolver-interface';
import { ethers, providers, utils, Wallet } from 'ethers';
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
} from '../src';
import { replenish, root, rpcUrl, setupENS } from './utils/setup_contracts';
import { ClaimManager__factory } from '../ethers/factories/ClaimManager__factory';
import { ProofVerifier } from '@ew-did-registry/claims';
import { ClaimManager } from '../ethers/ClaimManager';

const { namehash } = utils;

const provider = new providers.JsonRpcProvider(rpcUrl);
const staticIssuer = Wallet.createRandom().connect(provider);
const staticIssuerDID = `did:${Methods.Erc1056}:${Chain.VOLTA}:${staticIssuer.address}`;
const dynamicIssuer = Wallet.createRandom().connect(provider);
const dynamicIssuerDID = `did:${Methods.Erc1056}:${Chain.VOLTA}:${dynamicIssuer.address}`;
const rootOwner = Wallet.createRandom().connect(provider);
const rootOwnerDID = `did:${Methods.Erc1056}:${Chain.VOLTA}:${rootOwner.address}`;
const roleName1 = 'myrole1';
const roleName2 = 'myrole2';
const roleName3 = 'myrole3';
const roleName4 = 'myrole4';
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
};
const roles: Record<string, IRoleDefinition> = {
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
const mockGetCachedOwnedAssets = jest.fn();
const mockGetAssetById = jest.fn();
const mockGetClaimsBySubject = jest.fn();
const mockRequestClaim = jest.fn();
const mockIssueClaim = jest.fn();
const mockRejectClaim = jest.fn();
jest.mock('../src/modules/cacheClient/cacheClient.service', () => {
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

describe('Enrollment claim tests', () => {
  let claimsService: ClaimsService;
  let signerService: SignerService;
  let assetsService: AssetsService;
  let domainsService: DomainsService;
  let claimManager: ClaimManager;
  let didRegistry: DidRegistry;

  beforeEach(async () => {
    jest.clearAllMocks();
    //mockGetClaimsBySubject.mockReset();
    await replenish(await staticIssuer.getAddress());
    await replenish(await rootOwner.getAddress());
    await replenish(await dynamicIssuer.getAddress());

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
    ({ didRegistry, claimsService } = await connectToDidRegistry());
    Reflect.set(didRegistry, '_cacheClient', undefined);
  });

  describe('Enrollment tests', () => {
    async function enrolAndIssue(
      requestSigner: Required<ethers.Signer>,
      issueSigner: Required<ethers.Signer>,
      {
        subjectDID,
        claimType,
        registrationTypes = [RegistrationTypes.OnChain],
        publishOnChain = true,
        issuerFields,
      }: {
        subjectDID: string;
        claimType: string;
        registrationTypes?: RegistrationTypes[];
        publishOnChain?: boolean;
        issuerFields?: Record<string, string | number>[];
      }
    ) {
      await signerService.connect(requestSigner, ProviderType.PrivateKey);
      const requesterDID = signerService.did;
      const requestorFields = [{ key: 'temperature', value: 36 }];
      await claimsService.createClaimRequest({
        claim: { claimType, claimTypeVersion: version, requestorFields },
        registrationTypes,
        subject: subjectDID,
      });
      const [message] = mockRequestClaim.mock.calls.pop();

      await signerService.connect(issueSigner, ProviderType.PrivateKey);
      const issuerDID = signerService.did;
      await claimsService.issueClaimRequest({
        publishOnChain,
        issuerFields,
        ...message,
      });
      const [, issuedClaim] = <[string, Required<IClaimIssuance>]>(
        mockIssueClaim.mock.calls.pop()
      );

      const { issuedToken, requester, claimIssuer, onChainProof, acceptedBy } =
        issuedClaim;

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

        expect(claimData).not.toContain({
          fields: [{ key: 'temperature', value: 36 }],
        });

        expect(signer).toBe(issuerDID);
        expect(did).toBe(requesterDID);
      }

      expect(requester).toEqual(requesterDID);
      expect(claimIssuer).toEqual([issuerDID]);

      registrationTypes.includes(RegistrationTypes.OnChain) &&
        expect(onChainProof).toHaveLength(132);

      expect(acceptedBy).toBe(issuerDID);

      return issuedClaim;
    }

    async function issueWithoutRequest(
      issueSigner: Required<ethers.Signer>,
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

      const role1Claim = {
        claimType: `${roleName1}.${root}`,
        isAccepted: true,
      };
      await enrolAndIssue(rootOwner, staticIssuer, {
        subjectDID: rootOwnerDID,
        claimType: `${roleName1}.${root}`,
      });
      mockGetClaimsBySubject.mockImplementationOnce(() => [role1Claim]); // to verify requesting
      mockGetClaimsBySubject.mockImplementationOnce(() => [role1Claim]); // to verify issuance

      await enrolAndIssue(rootOwner, staticIssuer, {
        subjectDID: rootOwnerDID,
        claimType: `${roleName3}.${root}`,
      });
      return expect(
        await claimsService.hasOnChainRole(
          rootOwnerDID,
          `${roleName3}.${root}`,
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

      mockGetClaimsBySubject.mockImplementationOnce(() => []);

      return expect(
        enrolAndIssue(rootOwner, staticIssuer, {
          subjectDID: rootOwnerDID,
          claimType: `${roleName3}.${root}`,
        })
      ).rejects.toEqual(new Error(ERROR_MESSAGES.ROLE_PREREQUISITES_NOT_MET));
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
        mockGetClaimsBySubject.mockImplementationOnce(() => [role1Claim]); // to verify requesting

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

      test('issuer not specified by role definition should not be able to issue', async () => {
        mockGetClaimsBySubject.mockImplementationOnce(() => [role1Claim]); // to verify requesting
        const nonIssuer = Wallet.createRandom().connect(provider);
        return expect(
          enrolAndIssue(rootOwner, nonIssuer, {
            subjectDID: rootOwnerDID,
            claimType,
            registrationTypes,
            publishOnChain: true,
          })
        ).rejects.toThrow(
          'ClaimManager: Issuer is not listed in role issuers list'
        );
      });

      test('claim not approved by subject should not be published', async () => {
        mockGetClaimsBySubject.mockImplementationOnce(() => [role1Claim]); // to verify requesting
        const nonSubject = Wallet.createRandom().connect(provider);
        return expect(
          enrolAndIssue(nonSubject, staticIssuer, {
            subjectDID: rootOwnerDID,
            claimType,
            registrationTypes,
            publishOnChain: true,
          })
        ).rejects.toThrow(
          'ClaimManager: agreement signer is not authorized to sign on behalf of subject'
        );
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
          claimTypeVersion: 1,
          requestorFields: [],
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
  });

  describe('Selfsigned claim tests', () => {
    test('Selfsigned claim should be verified', async () => {
      const claimUrl = await claimsService.createSelfSignedClaim({
        data: { claimType: roleName1 },
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
      const claimType = 'test claim';
      const claimUrl = await claimsService.createSelfSignedClaim({
        data: { claimType },
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
