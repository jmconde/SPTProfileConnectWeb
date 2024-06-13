<script>
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import SecurePage from "../../lib/SecurePage.svelte";
  import { AdminService } from "../../services/AdminService";

  import NamespaceModal from "../../lib/modals/NamespaceModal.svelte";

  const adminService = new AdminService();

  let namespaces = [];

  async function getData() {
    namespaces = (await adminService.listNamespaces()).sort((a, b) => a.name.localeCompare(b.name));
    console.log("namespaces :>> ", namespaces);
  }
  
  function editNS (namespace) {
    navigate(`/admin/namespace/${namespace._id}`);
  }

  async function deleteNS(namespace) {
    const ok = await confirm("Are you sure you want to delete this namespace?");
    if (!ok) return;
    await adminService.deleteNamespace(namespace._id);
    getData();
  }

  onMount(() => {
    getData();
  });
</script>

<SecurePage roles={["admin"]}>
  <div class="container">
    <h1 class="mt-5">Namespaces</h1>

    {#each namespaces as namespace}
      <div class="card mt-4">
        <div class="card-body">
          <h5 class="card-title">{namespace.name || ''}</h5>
          {#if namespace.description}<p class="card-text fw-light">{namespace.description}</p>{/if}
          <p class="card-text fw-light">
            <span class="fw-medium"
              >Members:
            </span>{#each namespace.users as user, i}
              {user.username}
              {#if i < namespace.users.length - 1}<span>-</span>{/if}
            {/each}
          </p>
          <button class="btn btn-secondary" on:click={() => editNS(namespace)}
            >Edit</button
          >
          <button class="btn btn-secondary" on:click={() => deleteNS(namespace)}
            >Delete</button
          >
        </div>
      </div>
    {/each}
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
