<script>
  import { createEventDispatcher } from "svelte";
  import { Button, FormGroup, Input, ModalBody, ModalFooter, ModalHeader } from "@sveltestrap/sveltestrap";
  import { Modal } from "@sveltestrap/sveltestrap";
  import AuthService from "../../services/authService";

  export let isOpen = false;
  let username = "";
  let password = "";

  const dispatchEvent = createEventDispatcher();  

  function closeModal() {
    isOpen = false;
    dispatchEvent("close");
  }

  function doLogin() {
    const auth = new AuthService();
    auth.login(username, password);
    closeModal();
    console.log('Login stuff here', username, password);
  }
</script>

<style>
  /* Your component styles go here */
</style>

<Modal {isOpen}>
  <ModalHeader toggle={closeModal}>Login</ModalHeader>
  <ModalBody>
    <FormGroup floating label="Username">
      <Input  bind:value={username} type="text" name="username" id="username" placeholder="with a placeholder" />
    </FormGroup>
    <FormGroup floating label="Password">
      <Input bind:value={password} type="password" name="password" id="password" placeholder="with a placeholder" />
    </FormGroup>
  </ModalBody>
  <ModalFooter>
    <Button color="light" on:click={closeModal}>Cancel</Button>
    <Button color="primary" on:click={doLogin}>Login</Button>
  </ModalFooter>
</Modal>