<script>
  import { Button, Container } from "@sveltestrap/sveltestrap";
  import AuthService from "../services/authService";
  import { onMount } from "svelte";

  import Loading from "./Loading.svelte";

  import X from "svelte-bootstrap-icons/lib/X.svelte";

  const auth = new AuthService();

  let apiKeys = [];
  let loading = true;

  async function getData() {
    apiKeys = await auth.listApiKeys();
    loading = false;
  }

  async function generateApiKey() {
    await auth.generateApiKey();
    getData();
  }

  async function deleteToken(key) {
    await auth.deleteApiKey(key);
    getData();
  }

  onMount(() => {
    getData();
  });
</script>

<Container class="mt-2">
  <div class="mb-4">
    {#if loading}
      <Loading />
    {:else if apiKeys.length === 0}
      <div class="alert alert-primary" role="alert">No api keys found</div>
    {:else}
      <div class="list-group">
        {#each apiKeys as key}
          <div class="list-group-item token">
            <span>{key.token}</span>
            <Button size="sm" color="danger" on:click={() => deleteToken(key)}
              ><X /></Button
            >
          </div>
        {/each}
      </div>
    {/if}
  </div>

  <Button color="primary" on:click={generateApiKey}>Generate Api Key</Button>
</Container>

<style>
  .token {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
