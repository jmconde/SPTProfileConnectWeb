<script>
  import "bootstrap";

  import Collpase from "@lib/Collpase.svelte";
  import NewPassword from "@lib/NewPassword.svelte";
  import SecurePage from "@lib/SecurePage.svelte";
  import { t } from "@services/i18n";
  import { onMount } from "svelte";
  import { UserService } from "@services/UserService.js";
  import { createToast } from "@stores/toasts.js";
  
  const userService = new UserService();
  let user = {
    username: '',
    password: '',
    email: '',
    firstname: '',
    lastname: '',
    roles: ['user'],
    namespaceId: 'default',
    profileId: '',
    discord: '',
  };

  onMount(() => {
    console.log("mounted");
    getData();
  });

  async function getData() {
    try {
      user = await userService.fetchUser();
      console.log('user :>> ', user);
    } catch (error) {
      console.error(error);
    }
  }

  async function updateUser() {
    try {
      await userService.saveUser(user);
      createToast($t('toast.userUpdateSuccessful'), 'success');
    } catch (error) {
      console.error(error);
      createToast($t('toast.userUpdateFailed'), 'danger');
    }
  }
</script>

<SecurePage roles={["user"]}>
  <div class="container">
    <h1 class="mt-5">{$t("title.userProfile")}</h1>
    <!-- svelte-ignore a11y-positive-tabindex -->
    <div class="mt-5">
      <Collpase title={$t("title.editUser")} collapsed={false}>
        <div class="row mt-5 mb-3">
          <div class="col">
            <div class="mb-3">
              <label for="username" class="form-label">{$t('common.username')}</label>
              <input bind:value={user.username} tabindex="0" type="text" class="form-control" id="username" name="username" disabled>
            </div>
            <div class="mb-3">
              <label for="firstname" class="form-label">{$t('label.firstName')}</label>
              <input bind:value={user.firstname} tabindex="2" type="text" class="form-control" id="firstname" name="firstname">
            </div>
            <div class="mb-3"></div>
            <div class="mb-3">
              <label for="character" class="form-label">{$t('label.characterId')}</label>
              <input bind:value={user.profileId} tabindex="4" type="text" class="form-control" id="character" name="character">
            </div>
          </div>
          <div class="col">
            <div class="mb-3">
              <label for="email" class="form-label">{$t('label.email')}</label>
              <input bind:value={user.email} tabindex="1" type="email" class="form-control" id="email" name="email">
            </div>
            <div class="mb-3">
              <label for="lastname" class="form-label">{$t('label.lastName')}</label>
              <input bind:value={user.lastname} tabindex="3" type="text" class="form-control" id="lastname" name="lastname">
            </div>
            <div class="mb-3">
              <label for="character" class="form-label">{$t('label.discordNickname')}</label>
              <input bind:value={user.discord} tabindex="5" type="text" class="form-control" id="discord" name="discord">
            </div>
          </div>
        </div>
        <div class="button-group mt-1">
          <button type="button" class="btn btn-primary" on:click={updateUser}>{$t('button.updateUser')}</button>
        </div>
      </Collpase>
    </div>
    <div class="mt-5">
      <Collpase title={$t("title.passwordChange")} collapsed={true}>
        <NewPassword />
      </Collpase>
    </div>
  </div>
</SecurePage>
