<script>
  import { MultiSelect } from "svelte-multiselect";
  import { AdminService } from "../../services/AdminService";
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import ApiKeys from "../../lib/ApiKeys.svelte";

  export let id = '';

  $: isNew = !id;

  const adminService = new AdminService();
  
  let namespace = {
    name: '',
    description: '',
    users: [],
  };
  let users = [];

  async function getData() {
    users = (await adminService.listUsers()).map((user) =>  {
      return ({
      ...user,
      label: user.username,
    })});;
  }

  function createNamespace() {
    adminService.createNamespace(namespace);
    navigate('/admin/namespaces');
  }

  function updateNamespace() {
    adminService.updateNamespace(namespace.users);
    navigate('/admin/namespaces');
  }

  onMount(() => {
    getData();
  });

</script>

<div class="container">
  <h1>{#if isNew}New Namespace{:else}Edit Namespace{/if}</h1>
  <div class="card mt-5">
    <div class="card-header">
      <h5 class="card-title">Namespace</h5>
    </div>
    <div class="card-body">
      <form>
        <div class="form-floating mb-3">
          <input bind:value={namespace.name} type="text" class="form-control" id="name" name="name" placeholder="Namespace name">
          <label for="name" class="form-label">Namespace name</label>
        </div>
        <div class="form-floating mb-3">
          <input bind:value={namespace.description} type="text" class="form-control" id="description" name="description"  placeholder="Namespace description" >
          <label for="description" class="form-label">Namespace description</label>
        </div>
        
        <MultiSelect
          placeholder="Select users..."
          bind:selected={namespace.users} options={users} 
          on:removeAll={() => namespace.users = []}
          let:option>
          {option.username}
        </MultiSelect>
        <div class="button-group mt-5">
          {#if isNew}
            <button type="button" class="btn btn-primary" on:click={createNamespace}>Create</button>
          {:else}
            <button type="button" class="btn btn-primary" on:click={updateNamespace}>Update</button>
          {/if}
          <button type="button" class="btn" on:click={() =>  navigate('/admin/users')}>Back</button>
        </div>
      </form>
    </div>
  </div>
  <div class="card mt-5">
    <div class="card-header">
      <h5 class="card-title">Namespace API Keys</h5>
    </div>
    <div class="card-body">
      <ApiKeys namespaceId={id} />
    </div>
  </div>
</div>