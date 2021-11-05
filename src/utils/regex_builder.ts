import { ERROR_MESSAGES } from "../errors";

/**
 * buildRegex
 *
 * @description turns string in format '/abc/f' into RegExp object
 * @returns RegExp if vaid pattern , null if no pattern, throws Error on wrong format
 *
 */
export function buildRegex(pattern?: string): RegExp | null {
    if (!pattern) return null;
    try {
        const parts = pattern.split("/"),
            regex = parts.length === 3 ? parts[1] : parts[0],
            options = parts.length === 3 ? parts[2] : "";
        return new RegExp(regex, options);
    } catch (e) {
        throw new Error(ERROR_MESSAGES.ROLE_REQUIRED_PARAM_PATTERN_NOT_VALID_REGEX);
    }
}
