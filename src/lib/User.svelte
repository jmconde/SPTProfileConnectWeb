<script>
  import { onMount } from "svelte";
  import { highlightMatch } from "./helpers";

  import { ProfilesService } from "@services/ProfilesService.js";

  export let user;
  export let query;

  const profileService = new ProfilesService();

  let tasks = user?.tasks ?? [];
  let popoverEl, popover, readyToComplete = false;

  $: tasks = user?.tasks ?? [];
  $: readyToComplete = user?.status === 3 || tasks.every(task => task.accomplished);

  async function fetchContent() {
    const response = await profileService.fetchUserQuestTasks(user.sessionId, user.questId);
    popover.setContent({ 
        '.popover-body': getTasksContent(response.tasks),
        '.popover-header': response.user + '\'s Tasks'
      })
      popover.show();
  }

  onMount(() => {
    import("bootstrap").then(({ Popover }) => {
      popover = new Popover(popoverEl, {
        title: user.user + '\'s Tasks',
        content: '<div class="spinner-border spinner-border-sm" role="status"><span class="visually-hidden">Loading...</span></div>',
        html: true,
        trigger: 'manual',
        placement: 'bottom',
      });

      function handleDocumentClick(event) {
        if (popover && !popoverEl.contains(event.target)) {
          popover.hide();
        }
      }

      popoverEl.addEventListener('click', (e) => {
        fetchContent();
      });

      document.addEventListener('click', handleDocumentClick);
      
      return () => {
        popover.dispose();
      };
    });

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

  function getTasksContent(tasks) {
    if (tasks === null) {
      return '<div class="spinner-border spinner-border-sm" role="status"><span class="visually-hidden">Loading...</span></div>';
    }
    return  `<div class="tasks-list-group-wrapper"><ul class="list-group">
    ${tasks.map(task => `
      <li class="list-group-item d-flex justify-content-between align-items-center ${task.accomplished ? 'list-group-item-success' : ''}">
        <span class="task-item">${task.description}</span> ${getProgress(task)}
      </li>`).join("")} 
    </ul></div>`
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
