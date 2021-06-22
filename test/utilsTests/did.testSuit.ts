import { supportedDIDMethods, parseDID } from '../../src/utils/did';
import { Methods } from '@ew-did-registry/did';

export function didTests() {
  it('Erc1056 method should be supported', () => {
    expect(supportedDIDMethods()).toContain(Methods.Erc1056);
  });

  it("should remove DID from address if present", async () => {
    const didAddress = 'did:ethr:0x395569900f9e60819fd5521a9aC044a1B2a849DC8'
    const address = parseDID(didAddress);
    expect(address).toStrictEqual(didAddress.split(':')[2]);
  });

  it("should not attempt to remove did from address if it is not present", async () => {
    const didAddress = '0x395569900f9e60819fd5521a9aC044a1B2a849DC8'
    const address = parseDID(didAddress);
    expect(address).toStrictEqual(didAddress);
  });
}