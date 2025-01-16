<script>
  import { createEventDispatcher, onMount } from "svelte";
  import QueryFilter from "./QueryFilter.svelte";
  import QuestCountItem from "./QuestCountItem.svelte";
  import { loadingStore, unauthorizedStore, setLoading, setUnauthorized } from "../stores/loadingStore";
  import Loading from "./Loading.svelte";
  import { t } from '@services/i18n';
  import { ProfilesService } from "@services/ProfilesService.js";
  import Modal from "./Modal.svelte";
  import ItemsNeeded from "./ItemsNeeded.svelte";

  import { PollingService } from "@services/PollingService.js";

  
  const dispatch = createEventDispatcher();
  const profilesService = new ProfilesService();
  const PAGE_NAME = 'questCount';
  let query = [];
  let items = [];
  let filteredItems = [];
  let cap = 0;
  let users = [];
  let locations = [];
  let traders = [];
  let polling;
  let itemsNeededModalOpen = false;
  let dynamicComponent = null;
  let dynamicComponentProps = {};
  let dynamicComponentTitle = '';
  let pollingActive = true;

  onMount(async () => {
    setLoading(PAGE_NAME, true);
    startPolling();    
  });

  $: {
    filteredItems = items.filter((item) => {
      let parts = query;
      return parts.every(part => item._searchableString.toLowerCase().includes(part.toLowerCase()));
    });
  }  

  async function getData() {
    setUnauthorized(PAGE_NAME, false);
    try {
      const countResponse = await profilesService.fetchQuestsCount();
      const { questsCount, profiles } = countResponse;
      users = profiles.map((profile) => profile.nickName);
      locations = questsCount.reduce((acc, quest) => {
        if (!acc.includes(quest.location)) {
          acc.push(quest.location);
        }
        return acc;
      }, []);
      traders = questsCount.reduce((acc, quest) => {
        if (!acc.includes(quest.trader)) {
          acc.push(quest.trader);
        }
        return acc;
      }, []);

      items =  questsCount;
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        setUnauthorized(PAGE_NAME, true);
      }
      stopPolling();
    } finally {
      setLoading(PAGE_NAME, false);
    }
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

  async function startPolling() {
    polling = new PollingService(getData, import.meta.env.VITE_POLLING_INTERVAL); 
    polling.start();
    
  }

  function stopPolling() {
    polling.stop();
  }

  function openItemsNeededModal(itemsNeeded) {
    dynamicComponent = ItemsNeeded;
    dynamicComponentProps = { items: itemsNeeded };
    itemsNeededModalOpen = true;
    dynamicComponentTitle = 'Items Needed';
  }

  function closeItemsNeededModal() {    itemsNeededModalOpen = false;
    itemsNeededModalOpen = false;
    dynamicComponent = null;
    dynamicComponentProps = {};
    dynamicComponentTitle = '';
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
    {#if $loadingStore[PAGE_NAME]}
      <Loading hasText={true} />
    {/if}
    {#if $unauthorizedStore[PAGE_NAME]}
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
      {#each filteredItems as quest (quest.id)}
        {#if quest.count > cap}
          <QuestCountItem on:user-click={onUserClick} on:open-modal={(event) => openItemsNeededModal(event.detail)} {quest} {query} />
        {/if}
      {/each}
    </div>
  </div>
</div>

<Modal 
  title={dynamicComponentTitle}
  isOpen={itemsNeededModalOpen}
  component={dynamicComponent}
  props={dynamicComponentProps}
  on:close={closeItemsNeededModal}
/>
