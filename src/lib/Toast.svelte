<script>
  import { createEventDispatcher, onDestroy, onMount } from "svelte";
  import { fade, fly } from 'svelte/transition';

  export let id;
  export let message;
  export let header;
  export let type = 'info';
  export let autohide = true;

  const dispatchEvent = createEventDispatcher();  
  let timeout;
  const classes = {
    info: 'bg-info-subtle text-info-emphasis',
    success: 'bg-success-subtle text-success-emphasis',
    warning: 'bg-warning-subtle text-warning-emphasis',
    danger: 'bg-danger-subtle text-danger-emphasis',
  };

  $:colorScheme = classes[type];

  function removeToast() {
    dispatchEvent('remove', id);
  }

  onMount(() => {
    if (autohide) {
      timeout = setTimeout(() => {
        removeToast();
      }, 5000);
    }
  });

  onDestroy(() => {
    clearTimeout(timeout);
  });
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div  class="toast show {colorScheme}"  role="alert" aria-live="assertive" aria-atomic="true" out:fly={{ x: 500, duration: 500 }}  in:fade={{ duration: 400 }}  on:click={removeToast}>
  {#if header}
    <div class="toast-header">
      <strong class="me-auto">{header}</strong>
      <button type="button" class="btn-close" aria-label="Close"></button>
    </div>
    <div class="toast-body">
      {message}
    </div>
  {:else}
    <div class="d-flex">
      <div class="toast-body">
        {message}
      </div>
      <!-- <button type="button" class="btn-close me-2 m-auto" aria-label="Close"></button> -->
    </div>
  {/if}
</div>

<style>
  .toast {
    min-width: 250px;
    max-width: 100%;
    cursor: pointer;
  }
</style>
