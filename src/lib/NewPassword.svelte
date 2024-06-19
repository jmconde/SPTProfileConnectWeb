<script>
  import { userStore } from "../stores/userStore";
  import PasswordStrength from "./PasswordStrength.svelte";
  import { UserService } from "../services/UserService";
  import { t } from '@services/i18n';
  import { alertModal } from "../utilities/modal";
  
  let oldPassword = '';
  let newPassword = '';
  let confirmPassword = '';
  const userService = new UserService();

  $: username = $userStore?.username ?? "";

  async function changePassword(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    if (newPassword !== confirmPassword) {
      await alertModal({
        message: $t('message.passwordMismatch'),
        confirmText: $t('common.ok'),
        confirmVariant: 'danger',
      });
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

<div class="container mt-2 mb-5">
  <p>{$t('message.enterNewPassword')}</p>
  <form on:submit|preventDefault|stopPropagation|once={() => {}}>
    <div class="mb-3">
      <label for="old-password" class="form-label">{$t('label.oldPassword')}</label>
      <input bind:value={oldPassword} type="password" class="form-control" id="old-password" name="old-password" />
    </div>
    <div class="mb-3">
      <label for="password" class="form-label">{$t('label.newPassword')}</label>
      <input bind:value={newPassword} type="password" class="form-control" id="password" name="password" />
      {#if newPassword.length > 0}
        <div class="mt-3">
          <PasswordStrength password={newPassword}/>
        </div>
      {/if}
    </div>
    <div class="mb-3">
      <label for="confirm-password" class="form-label">{$t('label.passwordConfirmation')}</label>
      <input bind:value={confirmPassword} type="password" class="form-control" id="confirm-password" name="confirm-password" />
    </div>
    <button type="button" class="btn btn-primary" on:click={changePassword}>{$t('button.changePassword')}</button>
  </form>
</div>