<script>
  // Add your script logic here

  import { Button, Container } from "@sveltestrap/sveltestrap";
  import { navigate } from "svelte-routing";
  import SecurePage from "../lib/SecurePage.svelte";

  function goto(route) {
    navigate(route);
  }
</script>

<style>
  /* Add your component styles here */
</style>

<SecurePage roles={['admin']}>
  <Container class="mt-2">
    <h1>Admin page</h1>
    <Button color="primary" on:click={() => goto("/admin/users")}>Users</Button>
  </Container>
</SecurePage>

<!-- Add your component markup here -->