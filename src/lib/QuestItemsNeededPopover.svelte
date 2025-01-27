<script>
  import { fade } from "svelte/transition";
  import ItemsNeeded from "./ItemsNeeded.svelte";
  import { onMount } from "svelte";
  import { isMobileWidth } from "@utils/helper.js";

  export let trigger;
  export let items = [];
  export let visible = false;
  export let canAddItems = false;

  const isMobile = isMobileWidth();
  
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
      document.querySelector(".custom-popover-backdrop")?.remove();
    };
  });

  function showPopover(evt) {
    evt && evt.stopPropagation();
    visible = true;
    document.addEventListener("click", handleClickOutside);
    window.addEventListener("resize", positionPopover);
    if (isMobile) {
      const bdrop = document.createElement("div");
      bdrop.classList.add("custom-popover-backdrop");
      document.body.appendChild(bdrop);
    }
  }

  function hidePopover(evt) {
    evt && evt.stopPropagation();
    visible = false;
    document.removeEventListener("click", handleClickOutside);
    window.removeEventListener("resize", positionPopover);
    document.querySelector(".custom-popover-backdrop")?.remove();
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

    if (!hasRoomRight && hasRoomLeft) {
      left -= popoverWidth - triggerRect.width - 20;
      arrowHorizontalSide = "left";
      arrowLeft = popoverWidth - 40;
    } else if (!hasRoomLeft) {
      left = 0;
      
    }
    
    element.style.top = `${top}px`;
    element.style.left = `${left}px`;

    if (!isMobile) {
      arrowElement.style.left = `${arrowLeft}px`;

      if (arrowVerticalSide === "top") {
        arrowElement.style.top = "auto";
        arrowElement.style.bottom = "-10px"; // Arrow points downwards
        arrowElement.style.transform = "rotate(180deg)"; // Flip the arrow
      }
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
    class="custom-popover"
    transition:fade={{ duration: 200 }}
    bind:this={element}
  >
    <div class="custom-popover-arrow" bind:this={arrowElement}></div>
    <div class="custom-popover-body">
      <ItemsNeeded {items} {canAddItems} />
    </div>
  </div>
{/if}