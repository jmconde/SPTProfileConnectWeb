<script>
  import { todoList, clearTodoList } from "@stores/todoListStore.js";
  import { fade } from "svelte/transition";
  import ExpandIcon from 'svelte-bootstrap-icons/lib/ArrowBarDown.svelte';
  import CollapseIcon from 'svelte-bootstrap-icons/lib/ArrowBarUp.svelte';
  import RemoveIcon from 'svelte-bootstrap-icons/lib/Trash3Fill.svelte';
  import TasksDrawerOpen from 'svelte-bootstrap-icons/lib/ChevronLeft.svelte';
  import TasksDrawerCloseOpen from 'svelte-bootstrap-icons/lib/ChevronRight.svelte';
  import { isMobileWidth } from "@utils/helper.js";
  import TodoListDetails from "./TodoListDetails.svelte";
  

  const isMobile = isMobileWidth();
  
  let show = $todoList.length > 0;
  let collapsed = isMobile;

  todoList.subscribe(value => {
    show = value.length > 0;
  });


  
</script>


{#if show}

  {#if isMobile && collapsed}
    <div class="todo-toggle d-flex justify-content-between align-items-center" transition:fade={{ duration: 200 }}>
      <button class="btn btn-link btn-drawer-open" on:click={() => collapsed = !collapsed}><TasksDrawerOpen height={10} /></button>
    </div>
  {/if} 


  {#if !isMobile}
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
            <button class="btn btn-link btn-toggle-collapse" on:click={() => clearTodoList()}><RemoveIcon /></button>
          </span>
        </h6>
      </div>
      {#if !collapsed}
        <TodoListDetails />
      {/if}
      
    </div>
  {:else}
    <div class="todo-drawer {collapsed ? 'closed' : 'open'}">
      <div class="todo-header">
        <h6 class="d-flex justify-content-between align-items-center">
          <span>Pin Board</span>
          <span>
            <button class="btn btn-link btn-drawer-open" on:click={() => collapsed = !collapsed}><TasksDrawerCloseOpen /></button>
          <span>

        </h6>
      </div>
      <TodoListDetails />
    </div>
  {/if}
{/if}

<style lang="scss">

  :global([data-bs-theme="light"]) {
    .todo-toggle, .todo-drawer, .todo-viewer {
      background-color: #FFF !important;      
      border: 1px solid #d2d2d2 !important;
    }
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
    z-index: 20;
  }

  .todo-toggle {
    position:fixed;
    top: 40px;
    right: 0; 
    background-color: #212529;
    height: 60px;
    width: 20px;
    z-index: 20;
    border-top: 1px solid #666;
    border-left: 1px solid #666;
    border-bottom: 1px solid #666;
  }

  .btn-drawer-open {
    padding: 0;
    color:inherit;
    font-size: 1rem;
    font-weight: 600;
    width: 100%;
    height: 100%;
  }

  .todo-drawer {
    padding: 0.6rem;
    position:fixed;
    top: 50px;
    right: 10px; 
    background-color: #212529;
    height: calc(100vh - 60px);
    width: calc(100% - 20px);
    border: 1px solid #666;
    border-radius: 5px;
    overflow-y: auto;
    z-index: 20;
    transition: right 0.3s;

    &.closed {
      right: -450px;
      border: none;
    }

    &.open {
      right: 10px;
    }
  }
  
  :global(.mobile) {
    // .todo-drawer {
    //   left: 10px;
    //   width: calc(100% - 20px);
    // }
    .todo-header {
      
    }
  }
</style>