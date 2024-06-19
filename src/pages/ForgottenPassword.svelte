<script>
  import { navigate } from "svelte-routing";
  import { AuthService } from "@services/AuthService";
  import { alertModal } from "../utilities/modal";
  import { t } from '@services/i18n';
  

  let username = '';
  let code = '';
  let emailSent = false;
  let codeValidated = false;
  let newPassword = '';
  let confirmPassword = '';


  const auth = new AuthService();
  async function askForCode() {
    if (!username) {
      await alertModal({
        message: $t('message.enterUsername'),
        confirmText: $t('common.ok'),
        confirmVariant: 'danger',
      });
      return;
    }
    const response = await auth.requestPasswordRecovery(username);
    emailSent = true;
  }

  async function validateCode() {
    let valid = false;
    if (!code) {
      await alertModal({
        message: $t('message.enterCode'),
        confirmText: $t('common.ok'),
        confirmVariant: 'danger',
      });
      return;
    }
    try {
      await auth.validate2FACode(code, username);
      valid = true;
    } catch (error) {
      await alertModal({
        message: $t('message.invalidCode'),
        confirmText: $t('common.ok'),
        confirmVariant: 'danger',
      });
    }
    codeValidated = valid;
  }

  async function setNewPassword() {
    if (!newPassword || !confirmPassword) {
      await alertModal({
        message: $t('message.enterNewPassword'),
        confirmText: $t('common.ok'),
        confirmVariant: 'danger',
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      await alertModal({
        message: $t('message.passwordMismatch'),
        confirmText: $t('common.ok'),
        confirmVariant: 'danger',
      });
      return;
    }
    await auth.changePasswordWithCode(username, code, newPassword);
    navigate('/');
  }
</script>

<div class="container">
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <h1>{$t('title.forgottenPassword')}</h1>
      {#if !emailSent}
      <p>{$t('message.forgottenPassword')}</p>
      <div class="form-group">
        <label for="username">{$t('common.username')}</label>
        <input
          type="text"
          class="form-control"
          id="username"
          placeholder={$t('placeholder.enterUsername')}
          bind:value={username}
        />
      </div>
      <button type="submit" class="btn btn-primary" on:click={askForCode}
        >{$t('button.resetLink')}</button
      >
      {:else if !codeValidated}
      <p>{$t('message.recoveryMailSent')}</p>
      <div class="form-group">
        <label for="code">Code</label>
        <input type="text" class="form-control" id="code" placeholder={$t('placeholder.enterRecoveryCode')} bind:value={code} />
      </div>
      <button class="btn btn-primary" on:click={validateCode}>{$t('button.validateCode')}</button>

      {:else}
        <p>{$t('message.recoveryCodeValidated')}</p>
        <div class="form-group">
          <label for="newPassword">{$t('label.newPassword')}</label>
          <input type="password" class="form-control" id="newPassword" bind:value={newPassword} placeholder={$t('placeholder.newPassword')} />
        </div>
        <div class="form-group">
          <label for="confirmPassword">{$t('label.passwordConfirmation')}</label>
          <input type="password" class="form-control" id="confirmPassword" bind:value={confirmPassword} placeholder={$t('placeholder.passwordConfirmation')} />
        </div>
        <button class="btn btn-primary" on:click={setNewPassword}>{$t('button.setNewPassword')}</button>
      {/if}
    </div>
  </div>
</div>
