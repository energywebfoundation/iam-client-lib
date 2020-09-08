import camelCase from 'lodash.camelcase';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

const pkg = require('./package.json');
const libraryName = 'iam-client-lib';

export default {
    input: `src/${libraryName}.ts`,
    output: [
      { file: pkg.main, name: camelCase(libraryName), format: 'umd', sourcemap: true },
      { file: pkg.module, format: 'es', sourcemap: true },
    ],
    external: [],
    watch: {
        include: 'src/**'
    },
    plugins: [
        json(),
        typescript(),
        commonjs(),
        resolve()
    ]
}