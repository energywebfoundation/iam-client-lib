import { IAM } from "../../src/iam";
import { createIam, rootOwner } from "../iam.test";
import { rpcUrl } from "../setup_contracts";

export const createIdentityProofTests = () => {
    let rootOwnerIam: IAM;

    beforeAll(async () => {
        rootOwnerIam = await createIam(rootOwner.privateKey, { createDocument: true });
    });

    //createIdentityProof Test
    test("Identity token should be defined", async () => {
        const identityToken = await rootOwnerIam.createIdentityProof();
        expect(identityToken).toBeDefined;
    });

    //createIdentityProofWithDelegate
    test("Identity token should be defined for delegate", async () => {
        const ownerAddress = await rootOwner.getAddress();
        const identityProofDid = `did:ethr:${ownerAddress}`;
        const delegateIdentityToken = await rootOwnerIam.createIdentityProofWithDelegate(
            rootOwner.privateKey,
            rpcUrl,
            identityProofDid,
        );
        expect(delegateIdentityToken).toBeDefined;
    });
};
