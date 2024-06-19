<script>
  import { Crosshair, Plus } from "svelte-bootstrap-icons";
  import InRaidUserStats from "./InRaidUserStats.svelte";
  import { t } from "@services/i18n";

  export let raid;

  $: users = raid.users.map((u) => u.user).join(", ");
  $: character = raid.character;
  $: location = raid.location;
  
  let isOpen = false;
  
  function toggleRaidInfo() {
    isOpen = !isOpen;
  }

</script>

<style>
  .inraid-users-container {
    display: flex;
    flex-flow: row wrap;
    gap: 16px;
  }
</style>

<p>
  <Crosshair />
  {#if raid.team}<span class="fw-medium ms-1">{$t('message.raidTeam', { values: { team: raid.team } })}</span>{/if}
  {$t('message.raidUsers', { values: { users, character, location }})}
  

  <button class="icon-btn float-end" on:click={() => toggleRaidInfo()}
    ><Plus class="float-end" /></button>
</p>
{#if isOpen}
  <div class="inraid-users-container mb-2">
    {#each raid.users as user}
      <InRaidUserStats user={user} />
    {/each}
  </div>
{/if}

