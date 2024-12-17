<script>
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";

  import SecurePage from "@lib/SecurePage.svelte";
  import { AdminService } from "@services/AdminService";
  import { t } from '@services/i18n';
  import { createToast } from "@stores/toasts";
  import { confirmModal } from "@utils/modal";

  const adminService = new AdminService();

  let namespaces = [];

  async function getData() {
    namespaces = (await adminService.listNamespaces()).sort((a, b) => {
      if (a.default) return -1;
      if (b.default) return 1;
      return a.name.localeCompare(b.name);
    });
  }
  
  function editNS (namespace) {
    navigate(`/admin/namespace/${namespace._id}`);
  }

  async function deleteNS(namespace) {
    try {
      const ok = await confirmModal({
        title: $t('title.deleteNamespaceModal'),
        message: $t('message.deleteNamespaceModal'),
        confirmText: $t('button.delete'),
        cancelText: $t('button.cancel'),
        confirmVariant: 'danger',
      });
      if (!ok) return;
      await adminService.deleteNamespace(namespace._id);
      createToast($t('toast.namespaceDeletionSuccessful'), 'success');
      getData();
    } catch (error) {
      console.error(error);
      createToast($t('toast.namespaceDeletionFailed'), 'danger');
    }
  }

  onMount(() => {
    getData();
  });
</script>

<SecurePage roles={["admin"]}>
  <div class="container">
    <h1 class="d-flex justify-content-between mt-5">
      <span>{$t('title.namespaces')}</span>
      <button
        type="button"
        class="btn btn-light"
        on:click={() => navigate("/admin")}>{$t('button.back')}</button
      >
    </h1>
    <table class="table mt-4">
      <thead>
        <tr>
          <th scope="col">{$t('common.namespace')}</th>
          <th scope="col">{$t('common.description')}</th>
          <th scope="col">{$t('common.users')}</th>
          <th scope="col">{$t('common.actions')}</th>
        </tr>
      </thead>
      <tbody>
    {#each namespaces as namespace}
      <tr>
        <td class:default={namespace.default}>{namespace.name}</td>
        <td class:default={namespace.default}>{namespace.description || ''}</td>
        <td class:default={namespace.default}>
          {#each namespace.users as user, i}
            {user.username}
            {#if i < namespace.users.length - 1}<span>&nbsp;-&nbsp;</span>{/if}
          {/each}
        </td>
        <td>
          
          <button class="btn btn-sm btn-primary" on:click={() => editNS(namespace)}
            >{#if namespace.default}{$t('button.view')}{:else}{$t('button.edit')}{/if}</button>
          <button class="btn btn-sm btn-danger" on:click={() => deleteNS(namespace)} disabled={namespace.default}
            >{$t('button.delete')}</button>
        </td>
      </tr>
    {/each}
    </tbody>
    <div class="button-group mt-5">
      <button class="btn btn-primary me-2" on:click={() => navigate("/admin/namespace")}
        >{$t('button.createNamespace')}</button
      >
    </div>
  </div>
</SecurePage>

<style>
  .default {
    opacity: 0.5;
    font-style: italic;
  }
</style>
