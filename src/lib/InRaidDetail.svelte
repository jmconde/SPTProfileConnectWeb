<script>
  import { Crosshair, Plus } from "svelte-bootstrap-icons";
    import InRaidUserStats from "./InRaidUserStats.svelte";

  export let raid;
  export let index;

  let teamNames = ["Alpha", "Bravo", "Charlie", "Delta", "Echo", "Foxtrot", "Golf", "Hotel", "India", "Juliet", "Kilo", "Lima", "Mike", "November", "Oscar", "Papa", "Quebec", "Romeo", "Sierra", "Tango", "Uniform", "Victor", "Whiskey", "X-ray", "Yankee", "Zulu"]
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
  <Crosshair /><span class="fw-medium ms-1">Team {teamNames[index]}:</span>
  {raid.users.map((u) => u.user).join(", ")} as {raid.character} on {raid.location}

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

