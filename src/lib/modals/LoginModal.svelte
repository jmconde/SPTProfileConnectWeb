<script>
  import { createEventDispatcher } from "svelte";
  import { fade } from 'svelte/transition';
  import { Router, navigate } from 'svelte-routing';

  import { AuthService } from "@services/AuthService";
  import { t } from '@services/i18n';
  import { createToast } from "@stores/toasts";

  export let isOpen = false;
  let username = "";
  let password = "";

  const dispatchEvent = createEventDispatcher();  

  function closeModal() {
    isOpen = false;
    username = "";
    password = "";
    dispatchEvent("close");
  }

  async function doLogin() {
    const auth = new AuthService();
    try {
      await auth.login(username, password);
      closeModal();
      createToast('Login successful', 'success');
      navigate('/');
    } catch (error) {
      console.error(error);
      createToast('Error logging in', 'danger');
    }
  }
  
  function gotoPasswordRecovery(e){
    e.preventDefault();
    closeModal();
    navigate('/forgotten-password')
  }
</script>

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
            <Router>
              <button tabindex="-1" type="button" class="button-link" on:click|preventDefault|stopPropagation={gotoPasswordRecovery}>{$t('link.forgottenPassword')}</button>
            </Router>
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