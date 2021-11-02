import { Config } from "bili";

const config: Config = {
    plugins: {
        typescript2: {
            tsconfigOverride: {
                include: ["src", "ethers"],
            },
        },
    },
    extendConfig: (config) => ({
        ...config,
        // The default externals are the package.json dependencies and can only bundle node_modules that are not a dependency.
        // So need to clear out all externals, to bundle nats.ws package.
        externals: [],
    }),
    // nats.ws is bundled because using standard import/require does not work for cjs format.
    // nat.ws only provides a .mjs file which cannot be required.
    // include tslib for clients using older version of tslib
    bundleNodeModules: ["tslib"],
    input: "src/iam-client-lib.ts",
    output: {
        minify: false,
    },
};

export default config;
