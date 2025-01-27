<script>
  import {
    todoList,
    removeTask,
    removeItemNeeded,
    toggleCollapse,
  } from "@stores/todoListStore.js";
  import { getItemIconUrl } from "@utils/helper.js";
  import { fade } from "svelte/transition";
  import RemoveIcon from "svelte-bootstrap-icons/lib/Trash3Fill.svelte";
  import CollapsedIcon from 'svelte-bootstrap-icons/lib/ChevronDown.svelte';
  import ExpandedIcon from 'svelte-bootstrap-icons/lib/ChevronUp.svelte';  

  function onClickRemoveTask(task) {
    removeTask(task);
  }

  function onClickRemoveItem(item) {
    removeItemNeeded(item);
  }

  function getItemImage(item) {
    return getItemIconUrl(item.icon);
  }

  function onCollapse(quest) {
    toggleCollapse(quest);
  }
</script>

<div class="todo-list-detail" transition:fade={{ duration: 200 }}>
  {#each $todoList as quest (quest.id)}
    <button class="interactive-container" on:click={() => onCollapse(quest)}>
      <h3 class="d-flex justify-content-between align-items-center">
       
        <span>{#if quest._collapsed}
          <CollapsedIcon height={10} />
        {:else}
          <ExpandedIcon  height={10}/>
        {/if}{quest.name}</span>
        <span class="todo-detail-location">{quest.location}</span
        >
      </h3>
    </button>
    {#if !quest._collapsed}
    <!-- {quest._collapsed ? 'collapsed' : ''} -->
      <div class="quest-container">
        {#if quest.tasks.length > 0}
          <h6 class="todo-title">
            <span>Tasks</span>
          </h6>
          <ul class="list-group list-group-flush">
            {#each quest.tasks as task (task.id)}
              <li
                class="list-group-item d-flex align-items-center {task.checked
                  ? 'list-group-item-success'
                  : ''}"
              >
                <div class="form-check form-switch" style="flex-grow: 0">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    bind:checked={task.checked}
                  />
                </div>
                <span  style="flex-grow: 3">
                  {task.description}
                  <span class="badge {task.accomplished ? 'text-bg-success' : 'text-bg-secondary'} rounded-pill">
                    {#if task.type === 'CounterCreator' && task.subtype === 'Elimination'}
                      {task.counter > task.goal ? task.goal : task.counter}/{task.goal}
                    {:else}
                      {task.accomplished ? '✓' : ''}
                    {/if}
                  </span>
                </span>
                <button  style="flex-grow: 0"
                  class="btn btn-link btn-toggle-collapse"
                  on:click={() => onClickRemoveTask(task)}
                  ><RemoveIcon /></button
                >
              </li>
            {/each}
          </ul>
        {/if}
        {#if quest.itemsNeeded.length > 0}
          <h6 class="items-needed-title todo-title">
            <span>Items Needed</span>
          </h6>
          <ul class="list-group items-needed list-group-flush">
            {#each quest.itemsNeeded as item (item.id)}
              <li
                class="list-group-item d-flex justify-content-between align-items-center {item.checked
                  ? 'list-group-item-success'
                  : ''}"
              >
              
              <div class="form-check form-switch"  style="flex-grow: 0">
                <input
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  bind:checked={item.checked}
                />
              </div>
                <div class="item-name ps-2"  style="flex-grow: 2;"
                  >
                  <p>{item.name}</p>
                  {#if item.amount !== null && item.amount !== undefined}
                    <p class="item-name-qty"><b>Qty:</b> {item.amount}</p>
                  {/if}
                </div>
                
                <img style="flex-grow: 0"
                  class="item-image"
                  src={getItemImage(item) + ""}
                  alt={item.name}
                />
                <button  style="flex-grow: 0"
                  class="btn btn-link btn-toggle-collapse"
                  on:click={() => onClickRemoveItem(item)}
                  ><RemoveIcon /></button
                >
              </li>
            {/each}
          </ul>
        {/if}
      </div>
    {/if}
  {/each}
</div>

<style>
  .item-name-qty {
    font-weight: 100;
    font-size: 80%;
  }
  .item-image{
    height: 40px;
  }
  .item-name > p {
    margin: 0;
  }
  .todo-list-detail {
    font-size: 80%;
  }

  .form-check-input:focus {
    border-color: #666;
    outline: none;
    box-shadow: none;
  }

  .form-switch .form-check-input:focus {
    --bs-form-switch-bg: url(
      data:image/svg + xml,
      %3csvgxmlns="http://www.w3.org/2000/svg"viewBox="-4 -4 8 8"%3e%3ccircler="3"fill="rgba%280, 0, 0, 0.25%29"/%3e%3c/svg%3e
    );
  }

  .form-check-input:checked {
    background-color: green;
    border-color: green;
  }

  h6.todo-title {
    padding-left: 1rem;
    font-size: 0.7rem;
    margin: 0.2rem 0;
    /* text-align: right; */
  }

  h3 {
    font-size: 0.8rem;
    /* border-top: 1px solid #ccc; */
    margin-top: 1rem;
    padding: 0.3rem 0;
    border-bottom: 1px solid #666;
    background-color: #262a2f;
  }

  .items-needed-title {
    margin-top: 0.5rem;
  }

  .todo-detail-location {
    font-weight: 100;
    font-size: 0.7rem;
    font-style: italic;
  }

  .interactive-container {
    display: block;
    width: 100%;
    margin: 0;
    padding: 0;
    background-color: transparent;
    border: none;
  }
</style>
