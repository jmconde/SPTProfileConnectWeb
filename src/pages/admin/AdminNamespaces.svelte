<script>
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import SecurePage from "../../lib/SecurePage.svelte";
  import { AdminService } from "../../services/AdminService";
  import { confirmModal } from "../../utilities/modal";
  import { createToast } from "../../stores/toasts";

  const adminService = new AdminService();

  let namespaces = [];

  async function getData() {
    namespaces = await adminService.listNamespaces();
    console.log("namespaces :>> ", namespaces);
  }
  
  function editNS (namespace) {
    navigate(`/admin/namespace/${namespace._id}`);
  }

  async function deleteNS(namespace) {
    try {
      const ok = await confirmModal({
        title: 'Delete Namespace',
        message: 'Are you sure you want to delete this namespace?',
        confirmText: 'Delete',
        cancelText: 'Cancel',
        confirmVariant: 'danger',
      });
      if (!ok) return;
      await adminService.deleteNamespace(namespace._id);
      createToast('Namespace deleted successfully', 'success');
      getData();
    } catch (error) {
      console.error(error);
      createToast('Failed to delete namespace', 'danger');
    }
  }

  onMount(() => {
    getData();
  });
</script>

<SecurePage roles={["admin"]}>
  <div class="container">
    <h1 class="mt-5">Namespaces</h1>
    <table class="table mt-4">
      <thead>
        <tr>
          <th scope="col">Namespace</th>
          <th scope="col">Description</th>
          <th scope="col">Users</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
    {#each namespaces as namespace}
      <tr>
        <td>{namespace.name}</td>
        <td>{namespace.description || ''}</td>
        <td>
          {#each namespace.users as user, i}
            {user.username}
            {#if i < namespace.users.length - 1}<span>&nbsp;-&nbsp;</span>{/if}
          {/each}
        </td>
        <td>
          <button class="btn btn-sm btn-primary" on:click={() => editNS(namespace)}
            >Edit</button>
          <button class="btn btn-sm btn-danger" on:click={() => deleteNS(namespace)}
            >Delete</button>
        </td>
      </tr>
    {/each}
    </tbody>
    <div class="button-group mt-5">
      <button class="btn btn-primary me-2" on:click={() => navigate("/admin/namespace")}
        >New Namespace</button
      >
      <button class="btn btn-light" on:click={() => navigate("/admin")}
        >Back</button
      >
    </div>
  </div>
</SecurePage>
