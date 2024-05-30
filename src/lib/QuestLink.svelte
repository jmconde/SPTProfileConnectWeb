<script>
  import Link45deg from "svelte-bootstrap-icons/lib/Link45deg.svelte";
  import { highlightMatch } from './helpers.js';
  export let quest;
  export let query;
</script>

<style>
  .trader-link {
    color: inherit;
    text-decoration: none;
  }
  .trader-link:hover {
    text-decoration: underline;
  }
</style>

{#if quest.url}
  <a href={quest.url} class="trader-link icon-link" target="_blank" rel="noopener">
    <span>{@html highlightMatch(quest.name, query)}</span>
    <svg class="bi" aria-hidden="true"><Link45deg /></svg>
  </a>
{:else}
  {@html highlightMatch(quest.name, query)}
{/if}

