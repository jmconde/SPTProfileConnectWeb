<script>
  import { t } from "svelte-i18n";

  export let hideoutInfo = [];
  let showAlert = false;
  let alerts = [];
  
  $: showAlert = !!hideoutInfo && hideoutInfo.some((info) => info.isGeneratorOn); 
  $: alerts = !!hideoutInfo ? hideoutInfo.filter((info) => info.isGeneratorOn).map((info) => $t('message.generatorOn', { values: { nickname: info.nickname, fuelLeft: Math.round(info.generatorFuelLeft) }})) : [];
  // `<span class="fw-bold">${info.nickname}</span> has generator on, <span class="fw-bold">${Math.round(info.generatorFuelLeft)}%</span> fuel remaining.`);
</script>

{#if showAlert}
  <div class="alert alert-danger" role="alert">
    <h4 class="alert-heading">{$t('title.generatorAlert')}</h4>
    {#each alerts as alert}
      <p>{@html alert}</p>
    {/each}
  </div>
{/if}