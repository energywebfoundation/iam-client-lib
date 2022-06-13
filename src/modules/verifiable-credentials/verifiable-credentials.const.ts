// JSON Web Key (https://datatracker.ietf.org/doc/html/rfc7517) for ethereum keys
export const KEY_TYPE = {
  kty: 'EC',
  crv: 'secp256k1',
  alg: 'ES256K-R',
  key_ops: ['signTypedData'],
};
