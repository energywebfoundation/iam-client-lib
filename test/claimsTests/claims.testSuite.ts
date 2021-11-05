import { createIdentityTests } from "./createIdentityTests";
import { enrollmentClaimsTests } from "./enrollmentClaimsTests";
import { selfsignedClaimsTests } from "./selfsignedClaimsTests";
import { issueClaimRequestTests } from "./issueClaimRequestTests";
import { roleRequiredFieldsHelperTest } from "./roleRequiredFieldsHelper.testSuite";

export const claimsTests = () => {
    describe("Issue Claim Request tests", issueClaimRequestTests);
    describe("Selfsigned claim tests", selfsignedClaimsTests);
    describe("Enrollment claims tests", enrollmentClaimsTests);
    describe("Create Identity tests", createIdentityTests);
    describe("Required Fields tests", roleRequiredFieldsHelperTest);
};
