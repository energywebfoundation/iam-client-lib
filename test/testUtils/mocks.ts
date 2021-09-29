import { IRoleDefinition } from "@energyweb/iam-contracts";
import { JSONCodec } from "../../node_modules/nats.ws/lib/src/mod.js";
import { Claim } from "../../src/cacheServerClient/cacheServerClient.types";
import { IAM } from "../../src/iam";

let _natsConnection;
export const mockNats = () => {
    ({ _natsConnection } = Reflect.get(IAM, "prototype"));
    const mockedNatsConnection = {
        publish: jest.fn().mockImplementation(),
    };
    Reflect.set(IAM.prototype, "_natsConnection", mockedNatsConnection);
    return mockedNatsConnection;
};
export const restoreNats = () => {
    Reflect.set(IAM.prototype, "_natsConnection", _natsConnection);
};

let _cacheClient;
export const mockCacheClient = () => {
    ({ _cacheClient } = Reflect.get(IAM, "prototype"));
    const cachedRoleDefinitions: Record<string, IRoleDefinition> = {};
    const cachedClaims: Record<string, Claim[]> = {};

    const cacheRoleDefinitions = (defs: Record<string, IRoleDefinition>) => {
        Object.assign(cachedRoleDefinitions, defs);
    };
    const cacheClaim = (did: string, claim: Claim) => {
        const claims = cachedClaims[did] || [];
        cachedClaims[did] = [...claims, claim];
    };

    const mockedCachedClient = {
        getRoleDefinition: jest.fn(({ namespace }: { namespace: string }) => cachedRoleDefinitions[namespace]),
        getClaimsBySubject: jest.fn(({ did, isAccepted }: { did: string; isAccepted?: boolean }) => {
            const claims = cachedClaims[did];
            return claims ? claims.filter((c) => c.isAccepted === isAccepted) : [];
        }),
        getAssetById: jest.fn().mockImplementation(() => {
            return {};
        }),
    };
    Reflect.set(IAM.prototype, "_cacheClient", mockedCachedClient);
    return { cacheRoleDefinitions, cacheClaim };
};
export const restoreCacheClient = () => {
    Reflect.set(IAM.prototype, "_cacheClient", _cacheClient);
};

let _jsonCodec;
export const mockJsonCodec = <T = any>() => {
    ({ _jsonCodec } = Reflect.get(IAM, "prototype"));
    const jsonCodec = JSONCodec<T>();
    Reflect.set(IAM.prototype, "_jsonCodec", jsonCodec);
    return jsonCodec;
};
export const restoreJsonCodec = () => {
    Reflect.set(IAM.prototype, "_jsonCodec", _jsonCodec);
};
let _ipfsStore;
export const mockIpfs = () => {
    ({ _ipfsStore } = Reflect.get(IAM, "prototype"));
    Reflect.set(IAM.prototype, "_ipfsStore", { save: (token: string) => Promise.resolve(token) });
};
export const restoreIpfs = () => {
    Reflect.set(IAM.prototype, "_ipfsStore", _ipfsStore);
};
