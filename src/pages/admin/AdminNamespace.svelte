<script>
  import { MultiSelect } from "svelte-multiselect";
  import { AdminService } from "../../services/AdminService";
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import ApiKeys from "../../lib/ApiKeys.svelte";
  import { createToast } from "../../stores/toasts";
  import { t } from '@services/i18n';
  import SecurePage from "../../lib/SecurePage.svelte";
  import Collapse from "../../lib/Collpase.svelte";

  export let id = "";

  const adminService = new AdminService();

  let namespace = {
    name: "",
    description: "",
    users: [],
  };
  let users = [];
  let selectedUsers = [];
  let originalUsers = [];

  $: isNew = !id;
  $: isDefault = namespace.default;

  async function getData() {
    if (!isNew) {
      namespace = await adminService.getNamespace(id);
      selectedUsers = namespace.users.map(mapUser);
      originalUsers = [...selectedUsers];
      namespace.users = [...selectedUsers];
    }
    users = (await adminService.listUsers({ available: true })).map(mapUser);
  }

  function mapUser(user) {
    if (user) {
      return {
        ...user,
        label: user.username,
      };
    }
  }

  async function createNamespace() {
    try {
      await adminService.createNamespace(namespace);
      navigate("/admin/namespaces");
      createToast($t('toast.namespaceCreationSuccessful'), "success");
    } catch (error) {
      console.error(error);
      createToast($t('toast.namespaceCreationFailed'), "danger");
    }
  }

  async function updateNamespace() {
    try {
      
      namespace.users = adminService.getNamespaceUsersChanges(originalUsers, selectedUsers);

      await adminService.updateNamespace(namespace);
      createToast($t('toast.namespaceUpdateSuccessful'), "success");
      navigate('/admin/namespaces');
    } catch (error) {
      console.error(error);
      createToast($t('toast.namespaceUpdateFailed'), 'danger');
    }
  }

  function itemRemoved(event) {
    const { option } = event.detail;
    if (!users.includes(option)) {
      users.push(option);
    }
    // const { item } = event.detail;
    // const index = selectedUsers.findIndex((u) => u._id === item._id);
    // selectedUsers.splice(index, 1);
  }

  onMount(() => {
    getData();
  });
</script>

<SecurePage roles={['admin']}>
  <div class="container">
    <h1 class="d-flex justify-content-between mt-5">
      <span>{#if isNew}{$t('title.createNamespace')}{:else if isDefault}{$t('title.defaultNamespace')}{:else}{$t('title.editNamespace')}{/if}</span>
      <button
        type="button"
        class="btn btn-light"
        on:click={() => navigate("/admin/namespaces")}>{$t('button.back')}</button
      >
    </h1>
    <Collapse title={$t('common.namespace')}>
      <form>
        <div class="mb-3">
          <label for="name" class="form-label">{$t('label.name')}</label>
          <input
            bind:value={namespace.name}
            type="text"
            class="form-control"
            id="name"
            name="name"
            disabled={isDefault}
          />
        </div>
        <div class="mb-3">
          <label for="description" class="form-label"
            >{$t('common.description')}</label
          >
          <input
            bind:value={namespace.description}
            type="text"
            class="form-control"
            id="description"
            name="description"
            disabled={isDefault}
          />
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">{$t('common.users')}</label>
          <MultiSelect
            placeholder={$t('placeholder.selectUsers')}
            bind:selected={selectedUsers}
            options={users}
            let:option
            disabled={isDefault}
            on:remove={itemRemoved}
          >
            {option.username}
          </MultiSelect>
        </div>
        {#if !isDefault}
          <div class="button-group mt-5">
            {#if isNew}
              <button
                type="button"
                class="btn btn-primary"
                on:click={createNamespace}>{$t('button.createNamespace')}</button
              >
            {:else}
              <button
                type="button"
                class="btn btn-primary"
                on:click={updateNamespace}>{$t('button.updateNamespace')}</button
              >
            {/if}
          </div>
        {/if}
      </form>
    </Collapse>
    {#if !isNew}
      <Collapse class="mt-4" title={$t('title.namespaceApiKeys')} collapsed={false}>
        <ApiKeys namespaceId={id} />
      </Collapse>
    {/if}
  </div>
</SecurePage>