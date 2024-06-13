<script>
  import { Container } from '@sveltestrap/sveltestrap';
  import { navigate } from 'svelte-routing';
  import SecurePage from '../../lib/SecurePage.svelte';
  import { AdminService } from '../../services/AdminService';
  import { onMount } from 'svelte';
  
  export let id = '';

  $: isNew = !id;
  
  let confirmPassword = '';
  let user = {
    username: '',
    password: '',
    email: '',
    firstname: '',
    lastname: '',
    roles: [],
  };
  let isAdmin = false;

  const adminService = new AdminService();

  async function createUser() {
    await adminService.createUser(user);
    navigate('/admin/users');
  }

  async function updateUser() {
    await adminService.updateUser(user);
    navigate('/admin/users');
  }

  function onSubmit(event) {
    event.preventDefault();
  }
  
  onMount(async () => {
    if (!isNew) {
      user = await adminService.getUser(id);
      isAdmin = user.roles.includes('admin');
    }
  });
</script>

<SecurePage roles={['admin']}>
  <Container>
    <h1>User</h1>
    <form action="/api/user" method="post" on:submit={onSubmit}>
      <div class="form-floating mb-3">
        <input bind:value={user.username} type="text" class="form-control" id="username" name="username" placeholder="Username" >
        <label for="username" class="form-label">Username</label>
      </div>
      <div class="form-floating mb-3">
        <input bind:value={user.password} type="password" class="form-control" id="password" name="password" placeholder="Password" >
        <label for="password" class="form-label">Password</label>
      </div>
      <div class="form-floating mb-3">
        <input bind:value={confirmPassword} type="password" class="form-control" id="confirm-password" name="confirm-password" placeholder="Re-Type Password">
        <label for="confirm-password" class="form-label">Confirm Password</label>
      </div>
      <div class="form-floating mb-3">
        <input bind:value={user.email} type="email" class="form-control" id="email" name="email" placeholder="name@example.com">
        <label for="email" class="form-label">Email address</label>
      </div>
      <div class="form-floating mb-3">
        <input bind:value={user.firstname} type="text" class="form-control" id="firstname" name="firstname" placeholder="e.g. John">
        <label for="firstname" class="form-label">First Name</label>
      </div>
      <div class="form-floating mb-3">
        <input bind:value={user.lastname} type="text" class="form-control" id="lastname" name="lastname" placeholder="e.g. Doe">
        <label for="lastname" class="form-label">Last Name</label>
      </div>
      <div class="mb-3 form-check form-switch form-check-inline">
        <input bind:group={user.roles} type="checkbox" class="form-check-input" role="switch" value="user" disabled>
        <label class="form-check-label" for="is-admin">User</label>
      </div>
      <div class="mb-3 form-check form-switch form-check-inline">
        <input bind:group={user.roles} type="checkbox" class="form-check-input" role="switch" value="admin">
        <label class="form-check-label" for="is-admin">Admin</label>
      </div>
      <div class="button-group mt-5">
        {#if isNew}
          <button type="button" class="btn btn-primary" on:click={createUser}>Create</button>
        {:else}
          <button type="button" class="btn btn-primary" on:click={updateUser}>Update</button>
        {/if}
        <button type="button" class="btn" on:click={() =>  navigate('/admin/users')}>Back</button>
      </div>
    </form>
  </Container>
</SecurePage>