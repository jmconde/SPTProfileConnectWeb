<script>
  import { createEventDispatcher, onMount } from "svelte";
  import { highlightMatch } from "./helpers";

  import * as bootstrap from "bootstrap";

  export let user;
  export let query;
  export let tasks;

  const dispatch = createEventDispatcher();

  function onUserClick() {
    dispatch("user-click", { user });
  }

  let popoverInstance;

  onMount(() => {
    // Initialize popover
    const popoverTriggerList = document.querySelectorAll(
      '[data-bs-toggle="popover"]'
    );
    popoverInstance = [...popoverTriggerList].map(
      (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl, { html: true})
    );
  });

  console.log('tasks :>> ', tasks);

  function getProgress(task) {
    const str = []
    str.push(`<span class="badge ${task.accomplished ? 'text-bg-success' : 'text-bg-secondary'} rounded-pill">`);
    if (task.type === 'CounterCreator' && task.subtype === 'Elimination') {
      const count = task.counter > task.goal ? task.goal : task.counter;
      str.push(`${count}/${task.goal}`);
    } else {
      str.push(`${task.accomplished?' ✓': ''}`);
    }
    str.push('</span>');
    return str.join('');
  }

  const content = `<ul class="list-group">${tasks.map(task => `<li class="list-group-item d-flex justify-content-between align-items-center ${task.accomplished ? 'list-group-item-success' : ''}"><span class="task-item">${task.description}</span> ${getProgress(task)}</li>`).join("")} </ul>`;
</script>

<style>
  
</style>

<!-- svelte-ignore a11y-click-events-have-key-events list-group-item-success-->
<button 
  type="button" 
  class="btn btn-sm"
  data-bs-toggle="popover"
  data-bs-trigger="focus"  
  data-bs-placement="top"
  data-bs-content={content}
  >
  <span class="badge rounded-pill text-bg-secondary">{@html highlightMatch(user, query)}</span>
</button>
