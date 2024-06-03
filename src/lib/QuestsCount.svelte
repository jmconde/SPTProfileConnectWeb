<script>
  import { createEventDispatcher } from "svelte";
  import QueryFilter from "./QueryFilter.svelte";
  import QuestCountItem from "./QuestCountItem.svelte";
  import { loadingStore } from "../stores/loadingStore";
  import Loading from "./Loading.svelte";

  export let items = [];
  export let users = [];
  export let locations = [];
  export let traders = [];
  export let cap = 0;

  const dispatch = createEventDispatcher();

  let query = [];
  let filteredItems = items;

  $: {
    filteredItems = items.filter((item) => {
      let parts = query;
      return parts.every(part => item._searchableString.toLowerCase().includes(part.toLowerCase()));
    });
  }

  function handleSearch(event) {
    query = event.detail;
  }
  
  function onUserClick(event) {
    dispatch("user-click", event.detail);
  }
</script>

<style>
  :root {
    --sms-min-height: 38px;
    --sms-border: 1pt solid var(--bs-border-color);
  }
</style>


<div class="card mb-2">
  <div class="card-body">
    <h5 class="card-title">Common quests</h5>
    <QueryFilter {users} {locations} {traders} on:search={handleSearch} />
    {#if $loadingStore}
      <Loading hasText={true} />
    {/if}
    <div class="count-list">
      {#each filteredItems as count}
        {#if count.count > cap}
          <QuestCountItem on:user-click={onUserClick} {count} {query} />
        {/if}
      {/each}
    </div>
  </div>
</div>
