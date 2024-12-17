<script>
  import { createEventDispatcher, onMount } from "svelte";
  import QueryFilter from "./QueryFilter.svelte";
  import QuestCountItem from "./QuestCountItem.svelte";
  import { loadingStore, unauthorizedStore } from "../stores/loadingStore";
  import Loading from "./Loading.svelte";
  import { t } from '@services/i18n';

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

  function onRetry() {
    dispatch("retry");
  }
</script>

<style>
  :root {
    --sms-min-height: 38px;
  }
</style>

<div class="card mb-2">
  <div class="card-body">
    <h5 class="card-title">{$t('title.gameCount')}</h5>
    <QueryFilter {users} {locations} {traders} on:search={handleSearch} />
    {#if $loadingStore}
      <Loading hasText={true} />
    {/if}
    {#if $unauthorizedStore}
    <div class="container text-center mt-5">
      <div class="row">
          <div class="col">
              <h1 class="display-4">{$t('error.unauthorized')}</h1>
              <p class="lead">{$t('error.unauthorizedDescription')}</p>
              <button id="retryButton" class="btn btn-secondary btn-lg" on:click={onRetry}>Retry</button>
          </div>
      </div>
  </div>
    {/if}
    <div class="row mt-4">
      {#each filteredItems as count}
        {#if count.count > cap}
          <QuestCountItem on:user-click={onUserClick} {count} {query} />
        {/if}
      {/each}
    </div>
  </div>
</div>
