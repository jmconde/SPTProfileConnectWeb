<script>
  import { navigate } from 'svelte-routing';
  import SecurePage from '../../lib/SecurePage.svelte';
  import { AdminService } from '../../services/AdminService';
  import { onMount } from 'svelte';
  import { createToast } from '../../stores/toasts';
  import { t } from '@services/i18n';
  
  export let id = '';

  let namespaces = [];
  let confirmPassword = '';
  let defaultNamespace = {};
  let user = {
    username: '',
    password: '',
    email: '',
    firstname: '',
    lastname: '',
    roles: ['user'],
    namespaceId: 'default'
  };
  let isAdmin = false;

  $: isNew = !id;
  
  const adminService = new AdminService();


  async function createUser() {
    try {
      await adminService.createUser(user);
      navigate('/admin/users');
      createToast($t('toast.userCreationSuccessful'), 'success');
    } catch (error) {
      console.error(error);
      createToast($t('toast.userCreationFailed'), 'danger');
    }
  }

  async function updateUser() {
    try {
      await adminService.updateUser(user);
      navigate('/admin/users');
      createToast($t('toast.userUpdateSuccessful'), 'success');
    } catch (error) {
      console.error(error);
      createToast($t('toast.userUpdateFailed'), 'danger');
    }
  }

  function onSubmit(event) {
    event.preventDefault();
  }
  
  onMount(async () => {
    namespaces = await adminService.listNamespaces();
    defaultNamespace = namespaces.find(n => n.default);
    user.namespaceId = defaultNamespace._id;
    if (!isNew) {
      user = await adminService.getUser(id);
      isAdmin = user.roles.includes('admin');
    }
  });
</script>

<SecurePage roles={['admin']}>
  <div class="container">
    <h1 class="d-flex justify-content-between mt-5">
      <span>{#if isNew}{$t('title.createUser')}{:else}{$t('title.editUser')}{/if}</span>
      <button
        type="button"
        class="btn btn-light"
        on:click={() => navigate("/admin/users")}>{$t('button.back')}</button
      >
    </h1>
    <form action="/api/user" method="post" on:submit={onSubmit}>
      <div class="row mt-5 mb-3">
        <div class="col">
          <div class="mb-3">
            <label for="username" class="form-label">{$t('common.username')}</label>
            <input bind:value={user.username} type="text" class="form-control" id="username" name="username" >
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">{$t('label.password')}</label>
            <input bind:value={user.password} type="password" class="form-control" id="password" name="password" >
          </div>
          <div class="mb-3">
            <label for="confirm-password" class="form-label">{$t('label.passwordConfirmation')}</label>
            <input bind:value={confirmPassword} type="password" class="form-control" id="confirm-password" name="confirm-password">
          </div>
          <div class="mb-3">
            <label for="character" class="form-label">{$t('common.namespace')}</label>
            <select bind:value={user.namespaceId} class="form-select">
              {#each namespaces as namespace}
                {#if namespace._id === user.namespaceId}
                  <option value={namespace._id} selected>{namespace.name}</option>
                {:else}
                  <option value={namespace._id} >{namespace.name}</option>
                {/if}
              {/each}
            </select>
          </div>
        </div>
        <div class="col">
          <div class="mb-3">
            <label for="email" class="form-label">{$t('label.email')}</label>
            <input bind:value={user.email} type="email" class="form-control" id="email" name="email">
          </div>
          <div class="mb-3">
            <label for="firstname" class="form-label">{$t('label.firstName')}</label>
            <input bind:value={user.firstname} type="text" class="form-control" id="firstname" name="firstname">
          </div>
          <div class="mb-3">
            <label for="lastname" class="form-label">{$t('label.lastName')}</label>
            <input bind:value={user.lastname} type="text" class="form-control" id="lastname" name="lastname">
          </div>
          
          <div class="mb-3">
            <label for="character" class="form-label">{$t('label.characterId')}</label>
            <input bind:value={user.character} type="text" class="form-control" id="character" name="character">
          </div>
        </div>
      </div>
      <div class="mb-3 form-check form-switch form-check-inline">
        <input bind:group={user.roles} type="checkbox" class="form-check-input" role="switch" value="user" disabled>
        <label class="form-check-label" for="is-admin">{$t('roles.user')}</label>
      </div>
      <div class="mb-3 form-check form-switch form-check-inline">
        <input bind:group={user.roles} type="checkbox" class="form-check-input" role="switch" value="admin">
        <label class="form-check-label" for="is-admin">{$t('roles.admin')}</label>
      </div>
      <div class="button-group mt-5">
        {#if isNew}
          <button type="button" class="btn btn-primary" on:click={createUser}>{$t('button.createUser')}</button>
        {:else}
          <button type="button" class="btn btn-primary" on:click={updateUser}>{$t('button.updateUser')}</button>
        {/if}
      </div>
    </form>
  </div>
</SecurePage>