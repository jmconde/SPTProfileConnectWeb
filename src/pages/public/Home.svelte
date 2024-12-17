<script>
  import { onMount, onDestroy } from "svelte";
  // import InRaid from "../lib/InRaid.svelte";
  import ProfileModal from "@lib/ProfileModal.svelte";
  import QuestsCount from "@lib/QuestsCount.svelte";
  import ClientsOnline from "@lib/ClientsOnline.svelte";
  import { ProfilesService } from "@services/ProfilesService.js";
  import { loadingStore, unauthorizedStore } from "@stores/loadingStore";

  import "bootstrap/dist/css/bootstrap.min.css";

  const profilesService = new ProfilesService();
  let profiles = [];
  let questsCount = [];
  let allUsers = [];
  let allLocations = [];
  let allTraders = [];
  let raids = [];
  let hideoutInfo = [];

  let modalProfile = {};
  let showModalProfile = false;
  let pollInterval;
  
  loadingStore.set(true);

  async function getData() {
    unauthorizedStore.set(false);
    try {
      const countResponse = await profilesService.fetchQuestsCount();
      questsCount = countResponse.questsCount;
      profiles = countResponse.profiles;

      allUsers = profiles.map((profile) => profile.nickName);
      allLocations = questsCount.reduce((acc, quest) => {
        if (!acc.includes(quest.location)) {
          acc.push(quest.location);
        }
        return acc;
      }, []);
      allTraders = questsCount.reduce((acc, quest) => {
        if (!acc.includes(quest.trader)) {
          acc.push(quest.trader);
        }
        return acc;
      }, []);
      raids = await profilesService.fecthInRaid();
      hideoutInfo = await profilesService.fetchHideoutInfo();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        unauthorizedStore.set(true);
      }
      stopPolling();
    } finally {
      loadingStore.set(false);
    }
  }

  function startPolling() {
    pollInterval = setInterval(() => {
      getData();
    }, import.meta.env.VITE_POLLING_INTERVAL);
  }

  function stopPolling() {
    clearInterval(pollInterval);
  }

  function showProfile(event) {
    return;
    const { user } = event.detail;
    modalProfile = profiles.find((profile) => profile.data.nickName === user);
    showModalProfile = true;
  }

  const onProfileModalClosed = () => {
    showModalProfile = false;
  };

  onMount(() => {
    getData();
    startPolling();
  });

  onDestroy(() => {
    stopPolling();
  });
</script>

<style>
  .left-fixed-column {
    max-width: 300px;
  }
  @media (max-width: 768px) {
    .left-fixed-column {
        width: 100%;
        max-width: 100%;
        min-width: 100%;
    }
}
</style>
<main>
  <div class="container-fluid mt-2">
    <div class="row">
      <div class="col left-fixed-column">
        <ClientsOnline 
          {profiles}
          {raids}
          {hideoutInfo} />
      </div>
      <div class="col">
        <QuestsCount
          on:user-click={showProfile}
          on:retry={getData}
          items={questsCount}
          users={allUsers}
          locations={allLocations}
          traders={allTraders}
        />
      </div>
    </div>
  </div>

  <ProfileModal
    profile={modalProfile}
    isOpen={showModalProfile}
    on:close={onProfileModalClosed}
  />
</main>
