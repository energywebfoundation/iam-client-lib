const nodeResolve = require('@rollup/plugin-node-resolve');
const typescript = require('@rollup/plugin-typescript');

module.exports = [
  {
    input: 'src/index.ts',
    output: [
      {
        dir: 'lib',
        format: 'cjs',
        sourcemap: true,
      },
    ],
    plugins: [
      nodeResolve(),
      typescript({
        compilerOptions: { outDir: 'lib' },
        tsconfig: 'tsconfig.build.json',
      }),
    ],
    external: [/node_modules(?!\/tslib)/],
  },
  {
    input: 'src/index.ts',
    output: [
      {
        dir: 'lib.esm',
        format: 'es',
        sourcemap: true,
      },
    ],
    plugins: [
      nodeResolve(),
      typescript({
        compilerOptions: { outDir: 'lib.esm' },
        tsconfig: 'tsconfig.build.json',
      }),
    ],
    external: [/node_modules(?!\/tslib)/],
  },
];
