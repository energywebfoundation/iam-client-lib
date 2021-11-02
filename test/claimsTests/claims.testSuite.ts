import { createIdentityTests } from "./createIdentityTests";
import { enrollmentClaimsTests } from "./enrollmentClaimsTests";
import { selfsignedClaimsTests } from "./selfsignedClaimsTests";
import { issueClaimRequestTests } from "./issueClaimRequestTests";

export const claimsTests = () => {
    describe("Issue Claim Request tests", issueClaimRequestTests);
    describe("Selfsigned claim tests", selfsignedClaimsTests);
    describe("Enrollment claims tests", enrollmentClaimsTests);
    describe("Create Identity tests", createIdentityTests);
};
