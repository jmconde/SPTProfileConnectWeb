<script>
  import { todoList, removeTask } from "@stores/todoListStore.js";
  import { fade } from "svelte/transition";
  import ExpandIcon from 'svelte-bootstrap-icons/lib/ArrowBarDown.svelte';
  import CollapseIcon from 'svelte-bootstrap-icons/lib/ArrowBarUp.svelte';
  import RemoveIcon from 'svelte-bootstrap-icons/lib/Trash3Fill.svelte';

  let show = $todoList.length > 0;
  let collapsed = false;

  todoList.subscribe(value => {
    show = value.length > 0;
  });

  function onClickRemove(id) {
    removeTask(id);
  }
</script>

{#if show}
  <div class="todo-viewer" transition:fade={{ duration: 200 }}>
    <div class="todo-header">
      <h6 class="d-flex justify-content-between align-items-center">
        <span>Pinned Tasks</span>
        <span>
          {#if collapsed}
            <button class="btn btn-link btn-toggle-collapse" on:click={() => collapsed = false}><ExpandIcon /></button>
          {:else}
            <button class="btn btn-link btn-toggle-collapse" on:click={() => collapsed = true}><CollapseIcon /></button>
          {/if}
        </span>
      </h6>
    </div>
    {#if !collapsed}
      <div>
        <ul class="list-group">
          {#each $todoList as task (task.id)}
            <li class="list-group-item d-flex justify-content-between align-items-center {task.checked ? 'list-group-item-success' : ''}">
              
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" bind:checked={task.checked}>
              </div>
              <span>{task.description}</span>
              <button class="btn btn-link btn-toggle-collapse" on:click={() => onClickRemove(task.id)}><RemoveIcon /></button>
            </li>
          {/each}
        </ul>
      </div>
    {/if}
  </div>
{/if}

<style>
  .form-check-input:focus {
    border-color: #666;
    outline: none;
    box-shadow: none;
}

  .form-check-input:checked {
    background-color: green;
    border-color: green;  
  }

  .btn-toggle-collapse {
    opacity: 0.8;
    color: inherit;
  }
  .btn-toggle-collapse:hover {
    opacity: 1;
  }

  .todo-viewer {
    padding: 1rem;
    position:fixed;
    top: 50px;
    right: 20px; 
    margin-top: 1rem;
    width: 400px;
    border: 1px solid #666;
    border-radius: 5px;
    background-color: #212529;
    max-height: 500px;
    overflow-y: auto;
  }
</style>