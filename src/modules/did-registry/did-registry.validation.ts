import {
  DIDAttribute,
  Encoding,
  PubKeyType,
} from '@ew-did-registry/did-resolver-interface';
import { KeyType } from '@ew-did-registry/keys';
import { createCheckers, iface, enumtype, opt } from 'ts-interface-checker';

const IS_REQ_STRING = 'string';
export const { UpdateServicePoint, UpdateDelegate, UpdatePublicKey } =
  createCheckers({
    UpdateServicePoint: iface([], {
      did: IS_REQ_STRING,
      didAttribute: enumtype({ ServicePoint: DIDAttribute.ServicePoint }),
      data: iface([], {
        type: enumtype({ ServicePoint: DIDAttribute.ServicePoint }),
        value: iface([], {
          id: IS_REQ_STRING,
          hash: IS_REQ_STRING,
          hashAlg: IS_REQ_STRING,
        }),
      }),
    }),

    UpdateDelegate: iface([], {
      did: IS_REQ_STRING,
      didAttribute: enumtype({ Authenticate: DIDAttribute.Authenticate }),
      data: iface([], {
        type: enumtype(PubKeyType),
        value: iface([], {
          id: IS_REQ_STRING,
          hash: IS_REQ_STRING,
          hashAlg: IS_REQ_STRING,
        }),
        delegate: IS_REQ_STRING,
      }),
    }),

    UpdatePublicKey: iface([], {
      did: IS_REQ_STRING,
      didAttribute: enumtype({ PublicKey: DIDAttribute.PublicKey }),
      data: iface([], {
        type: enumtype(PubKeyType),
        algo: opt(enumtype(KeyType)),
        encoding: opt(enumtype(Encoding)),
        value: iface([], {
          publicKey: IS_REQ_STRING,
          tag: IS_REQ_STRING,
        }),
      }),
    }),
  });
