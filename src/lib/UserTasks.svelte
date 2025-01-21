<script>
  import { createEventDispatcher } from "svelte";
  import PinAngleIcon from 'svelte-bootstrap-icons/lib/PinAngleFill.svelte';

  export let tasks = [];
  export let canAddTasks = false;

  const dispatchEvent = createEventDispatcher();

  $: if (tasks) {
    dispatchEvent('change', tasks);
  }

  function pinTask(task) {
    dispatchEvent('pin', task);
  }

</script>

<div class="tasks-list-group-wrapper">
  <ul class="list-group">
    {#each tasks as task}
      <li class="list-group-item d-flex justify-content-between align-items-center {task.accomplished ? 'list-group-item-success' : ''}">
        <span class="task-item">{task.description}</span>
        <span class="badge {task.accomplished ? 'text-bg-success' : 'text-bg-secondary'} rounded-pill">
          {#if task.type === 'CounterCreator' && task.subtype === 'Elimination'}
            {task.counter > task.goal ? task.goal : task.counter}/{task.goal}
          {:else}
            {task.accomplished ? '✓' : ''}
          {/if}
        </span>
        {#if canAddTasks}
          <span>
            <button class="btn btn-link pin-button" on:click={() => pinTask(task)}><PinAngleIcon /></button>
          </span>
        {/if}
      </li>
    {/each}
  </ul>
</div>

<style>
  .pin-button {
    margin: 0;
    padding: 0;
    color: inherit;
    opacity: 0.8;
  }

  .pin-button:hover {
    opacity: 1;
    transform: rotate(-30deg);
  }
</style>