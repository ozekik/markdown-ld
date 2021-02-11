# Markdown-LD

[![npm](https://img.shields.io/npm/v/markdownld)](https://www.npmjs.com/package/markdownld)

Markdown-LD is a simple syntax for humans to write RDF Linked Data in Markdown.
It is a kind of [literate programming](https://en.wikipedia.org/wiki/Literate_programming) for Turtle/TriG, and useful to publish and maintain linked data along with documentation.

## Playground

Try it online! <https://ozekik.github.io/markdown-ld/>

## Specification and Examples

See [SPEC.md](SPEC.md), which is compiled into [SPEC.ttl](SPEC.ttl) (Turtle) and [SPEC.json](SPEC.json) (JSON-LD).

For a more realistic example from the FOAF (Friend of a Friend) Vocabulary, see [examples/foaf.md](examples/foaf.md), [examples/foaf.ttl](examples/foaf.ttl) (Turtle), and [examples/foaf.json](examples/foaf.json) (JSON-LD).

## Markdown-LD Compiler

A referential compiler to Turtle and other RDF formats is implemented as a [unified](https://github.com/unifiedjs/unified)/[remark](https://github.com/remarkjs/remark) plugin and CLI.

Currently Turtle (default) and JSON-LD (with [@frogcat/ttl2jsonld](https://github.com/frogcat/ttl2jsonld)) are built-in formats for the output.
You can supply a Turtle output to [N3.js](https://github.com/rdfjs/N3.js), [graphy.js](https://github.com/blake-regalia/graphy.js), and other libraries to translate it to other formats.

### CLI

Installation:

```sh
npm install -g markdownld
```

Usage:

```sh
markdownld input.md -o output.ttl
markdownld input.md -o output.json --setting 'format: "jsonld"'
```

For more information, see [unifiedjs/unified-args](https://github.com/unifiedjs/unified-args), on which Markdown-LD CLI is built.

### Module

Installation:

```sh
npm install markdownld --save
```

Usage:

```js
const unified = require('unified');
const markdown = require('remark-parse');
const markdownld = require('markdownld');

const input =
  '# Example\n\n`<http://example.com/>`\n\n' +
  '## Alice\n\n`<#Alice>`\n\n' +
  '### Knows\n\n`foaf:knows`\n\n' +
  '* Bob `<#Bob>`\n';

const processor = unified().use(markdown).use(markdownld);

processor.process(input, (err, { contents }) => {
  console.log(contents);  // <#Alice> foaf:knows <#Bob> .
});
```

## Todo

- [x] Publish playground
- [ ] Make TriG default
- [ ] Do input validation for better exception messages
- [ ] Support compilation to more RDF formats
