import { enrollmentClaimsTests } from "./enrollmentClaimsTests";
import { selfsignedClaimsTests } from "./selfsignedClaimsTests";

export const claimsTests = () => {
    describe("Selfsigned claim tests", selfsignedClaimsTests);
    describe("Enrollment claims tests", enrollmentClaimsTests);
};
