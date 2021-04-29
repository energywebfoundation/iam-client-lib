import { Methods, isValidErc1056 } from '@ew-did-registry/did';

const validators = new Map<Methods, (did: string) => boolean>();

export function supportedDIDMethods(): Methods[] {
  return Array.from(validators.keys());
}

export function isValidDID(did: string): boolean {
  return Array.from(validators.values()).some((v) => v(did));
}

export function addSupportedDID(
  method: Methods,
  validator: (did: string) => boolean
) {
  validators.set(method, validator);
}

addSupportedDID(Methods.Erc1056, isValidErc1056);
