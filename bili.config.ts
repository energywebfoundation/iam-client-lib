import { Config } from "bili";

const config: Config = {
    plugins: {
        typescript2: {
            tsconfigOverride: {
                include: ["src", "ethers"],
            },
        },
    },
    // include tslib for clients using older version of tslib
    bundleNodeModules: ["tslib"],
    input: "src/index.ts",
    output: {
        format: ["cjs", "esm"],
        minify: false,
    },
};

export default config;
