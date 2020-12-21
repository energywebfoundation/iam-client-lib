import { isBrowser } from '../../src/utils/isBrowser'

describe("isBrowser Test", () => {
    it('returns false if process release name is node', () => {
        const mockProcess = {
            release: {
                name: 'node'
            }
        };
        const result = isBrowser(mockProcess);
        expect(result).toBeFalsy();
    });

    it('returns false if process release name is io.js', () => {
        const mockProcess = {
            release: {
                name: 'io.js'
            }
        };
        const result = isBrowser(mockProcess);
        expect(result).toBeFalsy();
    });

    it('returns true if process release name is not node', () => {
        const mockProcess = {
            release: {
                name: 'notNode'
            }
        };
        const result = isBrowser(mockProcess);
        expect(result).toBeTruthy();
    });
});