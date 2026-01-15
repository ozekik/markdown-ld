import { describe, expect, it } from "vitest";
import { readFile } from "node:fs/promises";
import { unified } from "unified";
import remarkParse from "remark-parse";

import markdownLD from "../lib/main.js";

describe("markdownLD compiler", () => {
  it("compiles SPEC.md and preserves prefix declarations", async () => {
    const input = await readFile(
      new URL("../SPEC.md", import.meta.url),
      "utf8"
    );

    const processor = unified().use(remarkParse).use(markdownLD);
    const file = await processor.process(input);
    const output = String(file);

    expect(output).toContain("@prefix rdf:");
    expect(output).toContain("@prefix rdfs:");
    expect(output).toContain("@prefix xsd:");
    expect(output).toContain("@prefix ex:");
  });

  it("compiles examples/foaf.md into turtle with FOAF predicates", async () => {
    const input = await readFile(
      new URL("../examples/foaf.md", import.meta.url),
      "utf8"
    );

    const processor = unified().use(remarkParse).use(markdownLD);
    const file = await processor.process(input);
    const output = String(file);

    expect(output).toContain("@prefix foaf:");
    expect(output).toContain("foaf:knows");
  });
});
