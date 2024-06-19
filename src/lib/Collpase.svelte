<script>
  import { onMount } from "svelte";
  import ChevronUp from "svelte-bootstrap-icons/lib/ChevronUp.svelte";
  import * as bootstrap from "bootstrap";

  export let title;
  export let collapsed = false;

  let collapseElement;
  let inheritedClasses = $$restProps.class ?? '';

  function toggleCollapse() {
    const bsCollapse = new bootstrap.Collapse(collapseElement);
    bsCollapse.toggle();
    collapsed = !collapsed;
  }

  onMount(() => {
    new bootstrap.Collapse(collapseElement, {
      toggle: collapsed,
    });
  });
</script>

<div class="card {inheritedClasses}">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="card-header" on:click={toggleCollapse} aria-expanded="true" aria-controls="collapseApiKeys" style="cursor: pointer;">
    <h5 class="collapse-header card-title">
      <span>{title}</span>
      <span class="button-icon" class:is-collapsed={collapsed}><ChevronUp /></span>
    </h5>
  </div>
  <div bind:this={collapseElement} id="collapseApiKeys" class="collapse show">
    <div class="card-body">
      <slot></slot>
    </div>
  </div>
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