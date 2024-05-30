<script>
  import { createEventDispatcher } from "svelte";
  import QuestLink from "./QuestLink.svelte";
  import User from "./User.svelte";
  import { highlightMatch } from "./helpers";
  
  const dispatch = createEventDispatcher();

  export let count;
  export let query;

  function onUserClick(event) {
    dispatch("user-click", event.detail);
  }
</script>

<style>
  .box-count {
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 8px;
    display: inline-grid;
    grid-template-columns: 40px calc(100% - 20px);
    justify-content: center;
    margin-bottom: 8px;
  }

  .box-count--content {
    margin-left: 8px;
  }

  .box-count--count {
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    padding-top: 6px;
    pointer-events: none;
  }
</style>

<div class="box-count">
  <div class="box-count--count bg-trader-{count.trader.toLowerCase()}" title="{count.trader}">{count.count}</div>
  <div class="box-count--content">
    <div class="box-count--head fw-bold fs-6"><QuestLink quest = {count} {query} /><span class="fs-6 fw-light float-end me-4">{@html highlightMatch(count.location, query)} - {@html highlightMatch(count.trader, query)}</span></div>
    <div class="box-count--info fs-6">
      {#each count.users as user}
        <User on:user-click={onUserClick} {user} {query} />
      {/each}
    </div>
  </div>
</div>
