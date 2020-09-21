import { Config } from 'bili';

const config: Config = {
  plugins: {
    typescript2: {
      tsconfigOverride: {
        include: ['src', 'ethers']
      }
    }
  },

  input: 'src/iam-client-lib.ts',
  output: {
    format: ['cjs', 'esm']
  }
};

export default config;
