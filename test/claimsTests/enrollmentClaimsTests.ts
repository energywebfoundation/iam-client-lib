import { Methods } from "@ew-did-registry/did";
import { addressOf } from "@ew-did-registry/did-ethr-resolver";
import { Wallet } from "ethers";
import { utils } from "ethers";
import { JSONCodec } from "nats.ws";
import { IAM, RegistrationTypes } from "../../src/iam";
import { IRoleDefinition, NATS_EXCHANGE_TOPIC } from "../../src/iam-client-lib";
import { createIam, root, rootOwner } from "../iam.test";
import { claimManager } from "../setup_contracts";

const { namehash } = utils;

export function enrollmentClaimsTests() {
  const staticIissuer = Wallet.createRandom();
  const staticIssuerDID = `did:${Methods.Erc1056}:${staticIissuer.address}`;
  const dynamicIssuer = Wallet.createRandom();
  const dynamicIssuerDID = `did:${Methods.Erc1056}:${dynamicIssuer.address}`;
  const roleCreator = new Wallet(rootOwner.privateKey); // owns root
  const roleCreatorDID = `did:${Methods.Erc1056}:${roleCreator.address}`;
  const subject = roleCreator;
  const subjectDID = `did:${Methods.Erc1056}:${subject.address}`;
  const roleName1 = "myrole1";
  const roleName2 = "myrole2";
  const namespace = root;
  const version = 1;
  const roleDefinition1: IRoleDefinition = {
    roleName: roleName1,
    roleType: "org",
    fields: [],
    enrolmentPreconditions: [],
    issuer: { issuerType: "DID", did: [staticIssuerDID] },
    version,
    metadata: {}
  };
  const roleDefinition2: IRoleDefinition = {
    ...roleDefinition1,
    issuer: { issuerType: "ROLE", roleName: `${roleName1}.${root}` }
  };
  const registrationTypes = [RegistrationTypes.OffChain, RegistrationTypes.OnChain];
  const jsonCodec = JSONCodec();
  let roleCreatorIam: IAM;
  let subjectIam: IAM;
  let staticIssuerIam: IAM;
  let dynamicIssuerIam: IAM;
  let publish: jest.Mock;
  let getDidDocument: jest.Mock;
  let getRoleDefinition: jest.Mock;
  let _natsConnection;
  let _cacheClient;
  let _jsonCodec;

  beforeAll(async () => {
    roleCreatorIam = await createIam(roleCreator.privateKey);
    subjectIam = await createIam(subject.privateKey);
    staticIssuerIam = await createIam(staticIissuer.privateKey);
    dynamicIssuerIam = await createIam(dynamicIssuer.privateKey);

    await roleCreatorIam.createRole({
      roleName: roleName1,
      namespace,
      data: roleDefinition1,
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
      switch (namespace) {
        case `${roleName1}.${root}`:
          return roleDefinition1;
        case `${roleName2}.${root}`:
          return roleDefinition2;
        default:
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

  test("enrollment by issuer of type DID", async () => {
    await subjectIam.createClaimRequest({
      claim: { claimType: `${roleName1}.${root}`, claimTypeVersion: version, fields: [] },
      registrationTypes,
      subject: subjectDID
    });
    expect(publish).toBeCalledTimes(1);
    const [, encodedMsg] = publish.mock.calls.pop();
    const message = jsonCodec.decode(encodedMsg);

    expect(message).toHaveProperty("id");
    expect(message).toHaveProperty("token");
    expect(message).toMatchObject({ requester: subjectDID, registrationTypes });

    const { id, subjectAgreement, token } = message;
    await staticIssuerIam.issueClaimRequest({
      id,
      registrationTypes,
      requester: roleCreatorDID,
      subjectAgreement,
      token
    });

    const [requesterChannel, data] = publish.mock.calls.pop();
    expect(requesterChannel).toEqual(`${subjectDID}.${NATS_EXCHANGE_TOPIC}`);

    const { claimIssuer, requester, onChainProof } = jsonCodec.decode(data);
    expect(requester).toEqual(roleCreatorDID);
    expect(claimIssuer).toEqual([staticIssuerDID]);
    expect(onChainProof).toHaveLength(132);

    expect(await claimManager.hasRole(addressOf(subjectDID), namehash(`${roleName1}.${root}`), version)).toBe(true);
  });

  test("enrollment by issuer of type ROLE", async () => {
    await roleCreatorIam.createRole({
      roleName: roleName2,
      namespace,
      data: roleDefinition2,
      returnSteps: false
    });

    await dynamicIssuerIam.createClaimRequest({
      claim: { claimType: `${roleName1}.${root}`, claimTypeVersion: version, fields: [] },
      registrationTypes,
      subject: dynamicIssuerDID
    });
    let [, encodedMsg] = publish.mock.calls.pop();
    let message = jsonCodec.decode(encodedMsg);
    let { subjectAgreement, token, id } = message;
    await staticIssuerIam.issueClaimRequest({ id, requester: dynamicIssuerDID, token, registrationTypes, subjectAgreement });

    expect(await claimManager.hasRole(addressOf(dynamicIssuerDID), namehash(`${roleName1}.${root}`), version));

    await subjectIam.createClaimRequest({
      subject: subjectDID,
      claim: { claimType: `${roleName2}.${root}`, claimTypeVersion: version, fields: [] },
      registrationTypes
    });
    ([, encodedMsg] = publish.mock.calls.pop());
    message = jsonCodec.decode(encodedMsg);
    ({ subjectAgreement, token, id } = message);
    await dynamicIssuerIam.issueClaimRequest({ id, requester: subjectDID, token, registrationTypes, subjectAgreement });

    expect(await claimManager.hasRole(addressOf(subjectDID), namehash(`${roleName2}.${root}`), version));
  });
}