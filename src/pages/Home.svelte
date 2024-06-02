<script>
  import { onMount, onDestroy } from "svelte";
  import InRaid from "../lib/InRaid.svelte";
  import ProfileModal from "../lib/ProfileModal.svelte";
  import QuestsCount from "../lib/QuestsCount.svelte";

  import ProfilesService from "../services/profilesService";
  import "bootstrap/dist/css/bootstrap.min.css";
  import GeneratorAlert from "../lib/GeneratorAlert.svelte";
  import { loadingStore } from "../stores/loadingStore";
  // import NotificationButton from "./lib/NotificationButton.svelte";
  // import { sendNotification } from "./lib/helpers";

  loadingStore.set(true);

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

  async function getData() {
    profiles = await profilesService.fetchProfiles();
    questsCount = await profilesService.fetchQuestsCount();
    loadingStore.set(false);
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
  }

  function startPolling() {
    pollInterval = setInterval(() => {
      getData();
    }, 10000);
  }

  function stopPolling() {
    clearInterval(pollInterval);
  }

  function showProfile(event) {
    const { user } = event.detail;
    modalProfile = profiles.find((profile) => profile.nickName === user);
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

<main>
  <div class="container mt-2">
    <div class="row">
      <div class="col">
        <GeneratorAlert {hideoutInfo} />
        <InRaid {raids} />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <QuestsCount
          on:user-click={showProfile}
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
