<script>
  import remark from 'remark';
  import html from 'remark-html';
  import markdownld from 'markdownld';
	import example from '../../SPEC.md';

  import './Layout.svelte';

  let format = 'html';
  let input = example || '';
  let compiled = '';
  $: {
    if (format === 'html') {
      compiled = remark().use(html).processSync(input);
    } else if (format === 'turtle' || format === 'jsonld') {
      try {
        compiled = remark()
          .use({ settings: { format } })
          .use(markdownld)
          .processSync(input).contents;
      } catch (err) {
        console.error(err);
        compiled = 'Invalid Markdown-LD';
      }
    }
  }
</script>

<main class="container mx-auto w-11/12 my-0 h-full max-h-full flex flex-col">
  <div class="py-4">
    <h1 class="text-lg font-bold">Markdown-LD Playground</h1>
  </div>
  <div class="flex-grow w-full grid grid-cols-2 gap-4">
    <div class="">
			<div class="h-8 w-full mb-2"></div>
      <textarea
        class="w-full overflow-auto border-gray-300"
        style="height: 80vh; max-height: 80vh; min-height: 24rem;"
        bind:value={input}
      />
    </div>
    <div class="">
      <div class="flex flex-col space-y-2">
        <div class="h-8 w-full flex space-x-2">
          {#each [{ value: 'html', label: 'HTML', checked: true }, { value: 'turtle', label: 'Turtle' }, { value: 'jsonld', label: 'JSON-LD' }] as option}
            <label class="block flex items-center"
              ><input
                type="radio"
                bind:group={format}
                value={option.value}
                checked={!!option.checked}
              /><span class="ml-1">{option.label}</span></label
            >
          {/each}
        </div>

        <div
          class="overflow-auto border rounded p-3 w-full"
          style="height: 80vh; max-height: 80vh; min-height: 24rem;"
        >
          {#if format === 'html'}
            <div class="markdown-body list-disc">
              {@html compiled}
            </div>
          {:else if ['turtle', 'jsonld'].includes(format)}
            <pre>{compiled}</pre>
          {/if}
        </div>
      </div>
    </div>
  </div>
</main>

<style>
</style>
