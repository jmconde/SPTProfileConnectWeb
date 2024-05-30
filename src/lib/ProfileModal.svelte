<script>
  import { createEventDispatcher } from "svelte";
  import Profile from "./Profile.svelte";
  import { Modal, ModalBody, ModalFooter } from '@sveltestrap/sveltestrap';

  const dispatchEvent = createEventDispatcher();
  export let isOpen = true;
  export let profile = {};

  function closeModal() {
    isOpen = false;
    dispatchEvent("close");
  }

  // function onOverlayClick(event) {
  //   console.log('event :>> ', event);
  //   if (event.target === this) {
  //     closeModal();
  //   }
  // }
</script>

<!-- <style>
  .modal-backdrop {
    background-color: rgba(0, 0, 0, 0.5); /* Adjust the alpha value for transparency */
  }
</style> -->

<Modal {isOpen}>
  <ModalBody>
    <svelte:component this={Profile} {profile} />
  </ModalBody>
  <ModalFooter>
    <button type="button" class="btn btn-secondary" on:click={closeModal}>Close</button>
  </ModalFooter>
</Modal>

<!-- {#if isOpen}
  <div class="modal show" tabindex="-1" style="display: block;" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Modal Title</h5>
          <button type="button" class="close" on:click={closeModal}>
            <span>&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <svelte:component this={Profile} {profile} />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" on:click={closeModal}>Close</button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal-backdrop" style:display={isOpen ? 'block' : 'none'} on:click={onOverlayClick}></div>
{/if} -->