<script>
  import { createEventDispatcher, onMount } from "svelte";
  import QuestLink from "./QuestLink.svelte";
  import User from "./User.svelte";
  import { highlightMatch } from "./helpers";
  import ItemsNeededIcon from 'svelte-bootstrap-icons/lib/QuestionCircleFill.svelte';
  import "bootstrap/js/dist/popover.js";

  import * as bootstrap from "bootstrap";
  import { ProfilesService } from "@services/ProfilesService.js";
  import ItemsNeeded from "./ItemsNeeded.svelte";

  export let quest;
  export let query;

  const myDefaultAllowList = bootstrap.Tooltip.Default.allowList;
  myDefaultAllowList.table = [];
  myDefaultAllowList.thead = [];
  myDefaultAllowList.tbody = [];
  myDefaultAllowList.tr = [];
  myDefaultAllowList.td = [];
  myDefaultAllowList.th = [];

  const dispatch = createEventDispatcher();
  const profileService = new ProfilesService();

  const questImages = import.meta.glob(
    ["./assets/images/quests/*.jpg", "./assets/images/quests/*.png"],
    { eager: true, query: "?url", import: "default" }
  );
  let popoverItemsNeededInstance, popoverItemsNeededTrigger;
  let popoverDescriptionInstance, popoverDescriptionTrigger;
  let defaultQuestImage = "./assets/images/quests/default.jpg";
  let sortedUSers = [];
  let itemsNeeded = {};
  let itemsNeededTpl;
  let itemsNeededContent = 'content';

  onMount(async () => {
    popoverDescriptionInstance =  new bootstrap.Popover(popoverDescriptionTrigger,  { html: true });
    itemsNeeded = await profileService.getQuestItemsNeeded(quest.id);
    
    if (itemsNeeded.valid) {
      popoverItemsNeededInstance = new bootstrap.Popover(popoverItemsNeededTrigger, { allowList: myDefaultAllowList, html: true, content: itemsNeededTpl.innerHTML });
    }
  });

  
  $: sortedUSers = quest.userTasks.sort((a, b) => a.user.localeCompare(b.user));

  
  function getImageUrl(item) {
    const imageName = item.image.split('.')[0] ;
    const imagePng = questImages[`./assets/images/quests/${imageName}.png`];
    const imageJpg = questImages[`./assets/images/quests/${imageName}.jpg`];
    const imageDefault = questImages[defaultQuestImage];
    return imagePng || imageJpg || imageDefault;
  }
</script>
<div class="col-xxxl-2 col-xxl-3 col-xl-4 col-lg-4 col-md-6 mb-4">
  <div class="card card-quest h-100">
    <div style="position: relative;">
      <img src={getImageUrl(quest) + ""} class="card-img-top" alt={quest.name} />
      <div class="floating-text count-container">{quest.count}</div>
      <div class="floating-text count-location">
        {@html highlightMatch(quest.location, query)}
      </div>
      <div class="floating-text count-trader">
        {@html highlightMatch(quest.trader, query)}
      </div>
    </div>
    <div class="card-body">
      <h5 class="card-title"><QuestLink quest={quest} {query} /></h5>
      <p class="card-text multi-line-truncate text-secondary">
        {quest.description}
      </p>
      
      <button bind:this={popoverDescriptionTrigger}
        type="button"
        class="btn btn-secondary btn-sm"
        data-bs-toggle="popover"
        data-bs-trigger="focus"
        data-bs-placement="top"
        data-bs-content={quest.description}
      >
        Read description
      </button>
      <button bind:this={popoverItemsNeededTrigger}
      type="button"
      style={itemsNeeded.valid ? '' : 'display: none;'}
      class="btn btn-secondary btn-sm"
      data-bs-toggle="popover"
      data-bs-trigger="focus"
      data-bs-placement="bottom"
      on:click={() => { popoverItemsNeededInstance.setContent({ '.popover-body': itemsNeededTpl.innerHTML});  }}
    ><ItemsNeededIcon class="item-icon" /></button>
    </div>
    <div class="card-body">
      <h6 class="card-subtitle mb-2 text-body-secondary">Who has it?</h6>
      {#each sortedUSers as user (user.user)}
        <User {user} {query} />
      {/each}
    </div>
  </div>
  <div class="needed-items card" bind:this={itemsNeededTpl}>
    <ItemsNeeded items={itemsNeeded.items || []} />
  </div>

</div>

<style>
  .item-icon {
    pointer-events: none;
  }
  .needed-items{
    display: none;
  }
  .floating-text {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    color: white;
    background-color: rgba(0, 0, 0, 0.5);
    font-size: 0.8rem;
    padding: 5px;
  }

  .count-container {
    cursor: pointer;
    top: 0;
    left: 0;
    width: 40px;
    height: 40px;
    font-size: 1.3rem;
    font-weight: bold;
    border-top-left-radius: 6px;
  }

  .count-location {
    bottom: 0;
    left: 0;
  }

  .count-trader {
    bottom: 0;
    right: 0;
  }
</style>
