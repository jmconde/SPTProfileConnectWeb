<script>
  import { Container, FormGroup, Input, Button } from "@sveltestrap/sveltestrap";
  import { userStore } from "../stores/userStore";
  import PasswordStrength from "./PasswordStrength.svelte";
  import { UserService } from "../services/UserService";
  
  let oldPassword = '';
  let newPassword = '';
  let confirmPassword = '';
  const userService = new UserService();

  $: username = $userStore?.username ?? "";

  async function changePassword(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      await userService.changePassword(username, oldPassword, newPassword);
      reset();
    } catch (error) {
      alert(error.message);
    }
  }

  function reset() {
    oldPassword = '';
    newPassword = '';
    confirmPassword = '';
  }

</script>

<Container class="mt-2">
  <p>Enter your new password below.</p>
  <form>
    <FormGroup floating label="Old Password">
      <Input bind:value={oldPassword} type="password" name="old-password" id="old-password" />
    </FormGroup>
    <FormGroup floating label="New Password">
      <Input bind:value={newPassword} type="password" name="password" id="password" />
      {#if newPassword.length > 0}
        <div class="mt-3">
          <PasswordStrength password={newPassword}/>
        </div>
      {/if}
    </FormGroup>
    <FormGroup floating label="Confirm New Password">
      <Input bind:value={confirmPassword} type="password" name="confirm-password" id="confirm-password" />
    </FormGroup>
    <Button color="primary" on:click={changePassword}>Submit</Button>
  </form>
</Container>