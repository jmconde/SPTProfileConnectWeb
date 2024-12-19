<script>
  import { onMount } from "svelte";
  import { highlightMatch } from "./helpers";

  import * as bootstrap from "bootstrap";

  export let user;
  export let query;

  let tasks = user?.tasks ?? [];
  let popoverInstance, readyToComplete = false;

  $: tasks = user?.tasks ?? [];
  $: readyToComplete = user?.status === 3 || tasks.every(task => task.accomplished);

  onMount(() => {
    new bootstrap.Popover(popoverInstance, { html: true})
  });

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

  $: content = `<ul class="list-group">
    ${tasks.map(task => `
      <li class="list-group-item d-flex justify-content-between align-items-center ${task.accomplished ? 'list-group-item-success' : ''}">
        <span class="task-item">${task.description}</span> ${getProgress(task)}
      </li>`).join("")} 
    </ul>`;

    console.log('user :>> ', user);
</script> 

<style>
  
</style>

<!-- svelte-ignore a11y-click-events-have-key-events list-group-item-success-->
<button 
  bind:this="{popoverInstance}"
  type="button" 
  class="btn btn-sm"
  data-bs-toggle="popover"
  data-bs-trigger="focus"  
  data-bs-placement="bottom"
  data-bs-title={user.user + '\'s Tasks'}
  data-bs-content={content}
  >
  <span class="badge rounded-pill { !readyToComplete ? 'text-bg-secondary' :'text-bg-success'}">{@html highlightMatch(user.user, query)}</span>
</button>
