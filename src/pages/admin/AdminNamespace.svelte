<script>
  import { MultiSelect } from "svelte-multiselect";
  import { AdminService } from "../../services/AdminService";
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import ApiKeys from "../../lib/ApiKeys.svelte";
  import { createToast } from "../../stores/toasts";

  export let id = "";

  const adminService = new AdminService();

  let namespace = {
    name: "",
    description: "",
    users: [],
  };
  let users = [];
  let selectedUsers = [];

  $: isNew = !id;

  async function getData() {
    if (!isNew) {
      namespace = await adminService.getNamespace(id);
      selectedUsers = namespace.users.map(mapUser);
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
      createToast("Namespace created successfully", "success");
    } catch (error) {
      console.error(error);
      createToast("Failed to create namespace", "danger");
    }
  }

  async function updateNamespace() {
    try {
      const originalUsers = [...namespace.users];
      namespace.users = users.reduce((acc, u) => {
        const isOriginal = !!originalUsers.find((ou) => ou._id === u._id);
        const isSelected = !!selectedUsers.find((su) => su._id === u._id);

        if (isSelected || isOriginal) {
          acc.push({
            id: u._id,
            removed: isOriginal && !isSelected,
          });
        }
        return acc;
      }, []);
      await adminService.updateNamespace(namespace);
      createToast("Namespace updated successfully", "success");
      navigate('/admin/namespaces');
    } catch (error) {
      console.error(error);
      createToast('Failed to update namespace', 'danger');
    }
  }

  onMount(() => {
    getData();
  });
</script>

<div class="container">
  <h1>
    {#if isNew}New Namespace{:else}Edit Namespace{/if}
  </h1>
  <div class="card mt-5">
    <div class="card-header">
      <h5 class="card-title">Namespace</h5>
    </div>
    <div class="card-body">
      <form>
        <div class="mb-3">
          <label for="name" class="form-label">Namespace name</label>
          <input
            bind:value={namespace.name}
            type="text"
            class="form-control"
            id="name"
            name="name"
          />
        </div>
        <div class="mb-3">
          <label for="description" class="form-label"
            >Namespace description</label
          >
          <input
            bind:value={namespace.description}
            type="text"
            class="form-control"
            id="description"
            name="description"
          />
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">Users</label>
          <MultiSelect
            placeholder="Select users..."
            bind:selected={selectedUsers}
            options={users}
            let:option
          >
            {option.username}
          </MultiSelect>
        </div>
        <div class="button-group mt-5">
          {#if isNew}
            <button
              type="button"
              class="btn btn-primary"
              on:click={createNamespace}>Create</button
            >
          {:else}
            <button
              type="button"
              class="btn btn-primary"
              on:click={updateNamespace}>Update</button
            >
          {/if}
          <button
            type="button"
            class="btn"
            on:click={() => navigate("/admin/namespaces")}>Back</button
          >
        </div>
      </form>
    </div>
  </div>
  {#if !isNew}
    <div class="card mt-5">
      <div class="card-header">
        <h5 class="card-title">Namespace API Keys</h5>
      </div>
      <div class="card-body">
        <ApiKeys namespaceId={id} />
      </div>
    </div>
  {/if}
</div>
