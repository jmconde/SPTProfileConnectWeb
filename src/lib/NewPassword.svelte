<script>
  import { Container, FormGroup, Input, Button } from "@sveltestrap/sveltestrap";
  import AuthService from "../services/authService";
  import { userStore } from "../stores/userStore";
  import PasswordStrength from "./PasswordStrength.svelte";
  
  let oldPassword = '';
  let newPassword = '';
  let confirmPassword = '';
  let auth = new AuthService();

  $: username = $userStore?.username ?? "";

  function changePassword(evt) {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    evt.preventDefault();
    evt.stopPropagation();
    console.log('change password', username);
    auth.changePassword(username, oldPassword, newPassword);
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