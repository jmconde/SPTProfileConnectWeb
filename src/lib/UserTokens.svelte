<script>
  import { Button, Container } from "@sveltestrap/sveltestrap";
  import AuthService from "../services/authService";
  import { onMount } from "svelte";

  const auth = new AuthService();

  let apiKeys = [];

  async function getData() {
    console.log('Get Data');
    apiKeys = await auth.listApiKeys();
    console.log('apiKeys :>> ', apiKeys);
  }

  function generateApiKey() {
    console.log('Generate Api Key');
    auth.generateApiKey();
  }

  onMount(() => {
    getData();
  });
</script>

<Container class="mt-2">
  {#each apiKeys as key}
    <div>{key.token}</div>
  {/each}
  <Button color="primary" on:click={generateApiKey}>Generate Api Key</Button>
</Container>