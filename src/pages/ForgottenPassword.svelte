<script>
  import { navigate } from "svelte-routing";
  import AuthService from "../services/authService";

  let username = '';
  let code = '';
  let emailSent = false;
  let codeValidated = false;
  let newPassword = '';
  let confirmPassword = '';


  const auth = new AuthService();
  async function askForCode() {
    if (!username) {
      alert("Please enter your username");
      return;
    }
    const response = await auth.requestPasswordRecovery(username);
    emailSent = true;
  }

  async function validateCode() {
    let valid = false;
    if (!code) {
      alert("Please enter the code");
      return;
    }
    try {
      await auth.validate2FACode(code, username);
      valid = true;
    } catch (error) {
      console.log('Invalid code', error);
    }
    codeValidated = valid;
  }

  async function setNewPassword() {
    if (!newPassword || !confirmPassword) {
      alert("Please enter your new password and confirm it");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    await auth.changePasswordWithCode(username, code, newPassword);
    navigate('/');
  }
</script>

<div class="container">
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <h1>Forgotten Password</h1>
      {#if !emailSent}
      <p>Enter your username we will send you a link to reset your password.</p>
      <div class="form-group">
        <label for="username">Username</label>
        <input
          type="text"
          class="form-control"
          id="username"
          placeholder="Enter your username"
          bind:value={username}
        />
      </div>
      <button type="submit" class="btn btn-primary" on:click={askForCode}
        >Send Reset Link</button
      >
      {:else if !codeValidated}
      <p>An email has been sent to your email address with a code to insert in the field below.</p>
      <div class="form-group">
        <label for="code">Code</label>
        <input type="text" class="form-control" id="code" placeholder="Enter the code" bind:value={code} />
      </div>
      <button class="btn btn-primary" on:click={validateCode}>Validate Code</button>

      {:else}
        <p>Your code has been validated. You can now reset your password.</p>
        <div class="form-group">
          <label for="newPassword">New Password</label>
          <input type="password" class="form-control" id="newPassword" bind:value={newPassword} placeholder="Enter your new password" />
        </div>
        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input type="password" class="form-control" id="confirmPassword" bind:value={confirmPassword} placeholder="Confirm your new password" />
        </div>
        <button class="btn btn-primary" on:click={setNewPassword}>Set New Password</button>
      {/if}
    </div>
  </div>
</div>
