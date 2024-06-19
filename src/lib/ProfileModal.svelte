<script>
  import { createEventDispatcher } from "svelte";
  import Profile from "./Profile.svelte";
  import { t } from '@services/i18n';
  import { fade } from "svelte/transition";

  const dispatchEvent = createEventDispatcher();
  export let isOpen = true;
  export let profile = {};

  function closeModal() {
    isOpen = false;
    dispatchEvent("close");
  }
</script>

{#if isOpen}
  <div class="modal fade show" tabindex="-1" style="display: block;" in:fade={{ duration: 200 }}>
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <svelte:component this={Profile} {profile} />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" on:click={closeModal}>{$t('common.close')}</button>
        </div>
      </div>
    </div>
  </div>
{/if}
