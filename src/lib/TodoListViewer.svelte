<script>
  import { todoList, removeTask, removeItemNeeded } from "@stores/todoListStore.js";
  import { fade } from "svelte/transition";
  import ExpandIcon from 'svelte-bootstrap-icons/lib/ArrowBarDown.svelte';
  import CollapseIcon from 'svelte-bootstrap-icons/lib/ArrowBarUp.svelte';
  import RemoveIcon from 'svelte-bootstrap-icons/lib/Trash3Fill.svelte';
  import { itemIconsUrls } from "@utils/constants.js";
  
  let show = $todoList.tasks.length > 0 || $todoList.itemsNeeded.length > 0;
  let collapsed = false;

  todoList.subscribe(value => {
    show = value.tasks.length > 0 || value.itemsNeeded.length > 0;
  });

  function onClickRemoveTask(id) {
    removeTask(id);
  }

  function onClickRemoveItem(id) {
    removeItemNeeded(id);
  }
  
  function getItemImage(item) {
    return itemIconsUrls[item.icon] || '';
  }
</script>

{#if show}
  <div class="todo-viewer" transition:fade={{ duration: 200 }}>
    <div class="todo-header">
      <h6 class="d-flex justify-content-between align-items-center">
        <span>Pin Board</span>
        <span>
          {#if collapsed}
            <button class="btn btn-link btn-toggle-collapse" on:click={() => collapsed = false}><ExpandIcon /></button>
          {:else}
            <button class="btn btn-link btn-toggle-collapse" on:click={() => collapsed = true}><CollapseIcon /></button>
          {/if}
          <button class="btn btn-link btn-toggle-collapse" on:click={() => todoList.set({tasks: [], itemsNeeded: []})}><RemoveIcon /></button>
        </span>
      </h6>
    </div>
    {#if !collapsed}
      <div>
        {#if $todoList.tasks.length > 0}
          <h6 class="todo-title d-flex justify-content-between align-items-center">
            <span>Tasks</span>
          </h6>
        <ul class="list-group">
          {#each $todoList.tasks as task (task.id)}
            <li class="list-group-item d-flex justify-content-between align-items-center {task.checked ? 'list-group-item-success' : ''}">
              
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" bind:checked={task.checked}>
              </div>
              <span>{task.description}</span>
              <button class="btn btn-link btn-toggle-collapse" on:click={() => onClickRemoveTask(task.id)}><RemoveIcon /></button>
            </li>
          {/each}
        </ul>
        {/if}
        {#if $todoList.itemsNeeded.length > 0}
          <h6 class="todo-title d-flex justify-content-between align-items-center">
            <span>Items Needed</span>
          </h6>
        <ul class="list-group">
          {#each $todoList.itemsNeeded as item (item.id)}
            <li class="list-group-item d-flex justify-content-between align-items-center {item.checked ? 'list-group-item-success' : ''}">
              <img class="item-image" src={getItemImage(item) + ""} alt="{item.name}" />
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" bind:checked={item.checked}>
              </div>
              <span>{item.name}</span>
              <button class="btn btn-link btn-toggle-collapse" on:click={() => onClickRemoveItem(item.id)}><RemoveIcon /></button>
            </li>
          {/each}
        </ul>
        {/if}
      </div>
    {/if}
  </div>
{/if}

<style>

  .todo-title {
    font-size: 90%;
    margin-top: 1rem;
  }
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
    top: 40px;
    right: 20px; 
    margin-top: 1rem;
    width: 400px;
    border: 1px solid #666;
    border-radius: 5px;
    background-color: #212529;
    max-height: calc(100vh - 100px);
    overflow-y: auto;
  }
</style>