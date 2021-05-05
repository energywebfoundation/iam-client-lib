import { supportedDIDMethods } from '../../src/utils/did';
import { Methods } from '@ew-did-registry/did';

export function didTests() {
  it('Erc1056 method should be supported', () => {
    expect(supportedDIDMethods()).toContain(Methods.Erc1056);
  });
}
