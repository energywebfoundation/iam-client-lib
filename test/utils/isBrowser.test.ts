import { isBrowser } from '../../src/utils/isBrowser';

describe("isBrowser Test", () => {
  it('returns true if running in browser', () => {
    const result = isBrowser();
    expect(result).toBe(true);
  });
});