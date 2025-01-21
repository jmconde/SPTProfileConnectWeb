<script>
  import { fade } from "svelte/transition";
  import ItemsNeeded from "./ItemsNeeded.svelte";
  import { createEventDispatcher, onMount } from "svelte";

  export let trigger;
  export let items = [];
  export let visible = false;

  let element;
  let arrowElement;
  let parent;

  onMount(() => {
    trigger.addEventListener("click", showPopover);
    parent = trigger.closest("#quest-count-card");
    
    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("resize", positionPopover);
      trigger.removeEventListener("click", showPopover);
    };
  });

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
      top += triggerRect.height + 15;
      left -= 10;
      arrowVerticalSide = "bottom";
    } else if (hasRoomAbove) {
      top -= popoverHeight + 15;
      left -= 15;
      arrowVerticalSide = "top";
    }

    if (!hasRoomRight) {
      left -= popoverWidth - triggerRect.width - 20;
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

  $: if (visible) {
    setTimeout(() => {
      positionPopover();
    }, 0);
  }
</script>

{#if visible}
  <div
    class="items-needed-popover"
    transition:fade={{ duration: 200 }}
    bind:this={element}
  >
    <div class="arrow" bind:this={arrowElement}></div>
    <div class="items-needed-popover-body">
      <ItemsNeeded {items} />
    </div>
  </div>
{/if}

<style>
  .items-needed-popover {
    position: absolute;
    border: 1px solid #666;
    z-index: 10;
    width: 300px;
    background-color: #212529;
    border-radius: 3px;
  }

  .items-needed-popover-body {
    padding: 16px 16px;
  }

  .arrow {
    position: absolute;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #343a40;
    top: -10px;
    left: 10px;
    opacity: 0.7;
  }
</style>