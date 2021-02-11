import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';

import pkg from './package.json';

export default {
  input: 'lib/main.js',
  output: [
    { file: pkg.main, format: 'cjs', exports: 'default' },
    { file: pkg.module, format: 'es' },
  ],
  plugins: [
    replace({
      delimiters: ['', ''],
      // NOTE: Hack for @frogcat/ttl2jsonld
      // TODO: Send PR
      [`var URL = typeof require === 'undefined' ? URL : require("url").URL;`]: '',
    }),
    resolve({
      // browser: true,
      // preferBuiltins: false,
    }),
    commonjs(),
    json(),
  ],
};
