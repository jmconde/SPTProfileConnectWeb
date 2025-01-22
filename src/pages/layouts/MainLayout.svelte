<!-- PublicLayout.svelte -->
<script>
  import ClientsOnline from '@lib/ClientsOnline.svelte';
  import QuestsCount from '@lib/QuestsCount.svelte';
  import Charts from '@pages/public/Charts.svelte';
  import { Route, Router } from 'svelte-routing';
</script>

<main>
  <div class="container-fluid mt-2 main-layout-container">
    <div class="row">
      <div class="col left-fixed-column">
        <div class="sticky-top">
          <ClientsOnline />
        </div>
      </div>
      <div class="col">
        <Router>
          <Route path="/" component={QuestsCount} />
          <Route path="charts" component={Charts} />
        </Router>
      </div>
    </div>
  </div>
</main>

<style>
  .main-layout-container .sticky-top {
    z-index: 10;
  }
  .main-layout-container {
    height: calc(100vh - 80px);
    overflow-y: auto;
  }
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