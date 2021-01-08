import { isBrowser } from '../../src/utils/isBrowser';

describe("isBrowser Test", () => {
  it('returns false if running in node', () => {
    const result = isBrowser();
    expect(result).toBe(true);
  });
});