#!/usr/bin/env node --no-warnings=ExperimentalWarning
"use strict";

import markdown from "remark-parse";
import { unified } from "unified";
import { args } from "unified-args";
import markdownld from "../dist/markdownld.mjs";
import pkg from "../package.json" assert { type: "json" };

const name = pkg.name;
const processor = unified().use(markdown).use(markdownld).freeze();

args({
  processor: processor,
  name: name,
  description: pkg.description,
  version: pkg.version,
  pluginPrefix: name,
  extensions: [".md"],
  packageField: name + "Config",
  rcName: "." + name + "rc",
  ignoreName: "." + name + "ignore",
  plugins: [],
});
