<script>
  import { onMount } from "svelte";
  import Loading from "../lib/Loading.svelte";
  let html; 

  onMount(() => {
    fetch('/partials/CHANGELOG.html')
      .then(response => response.text())
      .then(data => {
        html = data;
      });
  });
</script>

<div class="container mt-5">
  <button class="btn btn-light" on:click={() => window.history.back()}>Back</button>
  {#if html}
    <div class="changelog m-3">
      {@html html}
    </div>
  {:else}
    <Loading text="Loading Changelog" />
  {/if}
</div>
<style>
  :global(.changelog) {
    max-width: 800px;
    font-size: 80%;
  }
  :global(.changelog h1) {
    font-size: 1.5rem;
    border-bottom: 1px solid #eaecef;
    padding-bottom: 4px;
  }
  :global([data-bs-theme=dark] .changelog h1) {
    border-bottom: 1px solid #333333;
  }

  :global([data-bs-theme=dark] .changelog h2) {
    color: var(--bs-light);
  }

  :global(.changelog h2) {
    font-size: 1.0rem;
    padding-bottom: 4px;
    margin-bottom: 4px;
    color: var(--bs-dark);
  }

  :global([data-bs-theme=dark] .changelog h2 a) {
    color: var(--bs-light);
  }

  :global(.changelog h2 a) {
    font-size: 1.25rem;
    color: var(--bs-dark);
    text-decoration: none;
    opacity: 0.8;
  }

  :global(.changelog h2 a:hover) {
    opacity: 0.5;
    text-decoration: underline;
  }

  :global(.changelog h3) {
    font-size: 1rem;
    padding-bottom: 4px;
    padding-left: 1rem;
    margin-bottom: 2px;
  }

  :global(.changelog ul) {
    padding-left: 1.8rem;
    list-style: none;
  }
</style>