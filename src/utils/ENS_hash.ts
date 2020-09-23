// eslint-disable-next-line @typescript-eslint/no-var-requires
const sha3 = require('js-sha3').keccak_256;
import { normalize } from 'eth-ens-namehash';

export function encodeLabelhash(hash) {
  if (!hash.startsWith('0x')) {
    throw new Error('Expected label hash to start with 0x');
  }

  if (hash.length !== 66) {
    throw new Error('Expected label hash to have a length of 66');
  }

  return `[${hash.slice(2)}]`;
}

export function decodeLabelhash(hash) {
  if (!(hash.startsWith('[') && hash.endsWith(']'))) {
    throw Error(
      'Expected encoded labelhash to start and end with square brackets'
    );
  }

  if (hash.length !== 66) {
    throw Error('Expected encoded labelhash to have a length of 66');
  }

  return `${hash.slice(1, -1)}`;
}

export function isEncodedLabelhash(hash) {
  return hash.startsWith('[') && hash.endsWith(']') && hash.length === 66;
}

export function namehash(inputName) {
  let node = '';
  for (let i = 0; i < 32; i++) {
    node += '00';
  }

  if (inputName) {
    const labels = inputName.split('.');

    for (let i = labels.length - 1; i >= 0; i--) {
      let labelSha;
      if (isEncodedLabelhash(labels[i])) {
        labelSha = decodeLabelhash(labels[i]);
      } else {
        const normalisedLabel = normalize(labels[i]);
        labelSha = sha3(normalisedLabel);
      }
      node = sha3(new Buffer(node + labelSha, 'hex'));
    }
  }

  return '0x' + node;
}

export function labelhash(unnormalisedLabelOrLabelhash) {
  return isEncodedLabelhash(unnormalisedLabelOrLabelhash)
    ? '0x' + decodeLabelhash(unnormalisedLabelOrLabelhash)
    : '0x' + sha3(normalize(unnormalisedLabelOrLabelhash));
}
