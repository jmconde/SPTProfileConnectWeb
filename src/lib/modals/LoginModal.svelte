<script>
  import { createEventDispatcher } from "svelte";
  import { fade } from 'svelte/transition';
  import AuthService from "../../services/authService";
  import { createToast } from "../../stores/toasts";

  export let isOpen = false;
  let username = "";
  let password = "";

  const dispatchEvent = createEventDispatcher();  

  function closeModal() {
    isOpen = false;
    dispatchEvent("close");
  }

  async function doLogin() {
    const auth = new AuthService();
    try {
      await auth.login(username, password);
      closeModal();
      username = "";
      password = "";
      createToast('Login successful', 'success');
    } catch (error) {
      console.error(error);
      createToast('Error logging in', 'danger');
    }
  }
</script>

<style>
  /* Your component styles go here */
</style>

{#if isOpen}
  <div class="modal fade show" tabindex="-1" style="display: block;" in:fade={{ duration: 200 }}>
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Login</h5>
          <button type="button" class="btn-close" aria-label="Close" on:click={closeModal}></button>
        </div>
        <form on:submit|preventDefault={doLogin}>
          <div class="modal-body">
            <form on:submit|preventDefault={doLogin}>
              <div class="form-floating mb-3">
                <input bind:value={username} on:keydown={(event) => event.key === 'Enter' && doLogin() } type="text" class="form-control" id="username" name="username" placeholder="Username" />
                <label for="username" class="form-label">Username</label>
              </div>
              <div class="form-floating mb-3">
                <input bind:value={password}  on:keydown={(event) => event.key === 'Enter' && doLogin() } type="password" class="form-control" id="password" name="password" placeholder="Password" />
                <label for="password" class="form-label">Password</label>
              </div>
            </form>
            <a href="/forgotten-password">Forgotten Password?</a>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" on:click={closeModal}>Cancel</button>
            <button type="submit" class="btn btn-primary" on:click={doLogin}>Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div class="modal-backdrop fade show"></div>
{/if}