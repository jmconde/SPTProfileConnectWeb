<script>
  import { onMount } from "svelte";
  import ChevronUp from "svelte-bootstrap-icons/lib/ChevronUp.svelte";
  import * as bootstrap from "bootstrap";

  export let text;
  export let collapsed = false;

  let collapseElement;

  function toggleCollapse() {
    const bsCollapse = new bootstrap.Collapse(collapseElement);
    bsCollapse.toggle();
    collapsed = !collapsed;
  }

  onMount(() => {
    new bootstrap.Collapse(collapseElement, {
      toggle: !collapsed,
    });
  });
</script>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<h3 class="collapse-header" on:click={toggleCollapse}>
  <span>{text}</span> 
  <span class="button-icon" class:is-collapsed={collapsed}><ChevronUp /></span></h3>
<div bind:this={collapseElement} class="collapse">
  <slot></slot>
</div>

<style>
  .collapse-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    border-radius: 4px;
    padding: 4px;
  }
  .collapse-header:hover {
    background-color: var(--bs-gray-100);
  }

  .button-icon {
    transition: transform 0.3s;
    transform-origin: 50% 50%;
    height: 20px;
    width: 20px;
    display: block;
  }

  .is-collapsed {
    transform: rotate(180deg);
  }
</style>