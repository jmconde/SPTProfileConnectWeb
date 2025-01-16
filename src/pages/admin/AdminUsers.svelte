<script>
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";

  import SecurePage from "@lib/SecurePage.svelte";
  import { AdminService } from "@services/AdminService";
  import { t } from "@services/i18n";
  import { createToast } from "@stores/toasts";
  import { confirmModal } from "@utils/modal";

  const adminService = new AdminService();

  let users = [];

  async function getData() {
    users = await adminService.listUsers();
  }

  function editUser(id) {
    navigate(`/admin/user/${id}`);
  }

  async function deleteUser(id) {
    try {
      const ok = await confirmModal({
        title: $t('title.deleteUserModa'),
        message: $t('message.deleteUserModal'),
        confirmText: $t('button.delete'),
        cancelText: $t('button.cancel'),
        confirmVariant: 'danger',
      });
      if (!ok) return;
      await adminService.deleteUser(id);
      createToast($t('toast.userDeletionSuccessful'), 'success');
      getData();
    } catch (error) {
      console.error(error);
      createToast($t('toast.userDeletionFailed'), 'danger');
    }
  }

  onMount(() => {
    getData();
  });
</script>

<SecurePage roles={["admin"]}>
  <div class="container">
    <h1 class="d-flex justify-content-between mt-5">
      <span>{$t('adminUsers.title')}</span>
      <button
        type="button"
        class="btn btn-light"
        on:click={() => navigate("/admin")}>{$t('button.back')}</button
      >
    </h1>

    <table class="table mt-4">
      <thead>
        <tr>
          <th scope="col">{$t('common.username')}</th>
          <th scope="col">{$t('common.roles')}</th>
          <th scope="col">{$t('common.namespace')}</th>
          <th scope="col">{$t('common.profileId')}</th>
          <th scope="col">{$t('common.discord')}</th>
          <th scope="col">{$t('common.actions')}</th>
        </tr>
      </thead>
      <tbody>
        {#each users as user}
          <tr>
            <td><span>{user.username}</span></td>
            <td><span>{user.roles.join(", ")}</span></td>
            <td><span>{#if user.namespace && user.namespace.name}{user.namespace.name}{:else}-{/if}</span></td>
            <td><span>{user.profileId || ''}</span></td>
            <td><span>{user.discord || ''}</span></td>
            <td>
              <button
                on:click={() => editUser(user._id)}
                class="btn btn-sm btn-primary">{$t('button.edit')}</button
              >
              <button
                class="btn btn-sm btn-danger"
                on:click={() => deleteUser(user._id)}>{$t('button.delete')}</button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
    <div class="mt-5">
      <button
        class="btn btn-primary me-2"
        on:click={() => navigate("/admin/user")}>{$t('button.createUser')}</button>
    </div>
  </div>
</SecurePage>

<style>
  /* Add your component styles here */
</style>
