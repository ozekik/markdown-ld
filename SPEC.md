# Markdown-LD

`<https://github.com/ozekik/markdown-ld/blob/master/SPEC.md>`

```
@base <https://github.com/ozekik/markdown-ld/blob/master/SPEC.md> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
@prefix ex: <http://example.com/> .
```

A Markdown-LD document MUST have a level-1 heading which represents the name of the graph described under the heading.

Level-1, level-2, and level-3 headings MUST be immediately followed by a line of inline code for its RDF term in Turtle syntax.

A pair of a heading and a line of inline code is called *Markdown-LD heading*.

A level-1 Markdown-LD heading MAY be immediately followed by a code block for  `@base` and `@prefix` directives and other implicit RDF triples in Turtle syntax.

Until the next heading, Markdown texts after the code block are treated as comments.

#### TODO

- Incorporate TriG for multiple level-1 headings and graphs

## Example Entity Foo

`<#example-entity-foo>`

```
<#example-entity-foo> rdf:type rdfs:Resource .
```

The subject of an RDF triple is represented by a level-2 Markdown-LD heading.

A level-2 Markdown-LD heading MAY be immediately followed by a code block for implicit RDF triples in Turtle syntax.

Until the next heading, Markdown texts after the code block are treated as comments.

### Example Predicate 1

`<#example-predicate-1>`

- `"Some literal"`
- Some literal `"Some literal"@en`
- `42`
- Forty-two `"42"^^xsd:integer`
- Some entity `<http://example.com/someEntity>`
- Some entity `ex:someEntity`
- [Example Entity Bar](#example-entity-bar) (hyperlinks would be helpful) `<#example-entity-bar>`
- Some blank node `[ ex:name "Alice" ]`

The predicate of an RDF triple is represented by a level-3 Markdown-LD heading.

A level-3 Markdown-LD heading MUST be immediately followed by a list of one or more items, each of which represents the object of an RDF triple.

Every item of the list MUST be the form of:

- (optional Markdown comment) `(RDF term as inline code)`

Until the next heading, Markdown texts after the list are treated as comments.

#### TODO

- Consider allowing code blocks as well as inline codes in list items.
- Support [RDF*](https://w3c.github.io/rdf-star/) by nested lists.

## Example Entity Bar

`<#example-entity-bar>`

This is an example of a much simpler single triple.

### Example Predicate 1

`<#example-predicate-1>`

- `"Some literal"`

### Example Predicate 2

`<#example-predicate-2>`

- Some entity `<http://example.com/someEntity>`
