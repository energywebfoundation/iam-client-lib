import { utils, Wallet } from 'ethers';
import {
  IRoleDefinition,
  PreconditionType,
} from '@energyweb/credential-governance';
import { Methods, Chain } from '@ew-did-registry/did';
import {
  DomainsService,
  initWithPrivateKeySigner,
  MessagingService,
  NamespaceType,
  ENSOwnerNotValidAddressError,
  RegistrationTypes,
  SignerService,
} from '../../src';
import { replenish, root, rpcUrl, setupENS } from '../utils/setup_contracts';

const { namehash } = utils;

const mockGetRoleDefinition = jest.fn();
jest.mock('../../src/modules/cacheClient/cacheClient.service', () => {
  return {
    CacheClient: jest.fn().mockImplementation(() => {
      return {
        getRoleDefinition: mockGetRoleDefinition,
        init: jest.fn(),
        login: jest.fn(),
      };
    }),
  };
});

MessagingService.create = (signerService: SignerService) =>
  Promise.resolve(new MessagingService(signerService));

describe('Domains service', () => {
  let domainsService: DomainsService;
  const rootOwner = Wallet.createRandom();

  beforeEach(async () => {
    jest.clearAllMocks();
    await setupENS(rootOwner.address);
    await replenish(rootOwner.address);

    const { connectToCacheServer } = await initWithPrivateKeySigner(
      rootOwner.privateKey,
      rpcUrl
    );
    ({ domainsService } = await connectToCacheServer());
  });

  describe('Organization tests', () => {
    const org1 = 'org1';
    const orgName = 'Organization 1';

    test('organization can be created', async () => {
      await domainsService.createOrganization({
        orgName: org1,
        namespace: root,
        data: { orgName },
      });
      expect(
        await domainsService.checkExistenceOfDomain({
          domain: `${org1}.${root}`,
        })
      ).toBe(true);
      expect(
        await domainsService.checkExistenceOfDomain({
          domain: `${NamespaceType.Application}.${org1}.${root}`,
        })
      ).toBe(true);
      expect(
        await domainsService.checkExistenceOfDomain({
          domain: `${NamespaceType.Role}.${org1}.${root}`,
        })
      ).toBe(true);
      expect(await domainsService.getSubdomains({ domain: root })).toContain(
        `${org1}.${root}`
      );
      expect(
        await domainsService.isOwner({
          domain: `${org1}.${root}`,
          user: rootOwner.address,
        })
      );
    });

    test('suborganization can be created', async () => {
      await domainsService.createOrganization({
        orgName: org1,
        namespace: root,
        data: { orgName },
      });
      const org1_1 = 'org1-1';
      await domainsService.createOrganization({
        orgName: org1_1,
        data: {
          orgName: 'Organization 1_1',
        },
        namespace: `${org1}.${root}`,
      });

      expect(
        await domainsService.checkExistenceOfDomain({
          domain: `${org1_1}.${org1}.${root}`,
        })
      ).toBe(true);
      expect(
        await domainsService.getSubdomains({ domain: `${org1}.${root}` })
      ).toContain(`${org1_1}.${org1}.${root}`);
    });

    test('org role can be created', async () => {
      await domainsService.createOrganization({
        orgName: org1,
        namespace: root,
        data: { orgName },
      });
      const namespace = `${org1}.${root}`;
      const roleName = `${org1}-role1`;
      const roleDomain = `${roleName}.${namespace}`;
      const roleNode = namehash(roleDomain);

      const data: IRoleDefinition = {
        requestorFields: [],
        issuerFields: [],
        issuer: {
          issuerType: 'DID',
          did: [`did:${Methods.Erc1056}:${Chain.VOLTA}:${rootOwner.address}`],
        },
        metadata: [],
        roleName,
        roleType: 'test',
        version: 1,
        enrolmentPreconditions: [
          {
            type: PreconditionType.Role,
            conditions: [roleDomain], // Circular condition but sufficient for test
          },
        ],
      };

      mockGetRoleDefinition.mockImplementationOnce(() => data);

      await domainsService.createRole({
        roleName,
        namespace,
        data,
      });

      const roleDef = await domainsService.getDefinition({
        namespace: roleDomain,
        type: NamespaceType.Role,
      });
      expect(roleDef).toMatchObject<IRoleDefinition>(data);

      const reverseName = await domainsService.readName(roleNode);
      expect(reverseName).toEqual(roleDomain);

      mockGetRoleDefinition.mockImplementationOnce(() => data);
      const actualTypes = (
        await domainsService.registrationTypesOfRoles([roleDomain])
      )[roleDomain];
      const expectedTypes = new Set([
        RegistrationTypes.OffChain,
        RegistrationTypes.OnChain,
      ]);
      expect(actualTypes).toEqual(expectedTypes);
    });
  });

  /**
   * EWC/Volta ENS domains can currently only be owned by EWC/Volta (i.e. EVM) addresses.
   * The ENS contract does not support DID ownership.
   * See the following for background discussion
   * - https://energyweb.atlassian.net/browse/SWTCH-790?focusedCommentId=15216
   * - https://energyweb.atlassian.net/browse/SWTCH-1050
   * TODO: These tests should probably be unit tests, not e2e,
   */
  describe('owner param validation', () => {
    test('getENSTypesByOwner should throw if owner is not an address', () => {
      expect(() =>
        domainsService.getENSTypesByOwner({
          type: NamespaceType.Organization,
          owner: `did:ethr:volta:${rootOwner.address}`,
        })
      ).toThrow(ENSOwnerNotValidAddressError);
    });

    test('changeRoleOwnership should throw if newOwner is not an address', async () => {
      const did = `did:ethr:volta:${rootOwner.address}`;
      await expect(
        domainsService.changeRoleOwnership({
          namespace: 'somerole.roles.energyweb.iam.ewc',
          newOwner: did,
        })
      ).rejects.toEqual(new ENSOwnerNotValidAddressError(did));
    });

    test('changeAppOwnership should throw if newOwner is not an address', async () => {
      const did = `did:ethr:volta:${rootOwner.address}`;
      await expect(
        domainsService.changeAppOwnership({
          namespace: 'someapp.app.energyweb.iam.ewc',
          newOwner: did,
        })
      ).rejects.toEqual(new ENSOwnerNotValidAddressError(did));
    });

    test('changeOrgOwnership should throw if newOwner is not an address', async () => {
      const did = `did:ethr:volta:${rootOwner.address}`;
      await expect(
        domainsService.changeOrgOwnership({
          namespace: 'energyweb.iam.ewc',
          newOwner: did,
        })
      ).rejects.toEqual(new ENSOwnerNotValidAddressError(did));
    });
  });
});
