#!/usr/bin/env node
'use strict';

const start = require('unified-args');
const unified = require('unified');
const markdown = require('remark-parse');

const markdownld = require('../dist/markdownld');
const pkg = require('../package.json');

const name = pkg.name;
const processor = unified().use(markdown).use(markdownld).freeze();

start({
  processor: processor,
  name: name,
  description: pkg.description,
  version: pkg.version,
  pluginPrefix: name,
  extensions: ['.md'],
  packageField: name + 'Config',
  rcName: '.' + name + 'rc',
  ignoreName: '.' + name + 'ignore',
  plugins: ['../dist/xxx'],
});
