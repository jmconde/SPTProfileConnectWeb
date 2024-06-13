<script>
  import { createEventDispatcher } from "svelte";

  export let isLoading = false;
  export let buttonText = "Submit";

  const dispatchEvent = createEventDispatcher(); 

  function onClick(evt) {
    dispatchEvent("click", evt);
  }

  // Optionally, you can add some internal logic to handle the loading state
</script>

<button 
  class="btn btn-primary" 
  type="button"
  disabled={isLoading}
  on:click={onClick}
>
  {#if isLoading}
    <span class="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true"></span>
    <span class="visually-hidden">Loading...</span>
  {/if}
  {!isLoading && buttonText}
</button>

<style>
  .spinner-border {
    margin-right: 0.5rem;
  }
</style>
