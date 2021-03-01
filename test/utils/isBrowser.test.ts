import { isBrowser } from '../../src/utils/isBrowser';

describe("isBrowser Test", () => {
  it('tests are running in node env', () => {
    expect(isBrowser()).toBe(false);
  });
});