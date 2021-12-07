import { utils } from "ethers";

/**
 * Validate that address is valid ethereum address.
 * Expect that error is thrown if not
 * Uses ethers function but encapsulates to be able to swap in the future:
 * https://docs.ethers.io/v5/api/utils/address/#utils-getAddress
 * @param address address to verify
 */
export function validateAddress(address: string) {
    utils.getAddress(address);
}
