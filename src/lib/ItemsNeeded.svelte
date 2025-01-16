<script>
  export let items = [];

  const questImages = import.meta.glob(
    ["./assets/images/items/*.jpg", "./assets/images/items/*.png", "./assets/images/items/*.gif"],
    { eager: true, query: "?url", import: "default" }
  );
  

  function getItemImage(item) {
    return questImages[`./assets/images/items/${item.icon}`] || '';
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
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .item-image {
    width: 42px;
    
  }
</style>
