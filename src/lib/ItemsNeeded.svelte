<script>
  import { addItemNeeded } from '@stores/todoListStore.js';
  import { itemIconsUrls } from '@utils/constants.js';
  import { getItemIconUrl } from '@utils/helper.js';
  import PinAngleIcon from 'svelte-bootstrap-icons/lib/PinAngleFill.svelte';

  export let items = [];

  
  function getItemImage(item) {
    return getItemIconUrl(item.icon);
  }

  function pinItem(item) {
    addItemNeeded(item);
  }
</script>

<div>
  <table class="table no-last-border">
    <tbody>
      {#each items as item,  index (index)}
        <tr>
          <td>{item.name}</td>
          <td>{item.amount || ''}</td>
          <td><img class="item-image" src={getItemImage(item) + ""} alt="{item.name}" /></td>
          <td><button class="btn btn-link pin-button" on:click|stopPropagation|preventDefault={() => pinItem(item)}><PinAngleIcon /></button></td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .item-image {
    width: 42px;    
  }

  .pin-button {
    margin: 0;
    padding: 0;
    color: inherit;
    opacity: 0.8;
  }

  .pin-button:hover {
    opacity: 1;
    transform: rotate(-30deg);
  }
</style>
