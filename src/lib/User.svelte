<script>
  import { createEventDispatcher } from "svelte";
  import { highlightMatch } from "./helpers";

  export let user;
  export let query;

  const dispatch = createEventDispatcher();

  function onUserClick() {
    dispatch("user-click", { user });
  }
</script>

<style>
  .user-link {
    color: inherit;
    text-decoration: none;
    padding: 0;
    line-height: 0;
  }
  .user-link:hover {
    text-decoration: underline;
  }
</style>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<button type="button" on:click={onUserClick} class="btn user-link icon-link">
  <span class="ms-1 fw-light"><em>{@html highlightMatch(user, query)}</em></span>
</button>
