import { buildRegex } from "../../src/utils/regex_builder";

export function regexTests() {
    it("regex builder should correctly interpret flags", () => {
        const regex = buildRegex("/^[A-Z]{3}$/i") as RegExp;
        expect(regex.test("abc")).toBe(true);
        expect(regex.test("abcd")).toBe(false);
    });

    it("regex builder should correctly interpret simple regex without slashes", () => {
        const regex = buildRegex("[A-Z]{3}") as RegExp;
        expect(regex.test("ABC")).toBe(true);
        expect(regex.test("abc")).toBe(false);
    });
}
