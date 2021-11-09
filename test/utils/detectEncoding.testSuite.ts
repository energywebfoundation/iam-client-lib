import { Encoding } from "@ew-did-registry/did-resolver-interface";
import { detectEncoding } from "../../src/utils/detectPublicKeyEncoding";

export function detectEncodingTests() {
    describe("Detect encoding util tests", () => {
        it("Should correctly recognize PEM format", () => {
            const pemCertificate =
                "-----BEGIN CERTIFICATE-----" +
                "MIIEaTCCA1GgAwIBAgILBAAAAAABRE7wQkcwDQYJKoZIhvcNAQELBQAwVzELMAkG" +
                "C33JiJ1Pi/D4nGyMVTXbv/Kz6vvjVudKRtkTIso21ZvBqOOWQ5PyDLzm+ebomchj" +
                "SHh/VzZpGhkdWtHUfcKc1H/hgBKueuqI6lfYygoKOhJJomIZeg0k9zfrtHOSewUj" +
                "dHBzOi8vd3d3Lmdsb2JhbHNpZ24uY29tL3JlcG9zaXRvcnkvMDMGA1UdHwQsMCow" +
                "KKAmoCSGImh0dHA6Ly9jcmwuZ2xvYmFsc2lnbi5uZXQvcm9vdC5jcmwwPQYIKwYB" +
                "K1pp74P1S8SqtCr4fKGxhZSM9AyHDPSsQPhZSZg=" +
                "-----END CERTIFICATE-----";

            expect(detectEncoding(pemCertificate)).toBe(Encoding.PEM);
        });

        it("Should correctly recognize BASE64 format", () => {
            const base64Certificate =
                "MIIEaTCCA1GgAwIBAgILBAAAAAABRE7wQkcwDQYJKoZIhvcNAQELBQAwVzELMAkGC3" +
                "3JiJ1Pi/D4nGyMVTXbv/Kz6vvjVudKRtkTIso21ZvBqOOWQ5PyDLzm+ebomchjSHh/" +
                "VzZpGhkdWtHUfcKc1H/hgBKueuqI6lfYygoKOhJJomIZeg0k9zfrtHOSewUjdHBzOi" +
                "8vd3d3Lmdsb2JhbHNpZ24uY29tL3JlcG9zaXRvcnkvMDMGA1UdHwQsMCowKKAmoCSG" +
                "Imh0dHA6Ly9jcmwuZ2xvYmFsc2lnbi5uZXQvcm9vdC5jcmwwPQYIKwYBK1pp74P1S8SqtCr4fKGxhZSM9AyHDPSsQPhZSZg=";

            expect(detectEncoding(base64Certificate)).toBe(Encoding.BASE64);
        });

        it("Should correctly recognize HEX format", () => {
            const hexCertificate =
                "0x0479BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8";
            expect(detectEncoding(hexCertificate)).toBe(Encoding.HEX);
        });
    });
}
