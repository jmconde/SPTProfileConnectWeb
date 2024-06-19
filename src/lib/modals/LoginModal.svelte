<script>
  import { createEventDispatcher } from "svelte";
  import { fade } from 'svelte/transition';
  import { AuthService } from "@services/AuthService";
  import { createToast } from "../../stores/toasts";
  import { t } from '@services/i18n';

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
        <form on:submit|preventDefault|stopPropagation|once={() => {}}>
          <div class="modal-body">
              <div class="mb-3">
                <label for="username" class="form-label">{$t('common.username')}</label>
                <input bind:value={username} type="text" class="form-control" id="username" name="username" />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">{$t('label.password')}</label>
                <input bind:value={password} type="password" class="form-control" id="password" name="password" />
              </div>
            <a href="/forgotten-password">{$t('link.forgottenPassword')}?</a>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" on:click|preventDefault|stopPropagation|once={closeModal}>{$t('button.cancel')}</button>
            <button type="submit" class="btn btn-primary" on:click|preventDefault|stopPropagation|once={doLogin}>{$t('button.login')}</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div class="modal-backdrop fade show"></div>
{/if}