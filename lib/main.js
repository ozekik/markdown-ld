import { parse as ttl2jsonld } from "@frogcat/ttl2jsonld";
import { find } from "unist-util-find";
import { findAfter } from "unist-util-find-after";
import { is } from "unist-util-is";
import { visit } from "unist-util-visit";

// import inspect from 'unist-util-inspect';

function parseMdldHeading(tree, headingNode, checkCodeBlock) {
  checkCodeBlock = !!checkCodeBlock;

  const paragraph = findAfter(tree, headingNode, { type: "paragraph" });
  const inlineCode = find(paragraph, { type: "inlineCode" });

  let result = {
    heading: headingNode,
    inlineCode: inlineCode,
    indexEnd: tree.children.indexOf(paragraph),
  };

  if (checkCodeBlock) {
    const start = tree.children.indexOf(paragraph);
    const nextSib = tree.children[start + 1];
    if (is(nextSib, { type: "code" })) {
      result = {
        ...result,
        codeBlock: nextSib,
        indexEnd: tree.children.indexOf(nextSib),
      };
    }
  }

  return result;
}

export default function markdownLD(options) {
  this.Compiler = (tree, file) => {
    // console.log(inspect(tree));

    options = Object.assign({}, this.data("settings"), options);

    let result = "";
    let currentSubjectHeading = null;

    visit(tree, { type: "heading" }, (node) => {
      const heading = node;

      if (heading.depth === 1) {
        const mdldHeading = parseMdldHeading(tree, heading, true);

        if (mdldHeading.codeBlock) {
          result += mdldHeading.codeBlock.value;
          if (!result.endsWith("\n")) {
            result += "\n\n";
          } else if (!result.endsWith("\n\n")) {
            result += "\n";
          }
        }
      } else if (heading.depth === 2) {
        const mdldHeading = parseMdldHeading(tree, heading, true);

        if (mdldHeading.codeBlock) {
          result += mdldHeading.codeBlock.value;
          result += result.endsWith("\n") ? "" : "\n";
        }

        currentSubjectHeading = mdldHeading;
      } else if (heading.depth === 3) {
        const mdldHeading = parseMdldHeading(tree, heading, false);

        const nextSib = tree.children[mdldHeading.indexEnd + 1];
        const objects = [];

        nextSib.children.forEach((listItem) => {
          let paragraph = find(listItem, { type: "paragraph" });
          let lastInlineCode = null;
          paragraph.children.forEach((node) => {
            if (is(node, { type: "inlineCode" })) lastInlineCode = node;
          });
          if (!lastInlineCode) return;
          objects.push(lastInlineCode.value);
        });

        // TODO: Use some RDF store directly rather than construct raw strings
        // if there is an adequate one
        const subj = currentSubjectHeading.inlineCode.value,
          pred = mdldHeading.inlineCode.value;
        const sp = `${subj} ${pred} `;
        const stmt = sp + objects.join(",\n" + " ".repeat(sp.length)) + " .\n";
        result += stmt;
      }
    });

    if (["turtle", "ttl"].includes(options.format)) {
      // Do nothing
    } else if (["trig"].includes(options.format)) {
      // TODOs: There should be sync parser/serializers...
    } else if (["ntriples", "nt"].includes(options.format)) {
    } else if (["nquads", "nq"].includes(options.format)) {
    } else if (["rdf", "rdfxml", "xml", "owl"].includes(options.format)) {
    } else if (["jsonld", "json"].includes(options.format)) {
      result = JSON.stringify(ttl2jsonld(result), null, 2);
    }

    return result;
  };
}
