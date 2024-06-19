<script>
  import { openRaidsStore } from "../stores/raidsStore";
  import InRaidDetail from "./InRaidDetail.svelte";
  import { t } from "@services/i18n";

  export let raids = [];
  let isOpen = false;

  let openRaids = raids.map(() => ({
    detail: false,
    health: false,
  }));

  openRaidsStore.set(openRaids);

  openRaidsStore.subscribe((value) => {
    openRaids = value;
  });

  $: isOpen = (raids ?? []).length > 0;
</script>

{#if isOpen}
  <div class="alert alert-primary" role="alert">
    <h4 class="alert-heading">{$t('title.raidInProgress', { values: {n: raids.length} })}</h4>
    {#each raids as raid, i}
      <InRaidDetail {raid} />
    {/each}
  </div>
{/if}

