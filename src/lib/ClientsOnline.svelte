<script>
  import ClientsOnlineItem from "./ClientsOnlineItem.svelte";
  import { loadingStore, setLoading } from "../stores/loadingStore";
  import { onMount } from "svelte";
  import { ProfilesService } from "@services/ProfilesService.js";
  import { PollingService } from "@services/PollingService.js";
  

  const profilesService = new ProfilesService();
  const PAGE_NAME = "clientsOnline";

  let polling;
  
  // let profiles = [];
  // let raids = [];
  // let hideoutInfo = [];
  let data = {
    offline: [],
    client: [],
    teams: [],
  };

  onMount(async () => {
    setLoading(PAGE_NAME, true);
    startPolling();
  });

  function startPolling() {
    polling = new PollingService(getData);
    polling.start();  
  }

  

  async function getData() {
    data = await profilesService.fetchOnlineData();
    setLoading(PAGE_NAME, false);
  }

  // $: {
  //   // const classified = profiles
  //   //   .map((profile) => {
  //   //     const { nickName } = profile;
  //   //     const { classes, status, statusCode } = getClasses(profile);
  //   //     const userRaid = raids.find((raid) =>
  //   //       raid.users.find((u) => u.nickName === nickName)
  //   //     );

  //   //     let raidData = !userRaid
  //   //       ? undefined
  //   //       : {
  //   //           location: userRaid.location,
  //   //           count: userRaid.users.length,
  //   //           team: userRaid.team,
  //   //           character: userRaid.character,
  //   //         };

  //   //     return {
  //   //       raidData,
  //   //       user: nickName,
  //   //       classes,
  //   //       status,
  //   //       statusCode,
  //   //       level: profile.level,
  //   //       nextLevel: profile.nextLevel,
  //   //       experience: profile.experience,
  //   //       side: profile.side.toLowerCase(),
  //   //       money: profile.money,
  //   //       generatorInfo: generatorInfo(nickName),
  //   //       isSolarPanelOn: isSolarPanelOn(nickName),
  //   //       hasBitcoinFarm: hideoutInfo.find((info) => info.hasBitcoinFarm && info.nickname === nickName),
  //   //     };
  //   //   })
  //   //   .sort((userA, userB) => {
  //   //     if (userA.statusCode === userB.statusCode) {
  //   //       return userA.user
  //   //         .toLowerCase()
  //   //         .localeCompare(userB.user.toLowerCase());
  //   //     }
  //   //     return userB.statusCode - userA.statusCode;
  //   //   })
  //   //   .reduce(
  //   //     (acc, user) => {
  //   //       switch (user.statusCode) {
  //   //         case 0:
  //   //           acc.offline.push(user);
  //   //           break;
  //   //         case 1:
  //   //           acc.client.push(user);
  //   //           break;
  //   //         case 2:
  //   //         case 3:
  //   //           if (!user.raidData) {
  //   //             user.classes = "connected";
  //   //             user.statusCode = 1;
  //   //             user.status = "";
  //   //             acc.client.push(user);
  //   //           } else {
  //   //             acc.teams.push(user);
  //   //           }
  //   //           break;
  //   //         case 4:
  //   //           if (!user.raidData) {
  //   //             acc.client.push(user);
  //   //           } else {
  //   //             acc.teams.push(user);
  //   //           }
  //   //           break;
  //   //         case 5:
  //   //           acc.teams.push(user);
  //   //           break;
  //   //       }
  //   //       return acc;
  //   //     },
  //   //     {
  //   //       offline: [],
  //   //       client: [],
  //   //       teams: [],
  //   //     }
  //   //   );

  //   // if (classified.teams.length > 0) {
  //   //   classified.teams = divideTeams(classified.teams);
  //   // }

  //   // data = classified;
  // }

  // function divideTeams(teams) {
  //   const checkedRaidData = teams.filter((user) => user.raidData);
  //   const grouped = Object.groupBy(
  //     checkedRaidData,
  //     (user) => user.raidData?.team
  //   );
  //   let teamsData = [];
  //   for (const team in grouped) {
  //     const teamData = grouped[team];
  //     const first = teamData[0];
  //     // console.log('team :>> ', teamData);
  //     teamsData.push({
  //       name: team,
  //       location: first.raidData.location,
  //       character: first.raidData.character,
  //       count: first.raidData.count,
  //       data: teamData,
  //     });
  //   }
  //   return teamsData;
  // }

  // function generatorInfo(nickname) {
  //   return hideoutInfo.find((info) => info.isGeneratorOn && info.nickname === nickname);
  // }

  // function isSolarPanelOn(nickname) {
  //   return hideoutInfo.find((info) => info.isSolarPanelOn && info.nickname === nickname);
  // }

  // function getClasses(profile) {
  //   let classes = "offline";
  //   let status = "";
  //   let statusCode = 0;

  //   const stateStatus = profile.state?.status;

  //   if (stateStatus !== undefined) {
  //     switch (stateStatus) {
  //       case "in-client":
  //         classes = "connected";
  //         status = "";
  //         statusCode = 1;
  //         break;
  //       case "in-raid":
  //         classes = "connected blink";
  //         status = "";
  //         statusCode = 2;
  //         break;
  //       case "starting-raid":
  //         classes = "connected starting";
  //         status = "Starting raid";
  //         statusCode = 3;
  //         break;
  //       case "idle":
  //         classes = "idle";
  //         status = "Idle";
  //         statusCode = 4;
  //         break;
  //       case "dead":
  //         classes = "dead";
  //         status = "K.I.A.";
  //         statusCode = 5;
  //         break;
  //       default:
  //         classes = "offline";
  //         status = "";
  //         statusCode = 0;
  //     }
  //   }

  //   return {
  //     classes,
  //     status,
  //     statusCode,
  //   };
  // }

  /*{#if raid} 
          {/if}*/
</script>

<div>
  {#if $loadingStore[PAGE_NAME]}
    <div class="card mb-2">
      <div class="card-body">
        <h5 class="card-title placeholder-glow">
          <span class="placeholder col-4"></span>
        </h5>
        <p class="card-text placeholder-glow">
          <span class="placeholder w-50"></span>
          <span class="placeholder w-75 placeholder-sm"></span>
        </p>
      </div>
    </div>
  {/if}
  {#if data.teams.length > 0}
    {#each data.teams as team (team.name)}
      <div class="card mb-2">
        <div class="card-body">
          <h5 class="card-title">
            Team {team.name} <span class="count">({team.count})</span>
          </h5>
          <p class="subtitle">@{team.location} as {team.character}</p>
          {#each team.data as item (item.user)}
            <ClientsOnlineItem {item} />
          {/each}
        </div>
      </div>
    {/each}
  {/if}
  {#if data.client.length > 0}
    <div class="card mb-2">
      <div class="card-body">
        <h5 class="card-title">
          In Client <span class="count">({data.client.length})</span>
        </h5>
        {#each data.client as item (item.user)}
          <ClientsOnlineItem {item} />
        {/each}
      </div>
    </div>
  {/if}

  {#if data.offline.length > 0}
    <div class="card mb-2">
      <div class="card-body">
        <h5 class="card-title">
          Offline <span class="count">({data.offline.length})</span>
        </h5>
        {#each data.offline as item (item.user)}
          <ClientsOnlineItem {item} />
        {/each}
      </div>
    </div>
  {/if}
</div>

<style>
  .subtitle {
    font-size: 0.7rem;
    font-style: italic;
    opacity: 0.5;
    margin-left: 12px;
  }

  .count {
    opacity: 0.6;
    font-weight: 100;
    font-size: 90%;
  }
</style>
