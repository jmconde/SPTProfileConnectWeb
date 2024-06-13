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
</script>


<Modal {isOpen}>
  <ModalBody>
    <svelte:component this={Profile} {profile} />
  </ModalBody>
  <ModalFooter>
    <button type="button" class="btn btn-secondary" on:click={closeModal}>Close</button>
  </ModalFooter>
</Modal>