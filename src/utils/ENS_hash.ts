// eslint-disable-next-line @typescript-eslint/no-var-requires
const sha3 = require("js-sha3").keccak_256;
import { normalize } from "eth-ens-namehash";

export function decodeLabelhash(hash: string) {
    if (!(hash.startsWith("[") && hash.endsWith("]"))) {
        throw Error("Expected encoded labelhash to start and end with square brackets");
    }

    if (hash.length !== 66) {
        throw Error("Expected encoded labelhash to have a length of 66");
    }

    return `${hash.slice(1, -1)}`;
}

export function isEncodedLabelhash(hash: string) {
    return hash.startsWith("[") && hash.endsWith("]") && hash.length === 66;
}

export function namehash(inputName: string) {
    let node = "";
    for (let i = 0; i < 32; i++) {
        node += "00";
    }

    if (inputName) {
        const labels = inputName.split(".");

        for (let i = labels.length - 1; i >= 0; i--) {
            let labelSha;
            if (isEncodedLabelhash(labels[i])) {
                labelSha = decodeLabelhash(labels[i]);
            } else {
                const normalizedLabel = normalize(labels[i]);
                labelSha = sha3(normalizedLabel);
            }
            node = sha3(Buffer.from(node + labelSha, "hex"));
        }
    }

    return "0x" + node;
}

export function labelhash(unnormalizedLabelOrLabelhash: string) {
    return isEncodedLabelhash(unnormalizedLabelOrLabelhash)
        ? "0x" + decodeLabelhash(unnormalizedLabelOrLabelhash)
        : "0x" + sha3(normalize(unnormalizedLabelOrLabelhash));
}
