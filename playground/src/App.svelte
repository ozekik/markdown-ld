<script>
  import { unified } from "unified";
  import remarkParse from "remark-parse";
  import remarkRehype from "remark-rehype";
  import rehypeStringify from "rehype-stringify";

  import markdownLD from "../../lib/main.js";
  import example from "../../examples/foaf.md?raw";

  const formats = [
    { value: "html", label: "HTML" },
    { value: "turtle", label: "Turtle" },
    { value: "jsonld", label: "JSON-LD" },
  ];

  let format = "html";
  let input = example || "";
  let compiled = "";
  let error = "";

  $: {
    try {
      error = "";
      compiled =
        format === "html"
          ? String(
              unified()
                .use(remarkParse)
                .use(remarkRehype)
                .use(rehypeStringify)
                .processSync(input)
            )
          : String(
              unified()
                .use(remarkParse)
                .use({ settings: { format } })
                .use(markdownLD)
                .processSync(input)
            );
    } catch (err) {
      console.error(err);
      error = err instanceof Error ? err.message : "Invalid Markdown-LD";
      compiled = "";
    }
  }
</script>

<main class="playground">
  <header class="toolbar">
    <h1>Markdown-LD Playground</h1>
    <a
      class="github-link"
      href="https://github.com/ozekik/markdown-ld"
      target="_blank"
      rel="noreferrer"
      aria-label="View markdown-ld on GitHub"
    >
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <path
          d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
          0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13
          -.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87
          2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95
          0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21
          2.2.82A7.65 7.65 0 0 1 8 3.86c.68 0 1.36.09 2 .27 1.53-1.04
          2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82
          2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54
          1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01
          8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"
        />
      </svg>
    </a>
  </header>

  <section class="workspace" aria-label="Markdown-LD editor and output">
    <label class="pane">
      <div class="pane-header">
        <span class="pane-title">Markdown-LD</span>
      </div>
      <textarea spellcheck="false" bind:value={input}></textarea>
    </label>

    <section class="pane">
      <div class="pane-header">
        <span class="pane-title">Output</span>
        <div
          class="format-switcher"
          role="radiogroup"
          aria-label="Output format"
        >
          {#each formats as option}
            <label>
              <input type="radio" bind:group={format} value={option.value} />
              <span>{option.label}</span>
            </label>
          {/each}
        </div>
      </div>
      <div class="output" class:error={!!error}>
        {#if error}
          <pre>{error}</pre>
        {:else if format === "html"}
          <div class="markdown-body">
            {@html compiled}
          </div>
        {:else}
          <pre>{compiled}</pre>
        {/if}
      </div>
    </section>
  </section>
</main>

<style>
  .playground {
    display: flex;
    flex-direction: column;
    gap: 16px;
    height: 100vh;
    overflow: hidden;
    padding: 24px;
    background: #fff;
  }

  .toolbar {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .github-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 6px;
    color: #24292f;
    text-decoration: none;
  }

  .github-link:hover,
  .github-link:focus-visible {
    background: #f2f4f7;
    color: #0969da;
  }

  .github-link svg {
    width: 20px;
    height: 20px;
    fill: currentColor;
  }

  h1 {
    margin: 0;
  }

  h1 {
    font-size: 1.35rem;
    line-height: 1.2;
  }

  .format-switcher {
    display: inline-flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  .format-switcher label {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    color: #475467;
    cursor: pointer;
  }

  .format-switcher input {
    margin: 0;
  }

  .workspace {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 16px;
    flex: 1;
    min-height: 0;
  }

  .pane {
    display: grid;
    grid-template-rows: 42px minmax(0, 1fr);
    min-width: 0;
    min-height: 0;
  }

  .pane-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  .pane-title {
    color: #475467;
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.04em;
  }

  textarea,
  .output {
    width: 100%;
    height: 100%;
    min-height: 0;
    overflow: auto;
    border: 1px solid #d0d5dd;
    border-radius: 8px;
    background: #fff;
    box-shadow: 0 1px 2px rgb(16 24 40 / 0.06);
  }

  textarea {
    resize: none;
    padding: 16px;
    color: #101828;
    line-height: 1.55;
  }

  textarea:focus {
    border-color: #5777d8;
    outline: 3px solid rgb(87 119 216 / 0.18);
  }

  .output {
    padding: 16px;
  }

  .output :global(.markdown-body) {
    max-width: none;
  }

  pre {
    margin: 0;
    white-space: pre-wrap;
    word-break: break-word;
  }

  .error {
    border-color: #f04438;
    color: #b42318;
    background: #fff6f5;
  }

  @media (max-width: 820px) {
    .playground {
      height: auto;
      min-height: 100vh;
      overflow: visible;
      padding: 16px;
    }

    .workspace {
      grid-template-columns: 1fr;
      height: auto;
    }

    .pane-header {
      align-items: flex-start;
      flex-direction: column;
    }

    textarea,
    .output {
      height: 38vh;
      min-height: 220px;
    }
  }
</style>
