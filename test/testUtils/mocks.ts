import { IRoleDefinition } from "@energyweb/iam-contracts";
import { JSONCodec } from "nats.ws";
import { IAM } from "../../src/iam";

let _natsConnection;
export const mockNats = () => {
  ({ _natsConnection } = Reflect.get(IAM, "prototype"));
  const mockedNatsConnection = {
    publish: jest.fn().mockImplementation()
  };
  Reflect.set(IAM.prototype, "_natsConnection", mockedNatsConnection);
  return mockedNatsConnection;
};
export const restoreNats = () => {
  Reflect.set(IAM.prototype, "_natsConnection", _natsConnection);
};

let _cacheClient;
export const mockCacheClient = (roles: Record<string, IRoleDefinition>) => {
  ({ _cacheClient } = Reflect.get(IAM.prototype, "prototype"));
  const mockedCachedClient = {
    getRoleDefinition: jest.fn().mockImplementation(({ namespace }: { namespace: string }) => {
      return roles[namespace];
    }),
    getDidDocument: jest.fn().mockImplementation(() => {
      return { service: {} };
    })
  };
  Reflect.set(IAM.prototype, "_cacheClient", mockedCachedClient);
  return mockedCachedClient;
};
export const restoreCacheClient = () => {
  Reflect.set(IAM.prototype, "_cacheClient", _cacheClient);
};

let _jsonCodec;
export const mockJsonCodec = () => {
  ({ _jsonCodec } = Reflect.get(IAM, "prototype"));
  const jsonCodec = JSONCodec();
  Reflect.set(IAM.prototype, "_jsonCodec", jsonCodec);
  return jsonCodec;
};
export const restoreJsonCodec = () => {
  Reflect.set(IAM.prototype, "_jsonCodec", _jsonCodec);
}
