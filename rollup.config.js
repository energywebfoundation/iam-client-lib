const nodeResolve = require('@rollup/plugin-node-resolve');
const typescript = require('@rollup/plugin-typescript');

module.exports = [
  {
    input: 'src/index.ts',
    output: [
      {
        dir: 'dist/lib',
        format: 'cjs',
        sourcemap: true,
      },
    ],
    plugins: [
      nodeResolve(),
      typescript({ compilerOptions: { outDir: 'dist/lib' } }),
    ],
    external: [/node_modules/],
  },
  {
    input: 'src/index.ts',
    output: [
      {
        dir: 'dist/lib.esm',
        format: 'es',
        sourcemap: true,
      },
    ],
    plugins: [
      nodeResolve(),
      typescript({ compilerOptions: { outDir: 'dist/lib.esm' } }),
    ],
    external: [/node_modules/],
  },
];
