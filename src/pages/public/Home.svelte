<script>
  import ProfileModal from "@lib/ProfileModal.svelte";
  import QuestsCount from "@lib/QuestsCount.svelte";
  import ClientsOnline from "@lib/ClientsOnline.svelte";
  
  let modalProfile = {};
  let showModalProfile = false;

  const onProfileModalClosed = () => {
    showModalProfile = false;
  };
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
        <ClientsOnline />
      </div>
      <div class="col">
        <QuestsCount />
      </div>
    </div>
  </div>

  <ProfileModal
    profile={modalProfile}
    isOpen={showModalProfile}
    on:close={onProfileModalClosed}
  />
</main>
