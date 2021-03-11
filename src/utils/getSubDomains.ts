import { EventFilter, utils, providers } from "ethers";
import { EnsRegistry } from "../../ethers/EnsRegistry";
import { PublicResolver } from "../../ethers/PublicResolver";
import { abi as ensResolverContract } from "@ensdomains/resolver/build/contracts/PublicResolver.json";
import { abi as ensRegistryContract } from "@ensdomains/resolver/build/contracts/ENS.json";

import { namehash } from "./ENS_hash";
import { emptyAddress } from "./constants";

const getDomainsFromLogs = async ({
  provider,
  parser,
  event,
  contractInterface
}: {
  provider: providers.Provider;
  parser: (log: { node: any; label: any; owner: any }) => Promise<string>;
  event: EventFilter;
  contractInterface: utils.Interface;
}) => {
  const filter = {
    fromBlock: 0,
    toBlock: "latest",
    address: event.address,
    topics: event.topics || []
  };
  const logs = await provider.getLogs(filter);
  const rawLogs = logs.map(log => {
    const parsedLog = contractInterface.parseLog(log);
    return parsedLog.values;
  });
  const domains = await Promise.all(rawLogs.map(parser));
  const uniqDomains = [...new Set(domains)];
  return uniqDomains.filter(Boolean);
};

export const getSubdomains = ({
  domain,
  ensResolver,
  ensRegistry,
  mode
}: {
  domain: string;
  ensResolver: PublicResolver;
  ensRegistry: EnsRegistry;
  mode: "ALL" | "FIRSTLEVEL";
}) => {
  if (!domain) throw new Error("You need to pass a domain name");
  if (!ensRegistry) throw new Error("You need to pass an ensRegistry ethers contract");
  if (!ensResolver) throw new Error("You need to pass an ensResolver ethers contract");

  if (mode === "ALL") {
    return getDomainsFromLogs({
      parser: async ({ node }) => {
        const name = await ensResolver.name(node);
        if (name.endsWith(domain)) {
          const owner = await ensRegistry.owner(node);
          if (owner === emptyAddress) return "";
          return name;
        }
        return "";
      },
      provider: ensResolver.provider,
      event: ensResolver.filters.TextChanged(null, "metadata", null),
      contractInterface: new utils.Interface(ensResolverContract)
    });
  }
  return getDomainsFromLogs({
    contractInterface: new utils.Interface(ensRegistryContract),
    event: ensRegistry.filters.NewOwner(namehash(domain), null, null),
    parser: async ({ node, label, owner }) => {
      if (owner === emptyAddress) return "";
      const namehash = utils.keccak256(node + label.slice(2));
      const [name, ownerAddress] = await Promise.all([
        ensResolver.name(namehash),
        ensRegistry.owner(namehash)
      ]);
      if (ownerAddress === emptyAddress) return "";
      return name;
    },
    provider: ensRegistry.provider
  });
};
