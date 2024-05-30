<script>
  import { Container, FormGroup, Input, Button } from "@sveltestrap/sveltestrap";
  import AuthService from "../services/authService";

  let oldPassword = '';
  let newPassword = '';
  let confirmPassword = '';
  let username = '';
  let auth = new AuthService();

  function changePassword(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    console.log('change password');
    auth.changePassword(username, oldPassword, newPassword);
  }

</script>

<Container class="mt-2">
  <h1>New Password</h1>
  <p>Enter your new password below.</p>
  <form>
    <FormGroup floating label="Username">
      <Input  bind:value={username} type="text" name="username" id="username" />
    </FormGroup>
    <FormGroup floating label="Old Password">
      <Input bind:value={oldPassword} type="password" name="old-password" id="old-password" />
    </FormGroup>
    <FormGroup floating label="New Password">
      <Input bind:value={newPassword} type="password" name="password" id="password" />
    </FormGroup>
    <FormGroup floating label="Confirm New Password">
      <Input bind:value={confirmPassword} type="password" name="confirm-password" id="confirm-password" />
    </FormGroup>
    <Button color="primary" on:click={changePassword}>Submit</Button>
  </form>
</Container>