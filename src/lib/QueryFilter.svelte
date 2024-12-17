<script>
  import { createEventDispatcher } from "svelte";
  import { t } from '@services/i18n';
  import MultiSelect from 'svelte-multiselect';

  const dispatch = createEventDispatcher();

  export let users = [];
  export let locations = [];
  export let traders = [];
  
  let query = [];
  let typedQuery = [];
  let selectedUsers = [];
  let selectedLocation = '';
  let selectedTrader = '';
  let searchText = '';
  
  function handleSearch(event) {
    const typed = event.target.value.toLowerCase().trim();
    if (typed.length > 2) {
      typedQuery = typed.split(/\s+/);
      setQuery();
    } else {
      typedQuery = [];
      setQuery();
    }
  }

  function handleSelectUsers() {
    query = [ ...query, ... selectedUsers ];
    setQuery();
  }

  function setQuery() {
    query = [
      ...typedQuery,
      ...selectedUsers,
    ];
    if (selectedLocation) {
      query.push(selectedLocation);
    }
    if (selectedTrader) {
      query.push(selectedTrader);
    }
    dispatch("search", query);
  }  

  function handleClear() {
    query = [];
    selectedUsers = [];
    selectedLocation = '';
    selectedTrader = '';
    searchText = '';
    dispatch("search", query);
  }

</script>

<style>
  /* Add your component styles here */
  :global(body[data-bs-theme='dark'] div.multiselect > ul.options) {
    background-color: var(--bs-body-bg)
  }
</style>

<div class="container search mb-3 mt-3">
  <div class="row mb-2">
    <div class="col-md-6 col-sm-1">
      <input
        bind:value={searchText}
        type="text"
        class="form-control"
        placeholder={$t('placeholder.search')}
        aria-label={$t('common.search')}
        aria-describedby={$t('common.search')}
        on:input={handleSearch}
      />
    </div>
    <div class="col-md-3">
      <select class="form-select" bind:value={selectedTrader} on:change={setQuery}>
        <option value="">{$t('placeholder.selectTrader')}</option>
        {#each traders as option}
          <option value={option}>{option}</option>
        {/each}
      </select>
    </div>        
    <div class="col-md-3">
      <select class="form-select" bind:value={selectedLocation} on:change={setQuery}>
        <option value="">{$t('placeholder.selectLocation')}</option>
        {#each locations as option}
          <option value={option}>{option}</option>
        {/each}
      </select>
    </div>
  </div>
  <div class="row">
    <div class="col-md-10">
      <MultiSelect --sms-border="var(--bs-border-width) solid var(--bs-border-color)"
        placeholder={$t('placeholder.selectUsers')}
        bind:selected={selectedUsers} options={users} 
        on:change={handleSelectUsers}
        on:removeAll={() => selectedUsers = []} />
    </div>
    <div class="col-md-2">
      <div class="d-grid gap-2">
        <button type="button" class="btn btn-secondary" on:click={handleClear}>{$t('common.clear')}</button>
      </div>
    </div>
  </div>
</div>