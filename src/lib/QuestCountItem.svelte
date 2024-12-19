<script>
  import { createEventDispatcher, onMount } from "svelte";
  import QuestLink from "./QuestLink.svelte";
  import User from "./User.svelte";
  import { highlightMatch } from "./helpers";
  
  import "bootstrap/js/dist/popover.js";

  import * as bootstrap from "bootstrap";

  export let quest;
  export let query;

  const dispatch = createEventDispatcher();

  const questImages = import.meta.glob(
    ["./assets/images/quests/*.jpg", "./assets/images/quests/*.png"],
    { eager: true, query: "?url", import: "default" }
  );
  
  let popoverInstance;
  let defaultQuestImage = "./assets/images/quests/default.jpg";

  onMount(() => {
    // Initialize popover
    const popoverTriggerList = document.querySelectorAll(
      '[data-bs-toggle="popover"]'
    );
    popoverInstance = [...popoverTriggerList].map(
      (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl,  { html: true})
    );
  });

  $: sortedUSers = quest.userTasks.sort((a, b) => a.user.localeCompare(b.user));

  function onUserClick(event) {
    dispatch("user-click", event.detail);
  }

  function getImageUrl(item) {
    // /files/quest/icon/5979e80986f77437584fb8b2.jpg
    const imageName = item.image.split('.')[0];
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
      <button
        type="button"
        class="btn btn-secondary btn-sm"
        data-bs-toggle="popover"
        data-bs-trigger="focus"
        data-bs-placement="top"
        data-bs-content={quest.description}
      >
        Read full description
      </button>
    </div>
    <div class="card-body">
      <h6 class="card-subtitle mb-2 text-body-secondary">Who has it?</h6>
      {#each sortedUSers as user}
        <User {user} {query} />
      {/each}
    </div>
  </div>
</div>

<style>
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
