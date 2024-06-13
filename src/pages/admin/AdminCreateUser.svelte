<script>
  import { Container } from '@sveltestrap/sveltestrap';
  import { navigate } from 'svelte-routing';
  import SecurePage from '../../lib/SecurePage.svelte';
  import { AdminService } from '../../services/AdminService';

  export let user = {};

  let username = '';
  let password = '';
  let email = '';
  let firstname = '';
  let lastname = '';
  let isAdmin = false;

  const adminService = new AdminService();

  async function createUser() {
    await adminService.createUser({username, password, email, firstname, lastname, isAdmin});
  } 

  function onSubmit(event) {
    event.preventDefault();
  }
</script>

<SecurePage roles={['admin']}>
  <Container>
    <h1>Create user page</h1>
    <form action="/api/user" method="post" on:submit={onSubmit}>
      <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input bind:value={username} type="text" class="form-control" id="username" name="username" >
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input bind:value={password} type="password" class="form-control" id="password" name="password" >
      </div>
      <div class="mb-3">
        <label for="confirm-password" class="form-label">Confirm Password</label>
        <input bind:value={password} type="password" class="form-control" id="confirm-password" name="confirm-password" >
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input bind:value={email} type="email" class="form-control" id="email" name="email" >
      </div>
      <div class="mb-3">
        <label for="firstname" class="form-label">First Name</label>
        <input bind:value={firstname} type="text" class="form-control" id="firstname" name="firstname" >
      </div>
      <div class="mb-3">
        <label for="lastname" class="form-label">Last Name</label>
        <input bind:value={lastname} type="text" class="form-control" id="lastname" name="lastname" >
      </div>
      <div class="mb-3 form-check">
        <input bind:checked={isAdmin} type="checkbox" class="form-check-input" id="is-admin" name="isadmin" >
        <label class="form-check-label" for="is-admin">Is admin</label>
      </div>
      <button type="button" class="btn btn-primary" on:click={createUser}>Create</button>
      <button type="button" class="btn" on:click={() =>  navigate('/admin/users')}>Back</button>
    </form>
  </Container>
</SecurePage>