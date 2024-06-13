<script>
  import { onDestroy } from 'svelte';
  import { modalState } from '../../utilities/modal';
  import { fade } from 'svelte/transition';
  import { t } from '../../services/i18n.js';

  let modal;
  const unsubscribe = modalState.subscribe(value => modal = value);
  let confirmVariant = 'primary';
  let cancelVariant = 'light';
  $: {
    confirmVariant = modal.confirmVariant || 'primary';
    cancelVariant = modal.cancelVariant || 'light';
  }
 
  onDestroy(() => {
    unsubscribe();
  });

  function confirm() {
    modal.onConfirm();
  }

  function cancel() {
    modal.onCancel();
  }
</script>

{#if modal.show}
<div class="modal fade show" tabindex="-1" style="display: block;" in:fade={{ duration: 200 }}>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">{$t(modal.title) || 'Confirm Action'}</h5>
        <button type="button" class="btn-close" aria-label="Close" on:click={cancel}></button>
      </div>
      <div class="modal-body">
        {#if modal.customContent}
          <svelte:component this={modal.customContent} />
        {:else}
          <p>{$t(modal.message) || 'Are you sure you want to proceed?'}</p>
        {/if}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-{cancelVariant}" on:click={cancel}>{$t(modal.cancelText) || 'Cancel'}</button>
        <button type="button" class="btn btn-{confirmVariant}" on:click={confirm}>{$t(modal.confirmText) || 'Confirm'}</button>
      </div>
    </div>
  </div>
</div>
<div class="modal-backdrop fade show"></div>
{/if}

<style>
  .modal-backdrop {
    z-index: 1040;
  }
  .modal {
    z-index: 1050;
  }
</style>
