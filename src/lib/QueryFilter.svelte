<script>
  import { createEventDispatcher } from "svelte";
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
    dispatch("search", query);
  }

</script>

<style>
  /* Add your component styles here */
</style>

<div class="container search mb-3">
  <div class="row mb-1">
    <div class="col col-6">
      <input
        type="text"
        class="form-control"
        placeholder="Search..."
        aria-label="Search"
        aria-describedby="search"
        on:input={handleSearch}
      />
    </div>
    <div class="col col-3">
      <select class="form-select" bind:value={selectedTrader} on:change={setQuery}>
        <option value="">Select trader...</option>
        {#each traders as option}
          <option value={option}>{option}</option>
        {/each}
      </select>
    </div>        
    <div class="col col-3">
      <select class="form-select" bind:value={selectedLocation} on:change={setQuery}>
        <option value="">Select location...</option>
        {#each locations as option}
          <option value={option}>{option}</option>
        {/each}
      </select>
    </div>
  </div>
  <div class="row">
    <div class="col col-10">
      <MultiSelect
        placeholder="Select users..."
        bind:selected={selectedUsers} options={users} 
        on:change={handleSelectUsers}
        on:removeAll={() => selectedUsers = []} />
    </div>
    <div class="col col-2">
      <button type="button" class="btn btn-secondary" on:click={handleClear}>Clear</button>
    </div>
  </div>
</div>