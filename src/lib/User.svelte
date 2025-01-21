<script>
  
  import { highlightMatch } from "./helpers";
  import UserTasksPopover from "./UserTasksPopover.svelte";

  export let user;
  export let query;

  let tasks = user?.tasks ?? [];
  let popoverEl, readyToComplete = false;

  $: readyToComplete = user?.status === 3 || tasks.every(task => task.accomplished);

  let tasksPopoverVisible = false; 

  function onTasksChange(event) {
    tasks = event.detail;
  }
</script> 

<style>
  .badge.rounded-pill {
    pointer-events: none;
  }
</style>

<!-- svelte-ignore a11y-click-events-have-key-events list-group-item-success-->
<button 
  bind:this="{popoverEl}"
  type="button" 
  class="btn btn-sm"
  >
  <span class="badge rounded-pill { !readyToComplete ? 'text-bg-secondary' :'text-bg-success'}">{@html highlightMatch(user.user, query)}</span>
</button>
{#if popoverEl}
  <UserTasksPopover on:tasksChange={onTasksChange} trigger={popoverEl} visible={tasksPopoverVisible} {user} ></UserTasksPopover>
{/if}
