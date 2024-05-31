<script>
  import { Alert } from "@sveltestrap/sveltestrap";
  import { openRaidsStore } from "../stores/raidsStore";
  import InRaidDetail from "./InRaidDetail.svelte";

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

<Alert {isOpen} color="primary" heading="Raid(s) in progress">
  {#each raids as raid, i}
    <InRaidDetail {raid} index={i} />
  {/each}
</Alert>

<style>
</style>
