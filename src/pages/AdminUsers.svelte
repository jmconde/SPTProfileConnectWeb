<script>
  import { onMount } from "svelte";
  import AuthService from "../services/authService";
  import { Container } from "@sveltestrap/sveltestrap";
  import { navigate } from "svelte-routing";

  const auth = new AuthService();

  let users = [];

  async function getData() {
    users = await auth.listUsers();
  }

  onMount(() => {
    getData();
  });
</script>
<Container>
  <h1 class="mt-5">Users</h1>

  <table class="table mt-4">
    <thead>
      <tr>
        <th scope="col">username</th>
        <th scope="col">Roles</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
    {#each users as user}
      <tr>
        <td><span>{user.username}</span></td>
        <td><span>{user.roles.join(', ')}</span></td>
        <td>
          <button class="btn btn-sm btn-primary">Change Password</button>
          <button class="btn btn-sm btn-danger">Delete</button>
        </td>
      </tr>
    {/each}
    </tbody>
  </table>
  <button class="btn btn-primary" on:click={() => navigate("/admin/create-user")}>Create User</button>
  <button class="btn btn-light" on:click={() => navigate("/admin")}>Back</button>
</Container>
<style>
  /* Add your component styles here */
</style>