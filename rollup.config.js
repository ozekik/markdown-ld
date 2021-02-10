import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import nodePolyfills from 'rollup-plugin-node-polyfills';

import pkg from './package.json';

export default {
  input: 'lib/main.js',
  output: [
    { file: pkg.main, format: 'cjs', exports: 'default' },
    { file: pkg.module, format: 'es' },
  ],
  plugins: [resolve(), commonjs(), json(), nodePolyfills({ url: true })],
};
