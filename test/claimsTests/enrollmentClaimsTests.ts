import { Methods } from "@ew-did-registry/did";
import { addressOf } from "@ew-did-registry/did-ethr-resolver";
import { Wallet } from "ethers";
import { utils } from "ethers";
import { JSONCodec } from "nats.ws";
import { IAM, RegistrationTypes } from "../../src/iam";
import { IRoleDefinition, NATS_EXCHANGE_TOPIC } from "../../src/iam-client-lib";
import { createIam, root, rootOwner } from "../iam.test";
import { claimManager } from "../setup_contracts";

const {namehash} = utils;

export function enrollmentClaimsTests() {
  const issuer = Wallet.createRandom();
  const issuerDID = `did:${Methods.Erc1056}:${issuer.address}`;
  const requester = new Wallet(rootOwner.privateKey); // requester owns root
  const requesterDID = `did:${Methods.Erc1056}:${requester.address}`;
  const subject = requester;
  const subjectDID = `did:${Methods.Erc1056}:${subject.address}`;
  const roleName = "myrole";
  const namespace = root;
  const version = 1;
  const claimType = `${roleName}.${namespace}`;
  const roleDefinition: IRoleDefinition = {
    roleName,
    roleType: "org",
    fields: [],
    enrolmentPreconditions: [],
    issuer: { issuerType: "DID", did: [issuerDID] },
    version,
    metadata: {}
  };
  const registrationTypes = [RegistrationTypes.OffChain, RegistrationTypes.OnChain];
  const jsonCodec = JSONCodec();
  let requesterIam: IAM;
  let issuerIam: IAM;
  let publish: jest.Mock;
  let getDidDocument: jest.Mock;
  let getRoleDefinition: jest.Mock;
  let _natsConnection;
  let _cacheClient;
  let _jsonCodec;

  beforeAll(async () => {
    requesterIam = await createIam(requester.privateKey);
    issuerIam = await createIam(issuer.privateKey);

    await requesterIam.createRole({
      roleName,
      namespace,
      data: roleDefinition,
      returnSteps: false
    });
  });

  beforeAll(() => {
    ({ _natsConnection, _cacheClient, _jsonCodec } = Reflect.get(IAM, "prototype"));
    publish = jest.fn().mockImplementation();
    const mockedNatsConnection = {
      publish
    };

    getRoleDefinition = jest.fn().mockImplementation(({ namespace }: { namespace: string }) => {
      if (namespace === claimType) {
        return roleDefinition;
      } else {
        return undefined;
      }
    });
    getDidDocument = jest.fn().mockImplementation(() => {
      return { service: {} };
    });
    const mockedCacheClient = {
      getRoleDefinition,
      getDidDocument
    };

    Reflect.set(IAM.prototype, "_natsConnection", mockedNatsConnection);
    Reflect.set(IAM.prototype, "_cacheClient", mockedCacheClient);
    Reflect.set(IAM.prototype, "_jsonCodec", jsonCodec);
  });

  afterAll(() => {
    Reflect.set(IAM.prototype, "_natsConnection", _natsConnection);
    Reflect.set(IAM.prototype, "_cacheClient", _cacheClient);
    Reflect.set(IAM.prototype, "_jsonCodec", _jsonCodec);
  });

  test("enrollment request should be registered", async () => {
    await requesterIam.createClaimRequest({
      issuer: [issuerDID],
      claim: { claimType, claimTypeVersion: version, fields: [] },
      registrationTypes,
      subject: subjectDID
    });

    expect(publish).toBeCalledTimes(1);
    const channel = publish.mock.calls[0][0];
    const message = publish.mock.calls[0][1];
    expect(channel).toEqual(`${issuerDID}.${NATS_EXCHANGE_TOPIC}`);
    expect(jsonCodec.decode(message)).toHaveProperty("id");
    expect(jsonCodec.decode(message)).toHaveProperty("token");
    expect(jsonCodec.decode(message)).toMatchObject({ requester: requesterDID, claimIssuer: [issuerDID], registrationTypes });
  });

  test("issuing claim request should register on-chain enrollment", async () => {
    await requesterIam.createClaimRequest({
      issuer: [issuerDID],
      claim: { claimType, claimTypeVersion: version, fields: [] },
      registrationTypes,
      subject: subjectDID
    });

    const { id, agreement, token } = jsonCodec.decode(publish.mock.calls.pop()[1]);

    await issuerIam.issueClaimRequest({
      id,
      registrationTypes,
      requester: requesterDID,
      subjectAgreement: agreement,
      token
    });

    const [channel, data] = publish.mock.calls[1];
    expect(channel).toEqual(`${requesterDID}.${NATS_EXCHANGE_TOPIC}`);
    
    const { claimIssuer, requester, onChainProof } = jsonCodec.decode(data);
    expect(requester).toEqual(requesterDID);
    expect(claimIssuer).toEqual([issuerDID]);
    expect(onChainProof).toHaveLength(132);
    
    expect(await claimManager.hasRole(addressOf(subjectDID), namehash(`${roleName}.${root}`),version)).toBe(true);
  });
}