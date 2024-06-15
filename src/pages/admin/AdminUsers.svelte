<script>
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import { AdminService } from "../../services/AdminService";
  import { t } from "../../services/i18n";
  import SecurePage from "../../lib/SecurePage.svelte";
  import { confirmModal } from "../../utilities/modal";
  import { createToast } from "../../stores/toasts";

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
        title: 'Delete User',
        message: 'Are you sure you want to delete this user?',
        confirmText: 'Delete',
        cancelText: 'Cancel',
        confirmVariant: 'danger',
      });
      if (!ok) return;
      await adminService.deleteUser(id);
      createToast('User deleted successfully', 'success');
      getData();
    } catch (error) {
      console.error(error);
      createToast('Failed to delete user', 'danger');
    }
  }

  onMount(() => {
    getData();
  });
</script>

<SecurePage roles={["admin"]}>
  <div class="container">
    <h1 class="mt-5">{$t('adminUsers.title')}</h1>

    <table class="table mt-4">
      <thead>
        <tr>
          <th scope="col">Username</th>
          <th scope="col">Roles</th>
          <th scope="col">Namespace</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {#each users as user}
          <tr>
            <td><span>{user.username}</span></td>
            <td><span>{user.roles.join(", ")}</span></td>
            <td><span>{#if user.namespace && user.namespace.name}{user.namespace.name}{:else}-{/if}</span></td>
            <td>
              <button
                on:click={() => editUser(user._id)}
                class="btn btn-sm btn-primary">Edit Info</button
              >
              <button
                class="btn btn-sm btn-danger"
                on:click={() => deleteUser(user._id)}>Delete</button
              >
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
    <div class="mt-5">
      <button
        class="btn btn-primary me-2"
        on:click={() => navigate("/admin/user")}>Create User</button>
      <button class="btn btn-light" on:click={() => navigate("/admin")}>Back</button>
    </div>
  </div>
</SecurePage>

<style>
  /* Add your component styles here */
</style>
