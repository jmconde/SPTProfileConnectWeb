<script>
  // @ts-nocheck

  import { createEventDispatcher, onMount } from "svelte";
  import { fade } from "svelte/transition";
  import UserTasks from "./UserTasks.svelte";
  import { ProfilesService } from "@services/ProfilesService.js";
  import PinAngleIcon from 'svelte-bootstrap-icons/lib/PinAngleFill.svelte';
  import { addTask } from "@stores/todoListStore.js";
  import { userStore } from "@stores/userStore.js";

  export let trigger;
  export let user;
  export let visible = false;
  
  const profileService = new ProfilesService();

  let element;
  let parent;
  let arrowElement;
  let tasks = [];
  let loading = true;
  let canAddTasks = false;

  const dispatchEvent = createEventDispatcher();

  async function fetchContent() {
    const response = await profileService.fetchUserQuestTasks(
      user.sessionId,
      user.questId
    );
    tasks = response.tasks;
  }

  function showPopover() {
    visible = true;
    document.addEventListener("click", handleClickOutside);
    window.addEventListener("resize", positionPopover);
  }

  function hidePopover() {
    visible = false;
    document.removeEventListener("click", handleClickOutside);
    window.removeEventListener("resize", positionPopover);
  }

  $: canAddTasks = $userStore?.profileId === user.user;
  $: if (visible && trigger && element) {
    if (loading) {
      fetchContent();
      loading = false;
    }
    positionPopover();
  }

  function handleClickOutside(event) {
    if (
      element &&
      !element.contains(event.target) &&
      !trigger.contains(event.target) &&
      visible
    ) {
      hidePopover();
    }
  }

  function positionPopover() {
    if (!trigger || !element || !visible) {
      return;
    }
    const triggerRect = trigger.getBoundingClientRect();
    const parentRect = parent.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const popoverWidth = element.offsetWidth;
    const popoverHeight = element.offsetHeight;

    let top = triggerRect.top - parentRect.top;
    let left = triggerRect.left - parentRect.left;
    let arrowVerticalSide = "bottom";
    let arrowHorizontalSide = "right";
    let arrowLeft = 20;

    const hasRoomBelow = triggerRect.bottom + popoverHeight <= viewportHeight;
    const hasRoomAbove = triggerRect.top - popoverHeight >= 0;
    const hasRoomRight = triggerRect.right + popoverWidth <= viewportWidth;
    const hasRoomLeft = triggerRect.left - popoverWidth >= 0;

    if (hasRoomBelow) {
      top += triggerRect.height + 5;
      arrowVerticalSide = "bottom";
    } else if (hasRoomAbove) {
      top -= popoverHeight + 5;
      arrowVerticalSide = "top";
    }

    if (!hasRoomRight) {
      left -= popoverWidth - triggerRect.width;
      arrowHorizontalSide = "left";
      arrowLeft = popoverWidth - 40;
    }

    element.style.top = `${top}px`;
    element.style.left = `${left}px`;
    arrowElement.style.left = `${arrowLeft}px`;

    if (arrowVerticalSide === "top") {
      arrowElement.style.top = "auto";
      arrowElement.style.bottom = "-10px"; // Arrow points downwards
      arrowElement.style.transform = "rotate(180deg)"; // Flip the arrow
    }
  }

  function onChangeUserTasks() {
    positionPopover();
    dispatchEvent("tasksChange", tasks);
  }

  onMount(() => {
    trigger.addEventListener("click", showPopover);
    parent = trigger.closest(".card");

    return () => {
      document.removeEventListener("click", handleClickOutside);
      trigger.removeEventListener("click", showPopover);
      window.removeEventListener("resize", positionPopover);
    };
  });

  function pinAllTasks() {
    tasks.forEach(task => {
      if (!task.accomplished) {
        addTask(task);
      }
    });
    hidePopover();
  }

  function onPinTask(event) {
    const task = event.detail;
    if (!task.accomplished) {
      addTask(task);
    }
  }
</script>

{#if visible}
  <div
    class="custom-popover"
    transition:fade={{ duration: 200 }}
    bind:this={element}
  >
    <div class="custom-popover-arrow" bind:this={arrowElement}></div>
    <h3 class="custom-popover-header">
      <span>{user.user}'s Tasks</span>
      
      {#if canAddTasks}
        <span><button class="btn btn-link pin-button" on:click={pinAllTasks}><PinAngleIcon /></button></span>
        {/if}
    </h3>
    <div class="custom-popover-body">
      <UserTasks {tasks} on:change={onChangeUserTasks} on:pin={onPinTask} {canAddTasks}/>      
    </div>
  </div>
{/if}
