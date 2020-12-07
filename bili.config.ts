import { Config } from 'bili';

const config: Config = {
  plugins: {
    typescript2: {
      tsconfigOverride: {
        include: ['src', 'ethers']
      }
    },
  },
  extendConfig: (config) => ({
    ...config,
    externals: []
  }),
  bundleNodeModules: ["nats.ws"],
  input: 'src/iam-client-lib.ts',
  output: {
    format: ['cjs', 'esm'],
    minify: true
  }
};

export default config;
