<script>
  import usecLogo from "./assets/images/side_usec.png";
  import bearLogo from "./assets/images/side_bear.png";

  export let profile = {};

  let quests = [];
  let data = {};
  $:{
    console.log('profile :>> ', profile);
    data = profile.data;
    quests = profile.activeQuests;
  }

</script>

<div class="card mb-2">
  <div class="card-body">
    <div class="pmc-header mb-3">
      <div class="logo-side-small-wrapper">
        <img
          src={data.side.toLowerCase() === "usec" ? usecLogo : bearLogo}
          class="logo-side-small"
          alt="profile.Side.toLowerCase()"
        />
      </div>
      <div class="nicnkname">
        <div class="card-title-nickname mb-0">{data.nickName}</div>
        <span class="card-level"><em>Level {data.level}</em></span>
      </div>
      <span class="badge text-bg-primary">{quests.length} Quests</span>
    </div>
    {#each quests as quest}
      <span
        title={quest.trader}
        class="badge bg-trader-{quest.trader.toLowerCase()}">{quest.name}
      </span>
    {/each}
  </div>
</div>
