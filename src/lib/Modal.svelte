<script>
  import { createEventDispatcher } from "svelte";
  import { t } from '@services/i18n';
  import { fade } from "svelte/transition";

  const dispatchEvent = createEventDispatcher();
  
  export let isOpen = true;
  export let title = '';
  export let component;
  export let props = {};
  
  $: {
    props = props
  }

  function closeModal() {
    isOpen = false;
    dispatchEvent("close");
  }
</script>


  <div class="modal fade" class:show={isOpen} tabindex="-1" in:fade={{ duration: 200 }} data-bs-backdrop="true" data-bs-keyboard="true">
    <div class="modal-dialog">
      <div class="modal-content">
        {#if title}
          <div class="modal-header">
            <h5 class="modal-title">{title}</h5>
            <button type="button" class="btn-close" aria-label="Close" on:click={closeModal}></button>
          </div>
        {/if}
        <div class="modal-body">
          {#if component}
            <svelte:component this={component}  {...props} />
          {/if}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" on:click={closeModal}>{$t('common.close')}</button>
        </div>
      </div>
    </div>
  </div>

  <style>
    .show {
      display: block;
    }
  </style>