<script>
  import { Alert } from "@sveltestrap/sveltestrap";

  export let hideoutInfo = [];
  let showAlert = false;
  let alerts = [];
  
  $: showAlert = hideoutInfo.some((info) => info.isGeneratorOn); 
  $: alerts = hideoutInfo.filter((info) => info.isGeneratorOn).map((info) => `<span class="fw-bold">${info.nickname}</span> has generator on, <span class="fw-bold">${Math.round(info.generatorFuelLeft)}%</span> fuel remaining.`);
</script>

{#if showAlert}
  <Alert color="danger" heading="Generator Alert">
    {#each alerts as alert}
      <ul>
        <li>{@html alert}</li>
      </ul>
    {/each}
  </Alert>
{/if}