import { Encoding } from "@ew-did-registry/did-resolver-interface";

export const detectEncoding = (publicKey: string): Encoding | undefined => {
    if (publicKey.match(/^0x[\da-f]+$/i)) return Encoding.HEX;
    if (publicKey.match(/^-+BEGIN CERTIFICATE-+.*?-+END CERTIFICATE-+$/)) return Encoding.PEM;
    if (publicKey.match(/^[a-zA-Z0-9+/]+={0,2}$/i)) return Encoding.BASE64;
    return undefined;
};
