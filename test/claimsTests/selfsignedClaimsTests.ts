import { IAM } from "../../src/iam";
import { createIam, rootOwner } from "../iam.test";

export const selfsignedClaimsTests = function () {
  let rootOwnerIam: IAM;

  beforeAll(async () => {
    rootOwnerIam = await createIam(rootOwner.privateKey, { initDID: true });
  });
  
  const namespace = "daniel.iam.ewc";

  test("ens claim can be created", async () => {
    await rootOwnerIam.createSelfSignedClaim({
      data: { claimType: namespace, claimTypeVersion: 1 }
    });
    const { service = [] } = await rootOwnerIam.getDidDocument();
    expect(service.find(({ claimType }) => claimType === namespace)).toBeTruthy();
  });
  test("ens claim should by updated", async () => {
    const { service = [] } = await rootOwnerIam.getDidDocument();
    const { claimType, claimTypeVersion } =
      service.find(({ claimType }) => claimType === namespace) || {};
    await rootOwnerIam.createSelfSignedClaim({ data: { claimType, claimTypeVersion } });
    const { service: newServices = [] } = await rootOwnerIam.getDidDocument();
    expect(
      newServices.find(
        claim => claim.claimType === claimType && claim.claimTypeVersion === claimTypeVersion
      )
    ).toBeTruthy();
    expect(newServices.length).toBe(1);
  });
  test("ens claim should be created when claimType do not match", async () => {
    const { service = [] } = await rootOwnerIam.getDidDocument();
    const { claimTypeVersion } = service.find(({ claimType }) => claimType === namespace) || {};
    await rootOwnerIam.createSelfSignedClaim({
      data: { claimType: "edvin.iam.ewc", claimTypeVersion }
    });
    const { service: newServices = [] } = await rootOwnerIam.getDidDocument();
    expect(
      newServices.find(
        claim => claim.claimType === "edvin.iam.ewc" && claim.claimTypeVersion === claimTypeVersion
      )
    ).toBeTruthy();
    expect(newServices.length).toBe(2);
  });
  test("ens claim should be created when claimTypeVersion do not match", async () => {
    await rootOwnerIam.createSelfSignedClaim({
      data: { claimType: namespace, claimTypeVersion: 2 }
    });
    const { service: newServices = [] } = await rootOwnerIam.getDidDocument();
    expect(
      newServices.find(claim => claim.claimType === namespace && claim.claimTypeVersion === 2)
    ).toBeTruthy();
    expect(newServices.length).toBe(3);
  });
  test("ens claim should not be created", async () => {
    await rootOwnerIam.createSelfSignedClaim({
      data: { claimType: namespace, claimTypeVersion: 2 }
    });
    const { service: newServices = [] } = await rootOwnerIam.getDidDocument();
    expect(newServices.length).toBe(3);
  });

  test("profile claim should be created", async () => {
    await rootOwnerIam.createSelfSignedClaim({
      data: { profile: { name: "Edwin" } }
    });
    const { service = [] } = await rootOwnerIam.getDidDocument();
    expect(service.find(claim => claim.profile && claim.profile.name === "Edwin")).toBeTruthy();
  });
  test("profile claim should be updated", async () => {
    const { service = [] } = await rootOwnerIam.getDidDocument();
    const { id } = service.find(({ profile }) => Boolean(profile)) || {};
    await rootOwnerIam.createSelfSignedClaim({ data: { profile: { name: "Dan" } } });
    const { service: updatedService = [] } = await rootOwnerIam.getDidDocument();
    const { profile } = updatedService.find(({ id: claimId }) => id === claimId) || {};
    expect(profile?.name).toBe("Dan");
    expect(updatedService.length).toBe(4);
  });
}